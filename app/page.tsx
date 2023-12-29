import Form from "@/Components/clients/Form";
import TodoCard from "@/Components/servers/TodoCard";

export default function Home() {
  return (
     <div className="homeContainer">
         <h1>Add Task:</h1>

         <Form/>

         <h1>You're Daily Task:</h1>

         
         <TodoCard title={"this is title"} description={"this is description"} />
     </div>
  )
}
