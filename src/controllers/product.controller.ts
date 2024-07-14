import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { ProductService } from "../services/product.service";
import { message, TYPES } from "../constants";
import { inject } from "inversify";
import { upload } from "../middlewares";
import { Request,Response } from "express";
import { errorHandler } from "../utils";
@controller("/product")
export class ProductController{
    constructor(@inject<ProductService>(TYPES.ProductService) private productService:ProductService){}

    @httpPost("/addProduct",upload.single('productImage'))
    async addProduct(req:Request,res:Response){
        try {
            const productData=req.body;
            productData.productImage=req.file?.filename
            await this.productService.addProduct(productData)
            return {status:true,message:message.PRODUCTCREATED}

        } catch (error:any) {
            const errorMessage=errorHandler(error);
            return {status:false,...errorMessage}
        }
    }

    @httpPut("/updateProduct/:id",upload.single('productImage'))
    async updateProduct(req:Request,res:Response){
        try {
            const id=req.params.id
            const productData=req.body;
            if(req.file){
                productData.productImage=req.file.filename
            }
            await this.productService.updateProduct(id,productData)
            return {status:true,message:message.PRODUCTUPDATED}
        } catch (error:any) {
            const errorMessage=errorHandler(error);
            return {status:false,...errorMessage}
        }
    }

    @httpDelete("/deleteProduct/:id")
    async deleteProduct(req:Request,res:Response){
        try {
            const id=req.params.id
            await this.productService.deleteProduct(id)
            return {status:true,message:message.PRODUCTDELETED}
        } catch (error:any) {
            const errorMessage=errorHandler(error);
            return {status:false,...errorMessage}
        }
    }

    @httpGet("/getProducts")
    async getProducts(req:Request,res:Response){
        try {
            const data=await this.productService.getProducts()
            return {status:true,data:data}
        } catch (error:any) {
            const errorMessage=errorHandler(error);
            return {status:false,...errorMessage}
        }
    }
    
    @httpGet("/getProductById/:id")
    async getProductById(req:Request,res:Response){
        try {
            const id=req.params.id
            const data=await this.productService.getProductById(id)
            return {status:true,data:data}
        } catch (error:any) {
            const errorMessage=errorHandler(error);
            return {status:false,...errorMessage}
        }
    }
}