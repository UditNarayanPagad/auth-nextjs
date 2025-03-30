"use client"
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function verifyEmailPage(){
    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyUserEmail = async()=>{
        try {
            await axios.post("api/users/verifyEmail",{token})
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.log(error.response.data);
        }
    }
    useEffect(()=>{
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    },[])
    useEffect(() => {
      if(token.length > 0){
        verifyUserEmail();
      }
    }, [token])
    
    return(
        <div className="flex justify-center items-center p-2 min-h-screen">
            <h1 className="text-xl">Verify Email</h1>
            <h2 className="text-lg bg-amber-600 p-2">{token?`${token}`:"no token"}</h2>

            {verified && (
                <div className="">
                    <h2 className="text-xl p-2">Email verified</h2>
                    <Link href="/login">login</Link>
                </div>
            )}
            {error && (
                <div className="">
                    <h2 className="text-xl p-2 text-red-400">Error</h2>
                </div>
            )}
        </div>
    )
}