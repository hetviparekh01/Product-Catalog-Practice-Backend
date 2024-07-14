import { inject } from "inversify";
import { Request,Response } from "express";
import bcrypt from "bcrypt"
import { controller, httpDelete, httpGet, httpPut } from "inversify-express-utils";
import { upload } from "../middlewares";
import { UserService } from "../services";
import { message, TYPES } from "../constants";
import { errorHandler } from "../utils";
@controller("/user")
export class UserController{
    
    constructor(@inject<UserService>(TYPES.UserService) private userService:UserService){}

    @httpPut("/updateUserById/:id",upload.single('profileImage'))
    async updateUserById(req:Request,res:Response){
        try {
            const id=req.params.id;
            const userData=req.body;
            if(userData.password){
                let hashedpsswd=bcrypt.hashSync(userData.password,10);
                userData.password=hashedpsswd
            }
            if(req.file){
                userData.profileImage=req.file.filename
            }
            await this.userService.updateUser(id,userData)
            return {status:true,message:message.USERUPDATED}
        } catch (error:any) {
            const errorMessage=errorHandler(error);
            return {status:false,...errorMessage}
        }
    }

    @httpPut("updateParticularUser/",upload.single("profileImage"))
    async updateParticularUser(req:Request,res:Response){
        try {
            const id=req.headers._id as string;
            const userData=req.body;
            if(userData.password){
                let hashedpsswd=bcrypt.hashSync(userData.password,10);
                userData.password=hashedpsswd
            }
            if(req.file){
                userData.profileImage=req.file.filename
            }
            await this.userService.updateUser(id,userData);
            return {status:true,message:message.USERUPDATED}
        } catch (error:any) {
            const errorMessage=errorHandler(error);
            return {status:false,...errorMessage}
        }
    }

    @httpDelete("deleteUserById/:id")
    async deleteUserById(req:Request,res:Response){
        try {
            const id=req.params.id;
            await this.userService.deleteUser(id);
            return {status:true,message:message.USERDELETED}
        } catch (error:any) {
            const errorMessage=errorHandler(error);
            return {status:false,...errorMessage}
        }
    }

    @httpDelete("deleteUserById/:id")
    async deleteParticularUser(req:Request,res:Response){
        try {
            const id=req.headers._id as string;
            await this.userService.deleteUser(id)
            return {status:true,message:message.USERDELETED}
        } catch (error:any) {
            const errorMessage=errorHandler(error);
            return {status:false,...errorMessage}
        }
    }

    @httpGet("getAllUser")
    async getAll(req:Request,res:Response){
        try {
            const data=await this.userService.getAllUser();
            return {status:true,data:data}
        } catch (error:any) {
            const errorMessage=errorHandler(error);
            return {status:false,...errorMessage}
        }
    }

    @httpGet("getUserById")
    async getUserById(req:Request,res:Response){
        try {
            const id=req.headers._id as string;
            const data=await this.userService.getUserById(id);
            return {status:true,data:data}
        } catch (error:any) {
            const errorMessage=errorHandler(error);
            return {status:false,...errorMessage}
        }
    }
}