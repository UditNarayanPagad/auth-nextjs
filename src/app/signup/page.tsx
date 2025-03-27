"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const signupPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      const response = await axios.post("/api/users/signup", user);
      console.log(response.data);
      toast.success("Signup successful");
      router.push("/login");

    } catch (error: any) {
      console.log("Signup failed",error);
      toast.error("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true)}
  }, [user])
  

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2 text-white">
      <h1 className="text-lg font-semibold">{loading ? "Processing.." : "Sign up"}</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
      className="border border-gray-300 rounded p-2"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      <label htmlFor="email">email</label>
      <input
      className="border border-gray-300 rounded p-2"
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
      className="border border-gray-300 rounded p-2"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button onClick={onSignup} className="py-2 px-4 mt-3 bg-blue-600 cursor-pointer text-white rounded">{buttonDisabled ? "No Signup" : "Signup"}</button>
      <Link className="text-white mt-3" href="/login">Go to login</Link> 
    </div>
  );
};

export default signupPage;
