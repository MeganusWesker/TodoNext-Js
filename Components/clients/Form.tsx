'use client'
import React, { useState } from 'react'
import "./form.css"
import toast from 'react-hot-toast';

const Form = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
  
    const submitHanlder = async (e:React.FormEvent) => {
      e.preventDefault();

      try {
       const res=await fetch('/api/createTodo',{
         method:"POST",
         headers:{
           'Content-Type':"application/json",
         },
         body:JSON.stringify({
          title,
          description
         }),
       });

       const data=await res.json();
        if(!data.success) return toast.error(data.message);

        toast.success(data.message);
      } catch (error:any) {
       toast.success(error.message);
      }
    };

  return (
    <div className='formContainer' >
        
      <form onSubmit={submitHanlder} className="form">
        <input
          type="text"
          placeholder="Enter you're Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter you're Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button>Add task</button>

      </form>
    </div>
  )
}

export default Form