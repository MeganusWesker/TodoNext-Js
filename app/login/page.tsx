"use client";
import { TodoContext } from "@/Components/clients/ContextApi";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {user,setUser} =useContext(TodoContext);

  const submitHanlder = async(e: React.FormEvent) => {
        e.preventDefault();

       try {
        const res=await fetch('/api/auth/login',{
          method:"POST",
          headers:{
            'Content-Type':"application/json",
          },
          body:JSON.stringify({
            email,
            password
          }),
        });

        const data=await res.json();
        setUser(data.user);

         toast.success(data.message);
       } catch (error:any) {
        toast.success(error.message);
       }
  };

  if(user?._id!==undefined) return redirect('/')

  return (
    <div className="LoginContainer">
      <h1>Login :</h1>

      <form onSubmit={submitHanlder} className="form">
        <input
          type="email"
          placeholder="Enter you're email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter you're password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>Login</button>

        <div>
          <p>Or</p>

          <Link href={"/register"}> New User ? register</Link>
        </div>
      </form>
    </div>
  );
};

export default page;
