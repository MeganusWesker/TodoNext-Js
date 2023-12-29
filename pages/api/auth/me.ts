import { authChecker, catchAsyncError, errorHandler } from "@/utils/helperFunctions";
import type { NextApiRequest, NextApiResponse } from "next";


export default catchAsyncError(async (req:NextApiRequest,res:NextApiResponse)=>{
    const user=await authChecker(req);
    if(!user) return errorHandler(req, res, 403, "Login first to access this route");

    res.status(200).json({
        success: true,
        user,
      });
})