'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import ButtonLoaders from './Loaders';
import { useAuth } from "../context/AuthContext";
import { api } from "next-laravel-apihelper";
export default function Navbar() {
const {isAuthenticated,logout}=useAuth()
   
    const [isloading, setisloading] = useState(false)

    
   async function ogout() {
    setisloading(true);
    const res= await api.post("/logout");
    if (res.status==200) {
       logout()
       setisloading(false);
      
    }
     
    }

  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="flex justify-between items-center max-w-4xl mx-auto">
        <h1 className="text-lg font-bold">MyApp</h1>
        <div className="space-x-4">
          

     {!isAuthenticated? <Link href="/" className="hover:underline">Login</Link>: isloading?<ButtonLoaders ty={'Loging you out'} />:<> <Link href="/dashboard" className="hover:underline">Dashboard</Link> <button onClick={ogout}  className="hover:underline">Logout</button></> } 
        </div>
      </div>
    </nav>
  );
}
