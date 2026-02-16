import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: [true, "Email is required"]
    },
    password:{
        type:String,
        required:[true, "Password is required"]
    },
    role:{
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    orgId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Org'
    }
},{
    timestamps: true
});

const User = mongoose.model("User", userSchema);
export default User;