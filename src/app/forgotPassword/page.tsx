"use client"
import Link from 'next/link'
import React, { useState } from 'react'

const page = () => {
    const [email, setEmail] = useState("");
    const onSubmit =async ()=>{

    }
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2 text-white">
      <h1 className="text-lg font-semibold">Forgot Password</h1>
      <hr />
      <label htmlFor="email">Enter your email</label>
      <input
      className="border border-gray-300 rounded p-2"
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <button onClick={onSubmit} className="py-2 px-4 mt-3 bg-blue-600 cursor-pointer text-white rounded">Submit</button>
      <Link  className="text-white mt-3" href="/login">Go to Login</Link> 
    </div>
  )
}

export default page