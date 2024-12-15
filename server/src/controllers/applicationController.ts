import {Request,Response } from "express";
import { applications } from "../data/applications";


class ApplicationController{
   
   getAllApplications(_:Request, res:Response):any{
    return res.status(200)
    .json({message:"Retrived all applications successfully",data:applications})
   }
}

export default new ApplicationController();