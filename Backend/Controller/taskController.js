import mongoose from 'mongoose';
import { io } from '../Config/socketConfig.js';
import Task from '../Model/taskModel.js'

export const addTask = async (req, res, next) => {
    try {
        
        
      const {title, description, dueDate,userId} = req.body
      const newTask = await Task.create({ title, description, dueDate ,user:userId })
      io.emit('taskAdded', newTask);
      res.status(200).json({message:'New task added'});
    } catch (error) {
      next(error);
    }
  };

  export const getAllTask = async (req, res, next) => { 
    try {
        
        
      const {userId} = req.params
      const Tasks = await Task.find({ user:userId })
     
      
      res.status(200).json({message:'New task added',data:Tasks});
    } catch (error) {
      next(error);
    }
  };

  export const editTask = async (req, res, next) => {
    try {
      const {title, description, dueDate ,_id, status} = req.body
      console.log('edit',req.body);
      
      const updateTask = await Task.findByIdAndUpdate(_id, {
        $set:{
            title,
            description,
            dueDate,
            status
        }
      }, {new:true})
      io.emit('taskUpdated',  updateTask);
      res.status(200).json({message:'task updated'});
    } catch (error) {
      next(error);
    }
}

    export const deleteTask = async (req, res, next) => {
        try {
            const {taskId} = req.params
          const deleteTask = await Task.findByIdAndDelete(taskId,{new:true})
          io.emit('taskDeleted',  taskId);
          res.status(200).json({message:'task deleted'});
        } catch (error) {
          next(error);
        }
  };

  export const getChartData = async (req, res, next) => {
    try {
        console.log('chart back',req.params);
        
        const {userId} = req.params
        
        const userObjectId = new mongoose.Types.ObjectId(userId);
        
        const taskStatusCounts = await Task.aggregate([
            { 
                $match: { user: userObjectId } // Match tasks by the userId
            },
            { 
                $group: { 
                    _id: "$status", // Group by status (completed or pending)
                    count: { $sum: 1 } // Count the number of tasks for each status
                }
            }
        ]);

        // Create an object to format the result for the chart
        const result = {
            pending: 0,
            completed: 0
        };

        // Populate the result object with the counts
        taskStatusCounts.forEach((task) => {
            if (task._id === 'pending') {
                result.pending = task.count;
            } else if (task._id === 'completed') {
                result.completed = task.count;
            }
        });
        console.log(result,taskStatusCounts);
        
      res.status(200).json({message:'Fetched result', data:result});
    } catch (error) {
      next(error);
    }
};



