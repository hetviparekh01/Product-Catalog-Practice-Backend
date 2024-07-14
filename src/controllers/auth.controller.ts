import { controller, httpPost } from "inversify-express-utils";
import { Request, Response } from "express";
import { multerErrorHandling, upload } from "../middlewares";
import { inject } from "inversify";
import { AuthService } from "../services";
import { message, TYPES } from "../constants";
import { errorHandler } from "../utils";
@controller("/auth")
export class AuthController{

    constructor(@inject<AuthService>(TYPES.AuthService) private authService:AuthService){}

    @httpPost('/signup',upload.single('profileImage'))
    async signup(req:Request,res:Response){
        try {
            const userData=req.body;
            userData.profileImage=req.file?.filename;
            // console.log(req.file);
            await this.authService.signup(userData)
            return {status:true,message:message.USERSIGNEDUP}
        } catch (error:any) {
            const errorMessage=errorHandler(error);
            return {status:false,...errorMessage}
        }
    }

    @httpPost("/login")
    async login(req:Request,res:Response){
        try {
            const userData=req.body;
            const data=await this.authService.login(userData)
            return {status:false,message:message.USERLOGGEDIN,data:data}
        } catch (error:any) {
            const errorMessage=errorHandler(error);
            return {status:false,...errorMessage}
        } 
    }
}