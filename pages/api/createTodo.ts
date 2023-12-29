import type { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase } from "../../utils/connectDatabase";
import { authChecker, catchAsyncError, errorHandler } from "@/utils/helperFunctions";
import { Todo } from "@/models/todo";

export default catchAsyncError(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method != "POST") {
      return errorHandler(req, res, 404, "method not found on this url");
    }

    await connectDatabase();

    const { title, description }: { title: string; description: string } =
      req.body;

      const user=await authChecker(req);
      if(!user) return errorHandler(req, res, 403, "Login first to access this route");


    const todo = await Todo.create({
      title,
      description,
      user:user._id
    });

    res.status(200).json({
      success: true,
      todo,
    });
  }
);
