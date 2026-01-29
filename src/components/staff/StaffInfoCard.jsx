import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext.jsx';

function StaffInfoCard() {
    const {users} = useContext(AuthContext);
    const totalStaff = users?.length || 0;
    const activeStaff = users?.filter(user => user.status === 'active').length || 0;
    const adminStaff = users?.filter(user => user.role === 'admin').length || 0;

  return (
    <div className='w-full grid grid-cols-3 gap-5'>
        <div className='w-full bg-white border border-blue-200 rounded-lg shadow-md p-4 flex flex-col space-y-10'>
            <p className='font-semibold'>Total Staff</p>
            <h2 className='text-xl font-bold text-blue-900'>{totalStaff}</h2>
        </div>
        <div className='w-full bg-white border border-blue-200 rounded-lg shadow-md p-4 flex flex-col space-y-10'>
            <p className='font-semibold'>Active Staff</p>
            <h2 className='text-xl font-bold text-blue-900'>{activeStaff}</h2>
        </div>
        <div className='w-full bg-white border border-blue-200 rounded-lg shadow-md p-4 flex flex-col space-y-10'>
            <p className='font-semibold'>Admin</p>
            <h2 className='text-xl font-bold text-blue-900'>{adminStaff}</h2>
        </div>
    </div>
  )
}

export default StaffInfoCard