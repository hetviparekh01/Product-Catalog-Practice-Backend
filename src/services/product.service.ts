import { injectable } from "inversify";
import { IProduct } from "../interfaces";
import { Product } from "../models";

@injectable()
export class ProductService{
    async addProduct(productData:IProduct){
        try {
            await Product.create(productData)
        } catch (error:any) {
            throw(error)
        }
    }

    async updateProduct(productId:string,productData:IProduct){
        try {
            await Product.findByIdAndUpdate(productId,productData)
        } catch (error:any) {
            throw(error)
        }
    }

    async deleteProduct(productId:string){
        try {
            await Product.findByIdAndDelete(productId)
        } catch (error:any) {
            throw(error)
        }
    }

    async getProducts(){
        try {
            const data=await Product.find({})
            return data
        } catch (error:any) {
            throw(error)
        }
    }

    async getProductById(productId:string){
        try {
            const data=await Product.findById(productId)
            return data
        } catch (error:any) {
            throw(error)
        }
    }
}