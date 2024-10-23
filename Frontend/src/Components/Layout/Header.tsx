import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/material/MenuItem";
import { useUser } from "../../Context/userContext";
import { useNavigate } from "react-router-dom";
import { userApi } from "../../Api/userApi";
import { toast } from "react-toastify";

export default function Header() {
  const { user, logoutUser } = useUser();
  const navigate = useNavigate();
  const handleLogout = async () => {
    console.log("signout");

    const response = await userApi.signOut();
    if (response.success) {
      logoutUser();
      navigate("/login");
      toast.success("signout success");
    } else {
      toast.error(response.message);
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Management System
          </Typography>
          {user ? (
            <div className="flex items-center p-5 gap-3">
            <Typography>{user.name}</Typography>
            <Button variant="contained" onClick={() => handleLogout()} color="secondary">
              Logout
            </Button>
            </div>
          ) : (
            <Button color="inherit">Login</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
