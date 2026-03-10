import mongoose, { modelNames } from "mongoose";


const userSchema = mongoose.Schema ({
    name: {type: String, required: true},
    email: {type: String, required: true},
    mobile: {type: String, required: true,  match: /^[0-9]{10}$/,},
    password: {type: String, required: true}
},{timestamps:true})

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;