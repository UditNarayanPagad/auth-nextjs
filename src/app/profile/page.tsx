"use client";

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      console.error(error);
      toast.error("An error occurred", error.message);
    }
  };

  const getUserData = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setData(res.data.data._id);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch user data");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-6 bg-gray-900 text-white">
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-[350px] text-center">
        <h2 className="text-2xl font-semibold">Profile Page</h2>
        <p className="mt-2 text-lg">
          {data === "nothing" ? (
            "No user data available"
          ) : (
            <Link href={`/profile/${data}`} className="text-blue-400 underline hover:text-blue-300">
              View Profile
            </Link>
          )}
        </p>
        <div className="mt-4 flex flex-col gap-3">
          <button
            className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 transition-all shadow-md"
            onClick={logout}
          >
            Logout
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 transition-all shadow-md"
            onClick={getUserData}
          >
            Fetch User Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
