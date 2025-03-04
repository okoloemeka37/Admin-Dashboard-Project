import React from 'react'

export default function TableLoader() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg p-4">
  <table className="w-full border-collapse">
  <thead>
              <tr className="bg-blue-500 text-white">
              
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
    <tbody>
   <tr className="animate-pulse border-b">
        <td className="p-3">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </td>
        <td className="p-3">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
        </td>
        <td className="p-3">
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        </td>
       
      </tr>
      <tr className="animate-pulse border-b">
        <td className="p-3">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </td>
        <td className="p-3">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
        </td>
        <td className="p-3">
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        </td>
     
      </tr>
      <tr className="animate-pulse border-b">
        <td className="p-3">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </td>
        <td className="p-3">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
        </td>
        <td className="p-3">
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        </td>
    
      </tr>
    </tbody>
  </table>
</div>

  )
}
