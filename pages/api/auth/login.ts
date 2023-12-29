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

    const { email, password } = req.body;

    if (!email || !password) {
      return errorHandler(req, res, 403, "please enter all fields");
    }

    await connectDatabase();

    let user = await User.findOne({ email });

    if (!user)
      return errorHandler(
        req,
        res,
        404,
        "invalid credentials"
      );

    const isMathced=await bcrypt.compare(password,user.password);

    if (!isMathced)
    return errorHandler(
      req,
      res,
      403,
      "invalid credentials"
    );

    const token = getJwtToken(user._id);

    cookiSetter(res,token,true);

    res.status(200).json({
      success: true,
      user,
      message:`welcome back ${user.name}`
    });
  }
);
