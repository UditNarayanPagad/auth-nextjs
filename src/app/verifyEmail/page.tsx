"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    if (token) {
      verifyUserEmail();
    }
  }, [token]);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyEmail", { token });
      setVerified(true);
      toast.success("Email verified successfully!");
    } catch (err: any) {
      setError(true);
      toast.error(err.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white px-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-4">Verify Email</h1>

        {verified ? (
          <div>
            <h2 className="text-lg text-green-400 mb-4">Email Verified! 🎉</h2>
            <Link href="/login">
              <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white font-semibold">
                Go to Login
              </button>
            </Link>
          </div>
        ) : error ? (
          <h2 className="text-lg text-red-400">Verification Failed ❌</h2>
        ) : (
          <h2 className="text-lg text-gray-400">Verifying...</h2>
        )}
      </div>
    </div>
  );
}
