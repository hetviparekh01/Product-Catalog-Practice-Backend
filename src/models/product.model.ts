import mongoose, { Schema } from "mongoose";

const ProductSchema=new Schema({
    productName:{
        type:String,
        required:[true,"Product Name is required"],
        unique:true,
    },
    description:{
        type:String,
        required:[true,"Description is required"],
    },
    price:{
        type:Number,
        required:[true,"Price is required"],
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"Category is required for the Product"],
        ref:'category'
    },
    productImage:{
        type:String,
        required:[true,"Product Image is required"]
    }
},{
    timestamps:true
})

export const Product=mongoose.model('product',ProductSchema)