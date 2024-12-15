import { Request,Response } from "express";
const { validationResult, matchedData } = require("express-validator");


import { auditLogType } from "../types/type";
import AuditLog from "../models/auditLogModel";

class AuditLogController{
    async addAuditLog(req:Request, res:Response):Promise<any>{
         const result=validationResult(req);
                if (!result.isEmpty()) {
                  return res.status(400).json({ errors: result.array() });
                }
                const payload=matchedData(req) as auditLogType;
          try{
              const auditLog=await AuditLog.create(payload);
              return res.status(200).json({message:"Audit Log added successfully", data: auditLog}); 
          }catch(error:any){
            return res.status(500).
            json({messgae:"Something went wrong while adding audit log", error: error.message });
          }   
                
    }
    
    async getAuditLogs(req:Request, res:Response):Promise<any>{
       try{
            const auditLogs=await AuditLog.find({});
            if(auditLogs.length==0){
                return res.status(404).json({message:"No audit logs found"});
            }
            return res.status(200).json({message:"Retrived all audit logs successfully",data:auditLogs});   
 
       }catch(error:any){
         return res.status(500).
         json({messgae:"Something went wrong while getting audit logs", error: error.message });
       }
    }
    async getAuditLog(req: Request, res: Response): Promise<any> {
        try{
            const auditLog=await AuditLog.findById(req.params.id);
            if(!auditLog){
                return res.status(404).json({message:"Audit Log not found"});
            }
            return res.status(200).json({message:"Retrived audit log successfully",data:auditLog});   

 
        }catch(error:any){
            return res.status(500).
            json({messgae:"Something went wrong while getting audit log", error: error.message });
        }
    }
    
    async deleteAuditLog(req:Request, res:Response):Promise<any>{
        const auditLogId=req.params.id;
        try{
            await AuditLog.findByIdAndDelete(auditLogId);
            return res.status(200).json({message:"Audit Log deleted successfully"});
        }catch(error:any){
            return res.status(500).
            json({messgae:"Something went wrong while deleting audit log", error: error.message });
        }
    }
}

export default new AuditLogController();