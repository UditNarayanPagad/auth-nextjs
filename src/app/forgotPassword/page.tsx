"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ForgotPasswordPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent2, setSent2] = useState(false)

  const onSubmit = async () => {
    try {
      setLoading(true);
      await axios.post("api/users/forgotPassword", { token, user });
      setSent(true);
      if(token.length > 0){
        toast.success("Reset password successfull");
        setSent2(true);
      }
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
      toast.success(error.response.data);
      setSent(false);
      setSent2(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center">
          {sent ? "Check Your Email" : "Reset Password"}
        </h1>
        <h2 className="text-xl font-semibold text-center">
          {sent2 ? "Password reset Successfully" : ""}
        </h2>
        <hr className="my-4 border-gray-600" />

        <div className="w-full flex flex-col gap-3">
          <label htmlFor="email" className="text-sm">
            Enter your email
          </label>
          <input
            className="border text-white border-gray-600 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            type="email"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Enter your email"
          />

          {token.length > 0 && (
            <>
              <label htmlFor="password" className="text-sm">
                New password
              </label>
              <input
                className="border border-gray-600 rounded-lg p-2 text-white focus:ring-2 focus:ring-blue-500"
                type="password"
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Enter new password"
              />
            </>
          )}

          <button
            onClick={onSubmit}
            className={`py-2 px-4 mt-3 rounded-lg font-semibold text-white w-full ${
              loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Submit"}
          </button>

          <Link className="text-blue-400 hover:underline text-center mt-3" href="/login">
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
