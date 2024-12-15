/** USER */

import { Schema } from "mongoose";

export interface userType{
    _id?: string;
    username: string,
    email: string,
    profile:string
    
}

/** AUDIT LOG */

export interface auditLogType{
    user_id: Schema.Types.ObjectId,
    action: "login" | "app_selection" | "tab_conflict",
    details: {
        app_id: number,
        app_name: string
    }
    timestamp?: Date
}