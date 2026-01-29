import { PlusIcon } from 'lucide-react'
import StaffInfoCard from '../components/common/staff/StaffInfoCard.jsx'
import StasCrad from '../components/common/staff/StaffCard.jsx'
import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext.jsx';
import { MdOutlineModeEdit } from 'react-icons/md';
import { FaRegTrashCan } from 'react-icons/fa6';

function Staff() {
  const {users} = useContext(AuthContext);
  return (
    <div className='w-7xl mx-auto mt-6 flex flex-col space-y-4'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <h1 className='text-2xl font-semibold text-blue-950'>Staff Management</h1>
            <p className='text-gray-500'>Manage your team members and their roles</p>
          </div>
          <button className='bg-blue-800 flex items-center text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition'><span className='mr-2'><PlusIcon /></span> Add New Staff</button>
        </div>
        <StaffInfoCard />
        <StasCrad />
        <div className='w-7xl grid grid-cols-3 gap-6'>
          {
          users?users.map((user) => (
            <div key={user.id} className='bg-white border border-blue-200 rounded-lg shadow-md p-4 items-center space-x-4'>
              <div className='flex'>
                <img src={user.avatar} alt={user.name} className='w-16 h-16 rounded-full object-cover mb-4' />
                <div className='flex flex-col ml-4'>
                  <h2 className='text-lg font-semibold text-blue-900'>{user.name}</h2>
                  <div className='flex gap-2'>
                    <p className='text-gray-900 bg-blue-300 px-2 text-sm rounded-lg py-0.5'>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
                    <p className='text-gray-900 bg-green-300 px-2 text-sm rounded-lg py-0.5'>{user.status}</p>
                  </div>
                </div>
              </div>
              <div className='mt-7 space-y-2'>
                <p className='text-gray-600 text-sm'><span className='text-sm'>Email:</span> {user.email}</p>
                <p className='text-gray-600 text-sm'><span className='text-sm'>Phone:</span> {user.phone}</p>
                <p className='text-gray-600 text-sm'><span className='text-sm'>Hire Date:</span> {user.hireDate.toLocaleDateString()}</p>
              </div>
              <div className='mt-4 flex'>
                <button className='w-70 border border-blue-200 rounded-md px-4 py-1 mr-2 hover:bg-blue-300'>Deactivate</button>
                <button className='border border-blue-200 rounded-md px-4 py-1 mr-2 hover:bg-blue-300'><MdOutlineModeEdit /></button>
                <button className='border border-red-300 rounded-md px-4 py-1 text-red-500 hover:bg-red-300'><FaRegTrashCan /></button>
              </div>
            </div>
          )) : <p>No staff members found.</p>
        }
        </div>
    </div>
  )
}

export default Staff