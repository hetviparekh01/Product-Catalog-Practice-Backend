import {Request,Response, NextFunction } from "express"
import multer from "multer"
import { message, statusCode } from "../constants"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+'-'+file.originalname)
    }
  })
  

// export const multerErrorHandling=(err:any,req:Request,res:Response,next:NextFunction)=>{
//     if (err instanceof multer.MulterError) {
//         console.log(err);
//        return res.json({status:false,message:err,statusCode:statusCode.BadRequest}) 
//     } 
//     next()
// }
export const multerErrorHandling = (err:any, req:Request, res:Response, next:NextFunction) => {
    if (err instanceof multer.MulterError) {
      res.status(400).send("Multer error: " + err.message);
    } else {
      next();
    }
    };
export const upload = multer({ storage: storage })