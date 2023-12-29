import { Todo } from "@/models/todo";
import {
  authChecker,
  catchAsyncError,
  errorHandler,
} from "@/utils/helperFunctions";
import type { NextApiRequest, NextApiResponse } from "next";

export default catchAsyncError(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await authChecker(req);
    if (!user)
      return errorHandler(req, res, 403, "Login first to access this route");

    const { taskId } = req.query;

    const task = await Todo.findById(taskId);
    if (!task) return errorHandler(req, res, 403, "task not found");

    if (user._id.toString() != task.user.toString())
      return errorHandler(req, res, 403, "not authorized");

    if (req.method === "PUT") {
      task.isDone = !task.isDone;
      await task.save();

      res.status(200).json({
        success: true,
        task,
        message: "task updated sucessfully",
      });
    } else if (req.method === "DELETE") {

        await Todo.deleteOne({ _id:task._id });
        res.status(200).json({
            success: true,
            message: "task deleted sucessfully",
          });
    } else {
      return errorHandler(req, res, 404, "method not found on this url");
    }
  }
);
