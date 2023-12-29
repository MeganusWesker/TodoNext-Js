import { User } from "@/models/user";
import { connectDatabase } from "@/utils/connectDatabase";
import {
  catchAsyncError,
  cookiSetter,
  errorHandler,
  getJwtToken,
} from "@/utils/helperFunctions";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

export default catchAsyncError(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method != "POST") {
      return errorHandler(req, res, 404, "method not found on this url");
    }

    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return errorHandler(req, res, 403, "please enter all fields");
    }

    await connectDatabase();

    let user = await User.findOne({ email });

    if (user)
      return errorHandler(
        req,
        res,
        409,
        "user alread found with this " + email
      );

    const hashedPassword=await   bcrypt.hash(password,10);

    user = await User.create({
      email,
      password:hashedPassword,
      name,
    });

    const token = getJwtToken(user._id);

    cookiSetter(res,token,true);

    res.status(200).json({
      success: true,
      user,
      message:"user registered sucessfully"
    });
  }
);
