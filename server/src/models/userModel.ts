import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  profile: {type: String, required: true},
  dateCreated: {type: Date, default: Date.now},
})

export default mongoose.model('User',userSchema);