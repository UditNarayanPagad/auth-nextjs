"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const onLogin = async () => {
    setLoading(true);
    try {
      console.log(user);
      const response = await axios.post("/api/users/login", user);
      console.log(response.data);
      toast.success("Login successful!");
      router.push("/profile");
    } catch (error: any) {
      console.error("Login failed", error);
      toast.error(error.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white px-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-4">
          {loading ? "Processing..." : "Login"}
        </h1>
        <hr className="mb-4 border-gray-600" />

        <div className="space-y-4">
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
            onClick={onLogin}
            disabled={buttonDisabled}
            className={`w-full py-2 mt-4 rounded text-white font-semibold transition-all ${
              buttonDisabled
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <div className="mt-4 text-center space-y-2">
          <p className="text-gray-400 text-sm">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-400 hover:underline">
              Sign up here
            </Link>
          </p>
          <p className="text-gray-400 text-sm">
            <Link href="/forgotPassword" className="text-red-400 hover:underline">
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
