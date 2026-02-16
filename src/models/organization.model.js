import mongoose, { Schema } from "mongoose";

const organizationSchema = new Schema({
    name:{
        type:String,
        required:[true, "Organization name is required"]
    }
},{
    timestamps: true
});

const Org = mongoose.model('Org',organizationSchema);
export default Org;