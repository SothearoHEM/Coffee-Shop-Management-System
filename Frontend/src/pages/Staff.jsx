import { PlusIcon } from 'lucide-react'
import StaffInfoCard from '../components/staff/StaffInfoCard.jsx'
import { useContext,useState } from 'react'
import { AuthContext } from '../contexts/AuthContext.jsx';
import StaffCard from '../components/staff/StaffCard.jsx';
import AddStaffModal from '../components/staff/AddStaffModal.jsx';
import Lottie from 'lottie-react';
import NotFound from '../assets/NotFound.json';

function Staff() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {users} = useContext(AuthContext);
  const closeModal = () => {
    setIsModalOpen(false);
    setUserToEdit(null);
  }
  const [userToEdit, setUserToEdit] = useState(null);

  const userEdit = (id) => {
    setUserToEdit(id);
    setIsModalOpen(true);
  }
  const defaultValues = userToEdit ? users.find(user => user.id === userToEdit) : null;
  return (
    <div className='xl:w-7xl lg:p-2 w-full md:p-2 xl:p-0 p-2 mx-auto mt-6 flex flex-col space-y-4'>
        <div className='flex md:items-center md:justify-between mb-4 flex-col md:flex-row gap-4'>
          <div className='flex flex-col'>
            <h1 className='text-2xl font-semibold text-blue-950'>Staff Management</h1>
            <p className='text-gray-500'>Manage your team members and their roles</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} className='bg-blue-800 flex items-center text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition md:w-auto w-full md:mt-0 mt-2'><span className='mr-2'><PlusIcon /></span> Add New Staff</button>
        </div>
        <StaffInfoCard />
        <div className='w-full'>
          {users.length > 0 ? 
            <div className='grid md:grid-cols-3 grid-cols-1 gap-6'>
                {users.map((user) => <StaffCard key={user.id} user={user} userEdit={userEdit} />)}
            </div>
          :
          <div className='flex items-center justify-center h-125 mx-auto'>
            <Lottie animationData={NotFound} loop={true} className='w-64 h-64 md:w-90 md:h-90'/>
          </div>
          }
        </div>
        {isModalOpen && <AddStaffModal closeModal={closeModal} userToEdit={userToEdit} setUserToEdit={setUserToEdit} defaultValues={defaultValues} />}
    </div>
  )
}

export default Staff