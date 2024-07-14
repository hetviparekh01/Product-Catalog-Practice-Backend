import { injectable } from "inversify";
import { ICategory } from "../interfaces";
import { Category } from "../models";

@injectable()
export class CategoryService{
    async addCategory(categoryData:ICategory){
        try {
            await Category.create(categoryData)
        } catch (error:any) {
            throw(error)
        }
    }

    async updateCategory(categoryId:string,categoryData:ICategory){
        try {
            await Category.findByIdAndUpdate(categoryId,categoryData)
        } catch (error:any) {
            throw(error)
        }
    }

    async deleteCategory(categoryId:string){
        try {
            await Category.findByIdAndDelete(categoryId)
        } catch (error:any) {
            throw(error)
        }
    }

    async getCategories(){
        try {
            await Category.find({})
        } catch (error:any) {
            throw(error)
        }
    }
}