"use client"

import React, { useState } from "react";
import axios from 'axios';
import Link from 'next/link';
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


const profilePage = () => {
  const router = useRouter();
  const [data, setData] = useState("nothing")
  const logout =async () => { 
    try {
      await axios.get('/api/users/logout');
      toast.success("Logged out successfully");
      router.push('/login');
    } catch (error: any) {
      console.error(error);
      toast.error("An error occurred",error.message);
    }
  }
  const getUserData = async ()=>{
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  }
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2 text-white">
      profilePage {data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>link</Link> }
      <button className="px-4 py-2 mt-3 rounded bg-red-400 text-white cursor-pointer" onClick={logout}>Logout</button>
      <button className="px-4 py-2 mt-3 rounded bg-red-400 text-white cursor-pointer" onClick={getUserData}>User Data</button>
    </div>
  );
};

export default profilePage;
