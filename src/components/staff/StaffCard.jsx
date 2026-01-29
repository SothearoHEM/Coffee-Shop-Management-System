import React from 'react'
import { MdOutlineModeEdit } from 'react-icons/md';
import { FaRegTrashCan } from 'react-icons/fa6';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext.jsx';


function StaffCard({ user }) {
  const {deleteUser, editUser} = useContext(AuthContext);
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`))
    deleteUser(user.id);
  }
  const handleEdit = () => {
    // Optional: Implement edit functionality if needed
  }
  const handleDeactivate = () => {
    const updatedUser = {
      ...user,
      status: 'inactive',
    };
    editUser(updatedUser);
  }
  if (!user) return null;
  const hireDate = user.hireDate instanceof Date ? user.hireDate : new Date(user.hireDate);
  
  return (
        <div key={user.id} className='bg-white border border-blue-200 rounded-lg shadow-md p-4 items-center space-x-4'>
              <div className='flex'>
                <img src={user.avatar || 'https://via.placeholder.com/150'} alt={user.name} className='w-16 h-16 rounded-full object-cover mb-4' />
                <div className='flex flex-col ml-4'>
                  <h2 className='text-lg font-semibold text-blue-900'>{user.name}</h2>
                  <div className='flex gap-2'>
                    <p className='text-gray-900 bg-blue-300 px-2 text-sm rounded-lg py-0.5'>{user.role?.charAt(0).toUpperCase() + user.role?.slice(1)}</p>
                    <p className='text-gray-900 bg-green-300 px-2 text-sm rounded-lg py-0.5'>{user.status}</p>
                  </div>
                </div>
              </div>
              <div className='mt-7 space-y-2'>
                <p className='text-gray-600 text-sm'><span className='text-sm'>Email:</span> {user.email}</p>
                <p className='text-gray-600 text-sm'><span className='text-sm'>Phone:</span> {user.phone}</p>
                <p className='text-gray-600 text-sm'><span className='text-sm'>Hire Date:</span> {hireDate.toLocaleDateString()}</p>
              </div>
              <div className='mt-4 flex'>
                <button onClick={handleDeactivate} className='w-70 border border-blue-200 rounded-md px-4 py-1 mr-2 hover:bg-blue-300'>Deactivate</button>
                <button className='border border-blue-200 rounded-md px-4 py-1 mr-2 hover:bg-blue-300'><MdOutlineModeEdit /></button>
                <button onClick={handleDelete} className='border border-red-300 rounded-md px-4 py-1 text-red-500 hover:bg-red-300'><FaRegTrashCan /></button>
              </div>
        </div>
  )
}

export default StaffCard