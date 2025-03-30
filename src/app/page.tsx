"use client";

import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

const Dashboard = () => {
  const router = useRouter();

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

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 flex flex-col">
        <h2 className="text-xl font-bold text-center mb-6">Dashboard</h2>
        <nav className="flex flex-col gap-4">
          <Link href="/profile" className="hover:text-blue-400">Profile</Link>
          <Link href="/settings" className="hover:text-blue-400">Settings</Link>
          <Link href="/analytics" className="hover:text-blue-400">Analytics</Link>
        </nav>
        <button 
          onClick={logout} 
          className="mt-auto bg-red-500 hover:bg-red-600 transition-all py-2 rounded text-center shadow-md"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-semibold">Welcome to Your Dashboard</h1>
        <p className="text-gray-400 mt-2">Manage your account and view insights.</p>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium">Total Users</h3>
            <p className="text-2xl font-bold">1,234</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium">Active Sessions</h3>
            <p className="text-2xl font-bold">98</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium">Messages Sent</h3>
            <p className="text-2xl font-bold">12,457</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
