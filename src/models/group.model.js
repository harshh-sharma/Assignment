import mongoose, { Schema } from "mongoose";

const groupSchema = new Schema({
    name:{
        type:String,
        required: [true, "Name is required"]
    },
    orgId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Org"
    },
    members:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]

},{
    timestamps: true
})

const Group = mongoose.model('Group', groupSchema);
export default Group;