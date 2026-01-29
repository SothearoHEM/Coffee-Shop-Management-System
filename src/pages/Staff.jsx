import { PlusIcon } from 'lucide-react'
import StaffInfoCard from '../components/staff/StaffInfoCard.jsx'
import { useContext,useState } from 'react'
import { AuthContext } from '../contexts/AuthContext.jsx';
import StaffCard from '../components/staff/StaffCard.jsx';
import AddStaffModal from '../components/staff/AddStaffModal.jsx';

function Staff() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {users} = useContext(AuthContext);
  const closeModal = () => {
    setIsModalOpen(false);
  }
  return (
    <div className='w-7xl mx-auto mt-6 flex flex-col space-y-4'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <h1 className='text-2xl font-semibold text-blue-950'>Staff Management</h1>
            <p className='text-gray-500'>Manage your team members and their roles</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} className='bg-blue-800 flex items-center text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition'><span className='mr-2'><PlusIcon /></span> Add New Staff</button>
        </div>
        <StaffInfoCard />
        <div className='w-7xl grid grid-cols-3 gap-6'>
          {
          users?users.map((user) => (
            <StaffCard key={user.id} user={user} />
          )) : <p>No staff members found.</p>
          }
        </div>
        {isModalOpen && <AddStaffModal closeModal={closeModal} />}
    </div>
  )
}

export default Staff