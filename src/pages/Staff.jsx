import { Key, PlusIcon } from 'lucide-react'
import StaffInfoCard from '../components/common/staff/StaffInfoCard.jsx'
import StasCrad from '../components/common/staff/StaffCard.jsx'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext.jsx';
import StaffCard from '../components/common/staff/StaffCard.jsx';

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
            <StaffCard key={user.id} user={user} />
          )) : <p>No staff members found.</p>
          }
        </div>
    </div>
  )
}

export default Staff