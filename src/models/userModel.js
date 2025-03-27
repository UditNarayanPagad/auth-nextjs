import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "You have to provide username"],
        unique: true,
    },
    email:{
        type: String,
        required: [true, "You have to provide email"],
        unique: true,
    },
    password:{
        type: String,
        required: [true, "You have to provide password"],
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
});

const User = mongoose.model.users || mongoose.model("User", userSchema);

export default User;