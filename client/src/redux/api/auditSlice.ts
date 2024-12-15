import { AuditResponseType, AuditType } from "../../types/type";
import { apiSlice } from "./apiSlice";
import { ADD_AUDITLOGS, GET_ALL_AUDITLOGS } from "./constant";


const auditSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        AddAuditLog:builder.mutation<any,AuditType>({
            query:(payload)=>({
                url:ADD_AUDITLOGS,
                method:"POST",
                body:payload,
            })
        })
        ,
        getAllAuditLogs:builder.query<AuditResponseType,void>({
            query:()=>({
                url:GET_ALL_AUDITLOGS,
            })
        })
    })
})

export const {useAddAuditLogMutation,useGetAllAuditLogsQuery}=auditSlice;