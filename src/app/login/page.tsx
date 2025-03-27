"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import  axios  from "axios";
import toast from "react-hot-toast";

const loginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const onLogin = async () => {
    try {
      setLoading(true);
      console.log(user)
      const response = await axios.post("/api/users/login", user);
      console.log(response.data);
      toast.success("Login successful");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed",error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      if (user.email.length > 0 && user.password.length > 0) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true)}
    }, [user])
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2 text-white">
      <h1 className="text-lg font-semibold">{loading ? "Processing.." : "Login"}</h1>
      <hr />
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
      <button onClick={onLogin} className="py-2 px-4 mt-3 bg-blue-600 cursor-pointer text-white rounded">{buttonDisabled ? "No Login" : "Login"}</button>
      <Link className="text-white mt-3" href="/signup">Go to Signup</Link> 
    </div>
  );
};

export default loginPage;
