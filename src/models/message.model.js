import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
    text:{
        type:String,
        required: [true, "Message is required"],
    },
    orgId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Org"
    },
    groupId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Group"
    },
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps: true
})

const Message = mongoose.model('Message',messageSchema);
export default Message;

