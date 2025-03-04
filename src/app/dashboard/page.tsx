"use client"
import { api } from 'next-laravel-apihelper';
import { useRouter } from 'next/navigation';
import { X } from "lucide-react";
import React, { useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client';

import ButtonLoaders from '../conponents/Loaders';

import { useState } from "react";
import { useAuth } from '../context/AuthContext';
import TableLoader from '../conponents/TableLoader';

interface User {
    id:number;
  name: string;
  email: string;
  password:string

}

export default function DashboardPage() {
    const router=useRouter()
  const [users, setUsers] = useState<User[]>([]);
  const [IsModalOpen, setIsModalOpen] = useState(false)
  const [IsEditModalOpen, setIsEditModalOpen] = useState(false)
 
  const [isloading, setisloading] = useState(false)
  const [addError,setaddError]=useState<{email:string,name:string,password:string}>({email:'',name:'',password:''})
const [isuserLoading,setisuserLoading]=useState(false)
  const [data, setdata] = useState({name:'',email:'',password:''})
  const [editdata, seteditdata] = useState({id:0,name:'',email:'',password:''})



const {isAuthenticated}=useAuth()
  useEffect(() => {
  const toke=localStorage.getItem("authToken");
       
   if (toke==null) {
    router.push('/')
   }else{
   async function getusers (){
    setisuserLoading(true)
   const response=await api.get('/user');

   setUsers(response.user)
   setisuserLoading(false)
    }
    getusers()
   }
  }, [])
 

   
   async function addUser() {
    try {
      setisloading(true);
      const res=await api.post('/adduser',data)
     if (res.status==200) {
      setIsModalOpen(false)
       
      setUsers(res.user) 
      setisloading(false)
     }
    } catch (error) {
      setaddError((error as any).response.data.errors)
      setisloading(false)
    }
   
    }

    const banner = useRef<HTMLDivElement>(null)

async function del(id: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
  // Remove the row from the table
  (e.target as HTMLElement).parentElement!.parentElement!.remove();
 banner.current?.classList.remove('hidden')
  const res = await api.delete('/deleteuser/' + id);
if (res.status=200) {
banner.current?.classList.add('hidden')
}
}
  
const editUser = (id: number) => {
  const user = users.find(user => user.id === id);
  if (user) {
    seteditdata({id:user.id, name: user.name, email: user.email, password: user.password });
    console.log(user)
    setIsEditModalOpen(true);
  }
}


async function update(id:number){
  setisloading(true);
  try {
    const res=await api.put('/updateuser/'+id,editdata)
    if (res.status==200) {
      setUsers(res.user)
      setIsEditModalOpen(false)
      setisloading(false);
  }
  } catch (error) {
    setaddError((error as any).response.data.errors)
    setisloading(false);
  }
 
}
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="banner bg-blue-700 text-white p-2.5 hidden" ref={banner}>User Deleted</div>
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
        {!isuserLoading?
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
                  <td className="p-3"><button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-200 mr-2" onClick={(e)=>{del(user.id,e)}}>
                      Delete
                    </button>
                   
                    <button className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition duration-200" onClick={()=>{editUser(user.id)}}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>:
       <TableLoader/>
      }
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
<p className='text-red-600'>{addError.name}</p>
            <input
              type="email"
              placeholder="Email Address"
             value={data.email}
             onChange={(e)=>setdata({...data,email:e.target.value})}
             
              className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className='text-red-600'>{addError.email}</p>
              <input
              type="password"
              placeholder="Password Address"
             value={data.password}
             onChange={(e)=>setdata({...data,password:e.target.value})}
             
              className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className='text-red-600'>{addError.password}</p>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
             {isloading?<ButtonLoaders ty={'Adding User'} />:  <button onClick={addUser} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"   >
                Add User
              </button> }
            </div>
          </div>
        </div>
      )}


{IsEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96 relative animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-center">Edit User</h2>

            <input
              type="text"
              placeholder="Full Name"
              value={editdata.name}
                onChange={(e)=>seteditdata({...editdata,name:e.target.value})}             
              className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
<p className='text-red-600'>{addError.name}</p>
            <input
              type="email"
              placeholder="Email Address"
             value={editdata.email}
             onChange={(e)=>seteditdata({...editdata,email:e.target.value})}
             
              className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className='text-red-600'>{addError.email}</p>
            
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
             {isloading?<ButtonLoaders ty={'Editing User'} />:  <button  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" onClick={()=>{update(editdata.id)}}  >
               Edit User
              </button> }
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
