import { catchAsyncError, cookiSetter, errorHandler } from "@/utils/helperFunctions";
import type { NextApiRequest, NextApiResponse } from "next";

export default catchAsyncError(async (req:NextApiRequest,res:NextApiResponse)=>{
  if (req.method != "GET") {
    return errorHandler(req, res, 404, "method not found on this url");
  }
    cookiSetter(res,"",false);

    res.status(200).json({
      success: true,
      message:"logged out successfully"
    });
});