import { controller, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { Request,Response } from "express";
import { inject } from "inversify";
import { CategoryService } from "../services";
import { message, TYPES } from "../constants";
import { errorHandler } from "../utils";
@controller("/category")
export class CategoryController{
    
    constructor (@inject<CategoryService>(TYPES.CategoryService) private categoryService:CategoryService){}
    @httpPost("/addCategory")
    async addCategory(req:Request,res:Response){
        try {
            const categoryData=req.body;
            await this.categoryService.addCategory(categoryData)
            return {status:true,message:message.CAREGORYCREATED}
        } catch (error:any) {
            const errorMessage=errorHandler(error);
            return {status:false,...errorMessage}
        }
    }

    @httpPut("/updateCategory/:id")
    async updateCategory(req:Request,res:Response){
        try {
            const id=req.params.id;
            const categoryData=req.body;
            await this.categoryService.updateCategory(id,categoryData)
            return {status:true,message:message.CATEGORYUPDATED}
        } catch (error:any) {
            const errorMessage=errorHandler(error);
            return {status:false,...errorMessage}
        }
    }

    
    @httpPut("/deleteCategory/:id")
    async deleteCategory(req:Request,res:Response){
        try {
            const id=req.params.id;
            await this.categoryService.deleteCategory(id)
            return {status:true,message:message.CATEGORYDELETED}
        } catch (error:any) {
            const errorMessage=errorHandler(error);
            return {status:false,...errorMessage}
        }
    }

    @httpPut("/getCategories")
    async getCategories(req:Request,res:Response){
        try {
            const data=await this.categoryService.getCategories()
            return {status:true,data:data}
        } catch (error:any) {
            const errorMessage=errorHandler(error);
            return {status:false,...errorMessage}
        }
    }

}