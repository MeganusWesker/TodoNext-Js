import type { NextApiRequest, NextApiResponse } from "next";
import { authChecker, catchAsyncError, errorHandler } from "@/utils/helperFunctions";
import { Todo } from "@/models/todo";

export default catchAsyncError(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method != "GET") {
      return errorHandler(req, res, 404, "method not found on this url");
    }

    const user=await authChecker(req);
    if(!user) return errorHandler(req, res, 403, "Login first to access this route");

    const tasks=await Todo.find({user:user._id});

    res.status(200).json({
        success: true,
        tasks,
      });
  }
);
