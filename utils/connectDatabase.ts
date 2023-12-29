import mongoose from "mongoose";

export const connectDatabase=async()=>{
   try {
    const {connection}=await mongoose.connect('mongodb+srv://socialApp:bjyagL6yLAxLc2yF@ecommerce.g86ki.mongodb.net/nextJsPractice?retryWrites=true&w=majority');
    console.log(connection.host +"connected")
   } catch (error) {
     console.log(error)
   }
}