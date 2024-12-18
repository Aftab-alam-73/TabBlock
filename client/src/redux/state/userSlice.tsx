import { createSlice } from "@reduxjs/toolkit";

interface userType{
    id: string | null;
    username: string;
    email: string;
    profile: string;
}
const initialState:userType={
    id:null,
    username:'',
    email:'',
    profile:""
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.id=action.payload._id
            state.username=action.payload.username
            state.email=action.payload.email
            state.profile=action.payload.profile
        },
        clearUser:(state)=>{
            state.id=null
            state.username=''
            state.email=''
            state.profile=''
        }
    }
})

export const {setUser,clearUser}=userSlice.actions

export default userSlice.reducer;