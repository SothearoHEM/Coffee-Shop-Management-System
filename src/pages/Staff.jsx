import { PlusIcon } from 'lucide-react'
import StaffInfoCard from '../components/common/staff/StaffInfoCard.jsx'
import React from 'react'

function Staff() {
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
    </div>
  )
}

export default Staff