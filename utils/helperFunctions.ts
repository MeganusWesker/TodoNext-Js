import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from "jsonwebtoken";
import {serialize} from "cookie";
import { User } from '@/models/user';

export const errorHandler=(req:NextApiRequest, res:NextApiResponse,statusCode:number,message:string)=>{
    return res.status(statusCode).json({
            success:false,
            message,
       })
}

export const catchAsyncError=(func:Function)=>{
    const innerFunc=(req:NextApiRequest,res:NextApiResponse)=>{
        Promise.resolve(func(req,res))
        .catch((error)=>errorHandler(req,res,403,error.message))
    }

    return innerFunc;
}

export const getJwtToken=(_id:string)=>{
    return jwt.sign({ _id }, process.env.jwtSeceretKey as string );
}

export const cookiSetter=(res:NextApiResponse,token:string,isSet:boolean)=>{
    res.setHeader('Set-Cookie', serialize('token', token, {
        path:'/',
        httpOnly: true,
        maxAge: isSet ? Number(process.env.sessionDay) * 24 * 60 * 60 *1000 :0,
      }));
}

export const authChecker=async (req:NextApiRequest)=>{
    const cookie=req.headers.cookie;
    if(!cookie) return null;

    const token=cookie.split("=")[1];

    const decode=jwt.verify(token,process.env.jwtSeceretKey as string);
    return await User.findById(decode._id);
}