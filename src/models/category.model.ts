import mongoose, { Schema } from "mongoose";

const CategorySchema= new Schema({
    categoryName:{
        type:String,
        required:[true,"Category Name is required"],
        unique:true,
    },
    description:{
        type:String,
        required:[true,"Description is required"],
    }
},{
    timestamps:true
})

export const Category=mongoose.model('category',CategorySchema)