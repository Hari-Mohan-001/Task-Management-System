import { TaskData } from "../Interface/ITaskData";
import { SignInUserData, SignUpUserData } from "../Interface/IUserData";
import axiosInstance from "./axiosInstance";

export const userApi = {
  signUpUser: async (userData: SignUpUserData) => {
    try {
      const response = await axiosInstance.post(`/signUp`, userData);
      if (response.status === 200) {
        return { success: true };
      } else {
        return {
          success: false,
          message: response.data?.message || "Failed to register",
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "An error occurred",
      };
    }
  },

  signInUser: async (userData: SignInUserData) => {
    try {
      const response = await axiosInstance.post(`/signIn`, userData);
      if (response.status === 200) {
        console.log("api", response.data);

        return { success: true, data: response.data.data };
      } else {
        return {
          success: false,
          message: response.data?.message || "Failed to login",
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "An error occurred",
      };
    }
  },
  addTask: async (taskData: TaskData, userId: string) => {
    try {
      const newTaskData = { ...taskData, userId };
      const response = await axiosInstance.post(`/task`, newTaskData);
      if (response.status === 200) {
        return { success: true };
      } else {
        return {
          success: false,
          message: response.data?.message || "Failed to add task",
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "An error occurred",
      };
    }
  },
  editTask: async (taskData: TaskData) => {
    try {
      const response = await axiosInstance.put(`/task`, taskData);
      if (response.status === 200) {
        return { success: true };
      } else {
        return {
          success: false,
          message: response.data?.message || "Failed to update",
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "An error occurred",
      };
    }
  },
  deleteTask: async (taskId?: string) => {
    try {
      const response = await axiosInstance.delete(`/task/${taskId}`);
      if (response.status === 200) {
        return { success: true };
      } else {
        return {
          success: false,
          message: response.data?.message || "Failed to delete",
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "An error occurred",
      };
    }
  },
  getAllTask: async (userId: string) => {
    try {
      console.log("api");

      const response = await axiosInstance.get(`/task/${userId}`);

      if (response.status === 200) {
        return { success: true, data: response.data.data };
      } else {
        return {
          success: false,
          message: response.data?.message || "Failed to register",
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "An error occurred",
      };
    }
  },

  getChartData: async (userId: string) => {
    try {
      const response = await axiosInstance.get(`/chartData/${userId}`);
      console.log("cahrt", response.data);

      if (response.status === 200) {
        return { success: true, data: response.data.data };
      } else {
        return {
          success: false,
          message: response.data?.message || "Failed to register",
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "An error occurred",
      };
    }
  },

  signOut: async () => {
    try {
      console.log("api");

      const response = await axiosInstance.get(`/signout`);

      if (response.status === 200) {
        return { success: true };
      } else {
        return {
          success: false,
          message: response.data?.message || "Failed to register",
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "An error occurred",
      };
    }
  },
};
