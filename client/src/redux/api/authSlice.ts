import { SignInPayloadType, SignInResponseType } from "../../types/type";
import { apiSlice } from "./apiSlice";
import { LOGIN, LOGOUT } from "./constant";

const authSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        SignIn: builder.mutation<SignInResponseType, SignInPayloadType>({
            query: (payload) => ({
                url: LOGIN,
                method: "POST",
                body: payload,
            }),
        }),
        LogOut:builder.mutation({
            query:()=>({
                url:LOGOUT,
                method: "POST",
            })
        })
    }),
});

export const { useSignInMutation,useLogOutMutation } = authSlice; 
