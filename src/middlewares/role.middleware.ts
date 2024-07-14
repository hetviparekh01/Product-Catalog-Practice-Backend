import {Request,Response, NextFunction } from "express"
import { message } from "../constants";
import { errorHandler } from "../utils";

export const RoleMiddleware=(roles:string[])=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        try {
            const userRole=req.headers.role as string;
            if(!roles.includes(userRole)){
                throw new Error(message.UNAUTHORIZEDACCESS)
            }
        } catch (error:any) {
            const errorMessage=errorHandler(error);
            return {status:false,...errorMessage}
        }
    }
}