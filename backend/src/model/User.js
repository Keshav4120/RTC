import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    email:{
        type: String,
        require:true,
        unique:true,
    },
    fullName:{
        type: String,
        require:true,
    },
    password:{
        type: String,
        require:true,
        minLength:6,
    },
    profilePic:{
        type: String,
        default:"",
    },
} ,
{timestamps:true}//createdAt & updatedAt
);

const User = mongoose.model("User" , userSchema) // this is will create a user model based on this schema

export default User;