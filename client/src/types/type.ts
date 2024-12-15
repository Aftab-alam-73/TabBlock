/** SIGNIN DATA TYPES */
export interface SignInPayloadType{
    username: string;
    email: string;
    profile: string;
}
export interface SignInResponseType{
    message:string
    data:{
        _id: string;
        username: string;
        email: string;
        profile: string;
    }
   
}

export interface AppResponseType{
    message:string,
    data:AppType[]
}
export interface AppType{
    id: string;
    app_name:string;
}

export interface AuditType{
    user_id: string;
    action_type: "login" | "app_selection" | "tab_conflict";
    details: {
        app_id: string;
        app_name: string;
    };
}
export interface AuditResponseType{
   message: string;
   data: AuditType[]
}