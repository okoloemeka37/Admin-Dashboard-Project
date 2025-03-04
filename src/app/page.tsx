'use client'
import { api } from 'next-laravel-apihelper';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import ButtonLoaders from './conponents/Loaders';
import { useAuth } from './context/AuthContext';

export default function Login () {
const router=useRouter()
  const {login}=useAuth();
  const [isloading, setisloading] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const  [error, setError] = useState({'email':'','password':''});
 

  useEffect(() => {
    const token=localStorage.getItem('authToken');
    if (token!== null) {
    
      router.push('/dashboard')
    }
  }, [])
  

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {

      e.preventDefault();
      setisloading(true);
     try {
      const response = await api.post("/login", { email, password });
setisloading(false);
     localStorage.setItem('authToken', response.token);
    login(response.token);
     } catch (error) {
      setisloading(false);
        if ((error as any).response && (error as any).response.data) {

            setError((error as any).response.data.errors);
         
        } else {
          setError({ email: 'Unknown error', password: 'Unknown error' });
        }
     }
    }
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          <form className="space-y-4" onSubmit={handleLogin}>
            <input
              type="email"
              value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email'
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-600">{error.email}</p>
            <input
              type="password"
            value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-600">{error.password}</p>
            {isloading?<ButtonLoaders ty={'login you in'} />:  <button className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
              Login
            </button>}
          
          </form>
        </div>
      </div>
    );
}

