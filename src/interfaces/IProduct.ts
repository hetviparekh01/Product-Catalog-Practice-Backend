import { ObjectId } from "mongoose";

export interface IProduct{
    productName:string;
    description:string;
    price:number;
    categoryId:ObjectId;
    productImage:string;
}