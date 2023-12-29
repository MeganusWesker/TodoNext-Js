"use client";

import React, { createContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

export const TodoContext = createContext(null);

const ContextApi = ({ children }: { children: React.JSX.Element }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/auth/me"); 
      const data = await res.json(); 

      console.log(data);

      if (data.success) {
        setUser(data.user);
      }
    })();
  }, []);

  return (
    <TodoContext.Provider value={{ user, setUser }}>
      {children}
      <Toaster />
    </TodoContext.Provider>
  );
};

export default ContextApi;
