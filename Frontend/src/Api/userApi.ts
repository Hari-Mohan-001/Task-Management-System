import { SignInUserData, SignUpUserData } from "../Interface/IUserData";
import axiosInstance from "./axiosInstance";


export const userApi = {

    signUpUser : async(userData: SignUpUserData) =>{
        try {
            const response = await axiosInstance.post(`/signUp`, userData)
        } catch (error) {
            
        }
    },

    signInUser : async(userData:SignInUserData)=>{
        try {
            const response = await axiosInstance.post(`/signIn`, userData )
        } catch (error) {
            
        }
    }
}