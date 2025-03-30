"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const UserProfile = () => {
  const router = useRouter();
  const params = useParams(); // Directly use useParams()
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (!params?.id) return;

    const fetchUserData = async () => {
      try {
        const res = await axios.get(`/api/users/me`);
        setUser(res.data);
      } catch (error: any) {
        console.error(error);
        toast.error("Failed to load user data");
      }
    };

    fetchUserData();
  }, [params]);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  if (!user) {
    return <div className="flex justify-center items-center min-h-screen text-white">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen py-10 bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <img
          src={user.profilePic}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto border-4 border-gray-700"
        />
        <h2 className="text-2xl font-semibold mt-4">{user.name}</h2>
        <p className="text-gray-400">{user.email}</p>

        <div className="flex justify-around mt-4">
          <div>
            <h3 className="text-lg font-semibold">Posts</h3>
            <p className="text-xl font-bold">{user.posts?.length || 0}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Followers</h3>
            <p className="text-xl font-bold">{user.followers || 0}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Following</h3>
            <p className="text-xl font-bold">{user.following || 0}</p>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 transition-all rounded shadow">
            Edit Profile
          </button>
          <button
            className="px-4 py-2 bg-red-500 hover:bg-red-600 transition-all rounded shadow"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
