"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const SignupPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/users/signup", user);
      console.log(response.data);
      toast.success("Signup successful");
      router.push("/login");
    } catch (error: any) {
      console.error("Signup failed", error);
      toast.error("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password && user.username));
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white px-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-4">
          {loading ? "Processing..." : "Sign Up"}
        </h1>
        <hr className="mb-4 border-gray-600" />

        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-gray-400 text-sm">
              Username
            </label>
            <input
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              type="text"
              id="username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-400 text-sm">
              Email
            </label>
            <input
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-400 text-sm">
              Password
            </label>
            <input
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              type="password"
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter your password"
            />
          </div>

          <button
            onClick={onSignup}
            disabled={buttonDisabled}
            className={`w-full py-2 mt-4 rounded text-white font-semibold transition-all ${
              buttonDisabled
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {buttonDisabled ? "Enter Details" : "Sign Up"}
          </button>
        </div>

        <p className="text-center mt-4 text-gray-400 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
