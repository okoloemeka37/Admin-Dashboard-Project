'use client'
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {

    const [token, settoken] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        settoken(token);
    }, [])
    
    function logout() {
        localStorage.removeItem("authToken");
        window.location.reload();
    }

  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="flex justify-between items-center max-w-4xl mx-auto">
        <h1 className="text-lg font-bold">MyApp</h1>
        <div className="space-x-4">
          <Link href="/dashboard" className="hover:underline">Dashboard</Link>

        {token===null? <Link href="/" className="hover:underline">Login</Link>: <button onClick={logout}  className="hover:underline">Logout</button>} 
        </div>
      </div>
    </nav>
  );
}
