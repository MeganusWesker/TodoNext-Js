"use client";

import { TodoContext } from "@/Components/clients/ContextApi";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const { user, setUser } = useContext(TodoContext);

  const submitHanlder = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          password,
          email,
        }),
      });

      const data = await res.json();
      if (!data.success) toast.error(data.message);

      setUser(data.user);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  if(user?._id!==undefined) return redirect('/')

  return (
    <div className="LoginContainer">
      <h1>Register :</h1>

      <form onSubmit={submitHanlder} className="form">
        <input
          type="email"
          placeholder="Enter you're email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter you're name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter you're password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>register</button>

        <div>
          <p>Or</p>

          <Link href={"/login"}> Old User ? Login</Link>
        </div>
      </form>
    </div>
  );
};

export default page;
