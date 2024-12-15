import mongoose from "mongoose";

const auditLogSchema=new mongoose.Schema({

  user_id: {type: mongoose.Schema.Types.ObjectId,required: true},
  action_type: {type: String, required: true},
  details: {
    app_id:{type: String, required: true},
    app_name:{type: String, required: true}
  }
 
},{timestamps:true})

export default mongoose.model('AuditLog',auditLogSchema);










  