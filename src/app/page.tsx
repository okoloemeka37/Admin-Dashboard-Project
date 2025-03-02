'use client'
import { api } from 'next-laravel-apihelper';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function Login () {
  const router=useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const  [error, setError] = useState({'email':'','password':''});
  

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {

      e.preventDefault();
     try {
      const response = await api.post("/login", { email, password });
      console.log(response)
     localStorage.setItem('authToken', response.token);
     router.push('/dashboard');
     } catch (error) {
        setError(error.response.data.errors);   
     }
    }
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          <form className="space-y-4" onSubmit={handleLogin}>
            <input
              type="email"
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-600">{error.email}</p>
            <input
              type="password"
            value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-600">{error.password}</p>
            <button className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
              Login
            </button>
          </form>
        </div>
      </div>
    );
}

