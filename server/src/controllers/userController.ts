import { Request,Response } from "express";
import { validationResult,matchedData } from "express-validator";
import { userType } from "../types/type";
import User from "../models/userModel";
import utils from "../utility/utils";

// Controller for user login endpoint
export class UserController {
    async login(req:Request,res:Response):Promise<any> {
        const result=validationResult(req);
        if (!result.isEmpty()) {
          return res.status(400).json({ errors: result.array() });
        }
        const payload=matchedData(req) as userType ;
        try{
            let user= await User.findOne({email: payload.email});
            if(!user){
               user=await User.create(payload);
            }
            const token=await utils.getJwtToken({id:user.id});
            return res.status(200).
            cookie("access_token",token,{httpOnly:true}).
            json({message:"User Logged in successfully.",data:user});
        }catch(error:any){
            return res.status(500).
            json({messgae:"Something went wrong while login", error: error.message });
        }
    
    }

    logout(req:Request, res:Response):any{
        res.clearCookie('access_token');
      return res.status(200).json({message:"User logged out successfully."});
    }
}

export default new UserController();