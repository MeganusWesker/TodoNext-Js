"use client";
import Link from "next/link";
import React, { useContext } from "react";
import { TodoContext } from "./ContextApi";
import toast from "react-hot-toast";

const LoginButton = () => {

    const {user,setUser} =useContext(TodoContext);

    const logoutHandler=async (e:React.MouseEvent)=>{
      e.preventDefault();

        try {
          const res=await fetch('/api/auth/logout');
          const data=await res.json();
          setUser({});
          toast.success(data.message);
        } catch (error) {
          toast.error(error.message);
        }

    }


  return (
       
        user._id !==undefined ?   <button className="loginBtn btn" onClick={logoutHandler}>LoGout</button> :       <li>
           <Link href={"/login"}>LoGiN</Link>
        </li>
     
  );
};

export default LoginButton;
