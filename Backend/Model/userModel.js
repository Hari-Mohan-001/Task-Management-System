import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    profileImage:{
        type:String,
        default:'https://www.hotelbooqi.com/wp-content/uploads/2021/12/128-1280406_view-user-icon-png-user-circle-icon-png.png',
    },
},{timestamps:true})

const User = mongoose.model("User" , userSchema)

export default User