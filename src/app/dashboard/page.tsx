"use client"
import { api } from 'next-laravel-apihelper';
import { useRouter } from 'next/navigation';
import { X } from "lucide-react";
import React, { useEffect } from 'react'


import { useState } from "react";

interface User {
    id:number;
  name: string;
  email: string;
}

export default function DashboardPage() {
    const router=useRouter()
  const [users, setUsers] = useState<User[]>([]);
  const [IsModalOpen, setIsModalOpen] = useState(false)
  const token=localStorage.getItem('authToken');

  const [data, setdata] = useState({name:'',email:'',password:''})

  useEffect(() => {
   if (token==null) {
    router.push('/')
   }else{
   async function getusers (){
   const response=await api.get('/user');
   setUsers(response)
    }
    getusers()
   }
  
  
  }, [token])
  

   
   async function addUser() {
        const res=await api.post('/adduser',data)
       if (res.status==200) {
        setIsModalOpen(false)
        setUsers(res.user) 
       }
    }

    
async function del(id:number) {
  const res=await api.delete('/deleteuser/'+id)
  if (res.status==200) {
    setUsers(res.user)
  }
    
}
  


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

        {/* Add User Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={()=>{setIsModalOpen(true)}}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            + Add User
          </button>
        </div>

        {/* User List */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-md">
            <thead>
              <tr className="bg-blue-500 text-white">
              
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user,index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                 
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">
                    <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-200 mr-2" onClick={()=>del(user.id)}>
                      Delete
                    </button>
                    <button className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition duration-200">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


        {/* MODAL */}
        {IsModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96 relative animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-center">Add User</h2>

            <input
              type="text"
              placeholder="Full Name"
              value={data.name}
                onChange={(e)=>setdata({...data,name:e.target.value})}             
              className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              placeholder="Email Address"
             value={data.email}
             onChange={(e)=>setdata({...data,email:e.target.value})}
             
              className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
              <input
              type="password"
              placeholder="Password Address"
             value={data.password}
             onChange={(e)=>setdata({...data,password:e.target.value})}
             
              className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={addUser}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tailwind Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
