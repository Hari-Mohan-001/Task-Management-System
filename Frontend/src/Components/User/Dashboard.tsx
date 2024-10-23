import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Grid2 from "@mui/material/Grid2"; // Updated import
import {
  validateDate,
  validateDescription,
  validateName,
} from "../../Utils/Validation/taskValidation";
import { TaskData } from "../../Interface/ITaskData";
import { io } from "socket.io-client";
import { userApi } from "../../Api/userApi";
import { toast } from "react-toastify";
import { useUser } from "../../Context/userContext";
import { Switch } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LineChart, PieChart } from "./Chart";
import { socket_Url } from "../../Constants/urls";

const socket = io(socket_Url, {
  withCredentials: true,
  transports: ["websocket", "polling"],
});

// Modal style
const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const Dashboard = () => {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [completedTasks, setCompletedTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0)
  const [newTask, setNewTask] = useState<TaskData>({
    title: "",
    description: "",
    dueDate: "",
    status: "pending",
  });

  const [isEditing, setIsEditing] = useState(false); // To track if editing
  const navigate = useNavigate();

  const { user } = useUser();

  useEffect(() => {
    // console.log('userid',user._id);
    if (user) {
      const fetchAllTasks = async () => {
        const response = await userApi.getAllTask(user._id);
        if (response.success) {
          setTasks(response.data);
        }
      };
      fetchAllTasks();
    } else {
      console.log("no user ");
      navigate("/login");
    }
  }, [user]);

  useEffect(()=>{
    const getTaskData = async()=>{
      const response = await userApi.getChartData(user._id)
      if(response.success){
        const {pending , completed} = response.data
        setCompletedTasks(completed)
        setPendingTasks(pending)
      }  
      
    }
    getTaskData()
         
  },[tasks])

  useEffect(() => {
    // Listen for socket connection events
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    // Listen for task updates
    socket.on("taskAdded", (task: TaskData) => {
      setTasks((prevTasks) => [...prevTasks, task]);
    });

    socket.on("taskUpdated", (updatedTask: TaskData) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
    });

    socket.on("taskDeleted", (taskId: string) => {
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    });

    return () => {
      // Cleanup on component unmount
      socket.off("taskAdded");
      socket.off("taskUpdated");
      socket.off("taskDeleted");
    };
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    // Clear input fields and errors when the modal is closed
    setNewTask({ title: "", description: "", dueDate: "", status: "pending" });
    setErrors({ title: "", description: "", dueDate: "" });
    setOpen(false);
    setIsEditing(false); // Reset editing state
    // setEditIndex(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleAddTask = async () => {
    const newErrors: { [key: string]: string } = {};
    newErrors.title = validateName(newTask.title) || "";
    newErrors.description = validateDescription(newTask.description) || "";
    newErrors.dueDate = validateDate(newTask.dueDate) || "";
    Object.keys(newErrors).forEach((key) => {
      if (newErrors[key] === "") delete newErrors[key];
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    if (newTask._id) {
      // If the task has an id, update the task
      const response = await userApi.editTask(newTask);
      if (response.success) {
        toast.success("task updated");
      } else {
        toast.error(`${response.message}`);
      }
    } else {
      const response = await userApi.addTask(newTask, user._id);
      if (response.success) {
        toast.success("New task added");
      } else {
        toast.error(`${response.message}`);
      }
      // Otherwise, add a new task
      // setTasks([...tasks, newTask]);
    }
    setNewTask({ title: "", description: "", dueDate: "", status: "pending" });
    handleClose();
  };

  const handleEditTask = (taskId: string | undefined) => {
    setIsEditing(true);
    const taskToEdit = tasks.find((task) => task._id === taskId);
    if (taskToEdit) {
      console.log(taskToEdit);

      setNewTask(taskToEdit); // Load the task data into the modal inputs
      handleOpen();
    }
  };

  const handleDelete = async (taskId: string | undefined) => {
    const response = await userApi.deleteTask(taskId);
    if (response.success) {
      toast.success("Task deleted");
    } else {
      toast.error(`${response.message}`);
    }
  };

  const handleSwitchChange = async (
    taskId: string | undefined,
    currentStatus: string
  ) => {
    // Toggle the status
    const updatedStatus = currentStatus === "pending" ? "completed" : "pending";

    // Find the task and update its status
    const taskToUpdate = tasks.find((task) => task._id === taskId);
    if (taskToUpdate) {
      const updatedTask = { ...taskToUpdate, status: updatedStatus };

      // Call API to update the task status
      const response = await userApi.editTask(updatedTask);
      if (response.success) {
        // Update the task in the local state
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, status: updatedStatus } : task
          )
        );
        toast.success("Task status updated");
      } else {
        toast.error(`${response.message}`);
      }
    }
  };

  return (
    <Box className="bg-neutral-900 min-h-screen p-4">
      {tasks.length>0 &&
  <div className="flex flex-col items-center sm:flex-row justify-center">
    <div className="w-96 sm:w-1/2 p-2">
    <div className="max-w-md mx-auto"> {/* Control maximum width */}
        <PieChart completed={completedTasks} pending={pendingTasks} />
      </div>
    </div>
    <div className="w-full sm:w-1/2 p-2">
    <div className="max-w-md mx-auto"> {/* Control maximum width */}
        <LineChart completed={completedTasks} pending={pendingTasks} />
      </div>
    </div>
  </div>
  }
  <Grid2 container spacing={2} className="mt-4 justify-center sm:justify-center">
    {tasks.length === 0 ? (
      <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
        <Card sx={{ maxWidth: 300, height: "100%" }}>
          <CardContent>
            <Typography variant="h5" component="div">
              No tasks available
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleOpen}>
              Add New Task
            </Button>
          </CardActions>
        </Card>
      </Grid2>
    ) : (
      <>
        {tasks.map((task, index) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                maxWidth: 300,
                
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="div" gutterBottom>
                  {task.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {task.description}
                </Typography>
                <Typography variant="body2">Due: {task.dueDate}</Typography>
                <Typography variant="body2">
                  Status: {task.status}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleEditTask(task._id)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </Button>
                {/* Add Switch to mark task as complete */}
                <Switch
                  checked={task.status === "completed"} // Check if task is completed
                  onChange={() => handleSwitchChange(task._id, task.status)} // Toggle task status
                />
              </CardActions>
            </Card>
          </Grid2>
        ))}
        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              maxWidth: 300,
            }}
          >
            <CardActions>
              <Button
                variant="outlined"
                color="success"
                size="small"
                onClick={handleOpen}
              >
                Add New Task
              </Button>
            </CardActions>
          </Card>
        </Grid2>
      </>
    )}
  </Grid2>

      {/* Add Task Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            {isEditing ? "Edit Task" : "Add New Task"}
          </Typography>
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={newTask.title}
              error={Boolean(errors.title)} // Show error
              helperText={errors.title}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              multiline
              rows={3}
              value={newTask.description}
              error={Boolean(errors.description)}
              helperText={errors.description}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Due Date"
              name="dueDate"
              type="date"
              value={newTask.dueDate}
              error={Boolean(errors.dueDate)}
              helperText={errors.dueDate}
              onChange={handleChange}
              inputProps={{
                min: new Date().toISOString().split("T")[0], // Prevent past dates
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Box
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "flex-end",
                gap: 1,
              }}
            >
              <Button onClick={handleClose}>Cancel</Button>
              <Button variant="contained" onClick={handleAddTask}>
                {isEditing ? "Update Task" : "Add Task"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Dashboard;
