import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext.jsx';

function AddStaffModal({ closeModal , userToEdit, setUserToEdit, defaultValues}) {
  const { addUser, editUser } = useContext(AuthContext);
  const [addStaffData, setAddStaffData] = useState({
      name: '',
      email: '',
      password: '',
      phone: '',
      role: '',
      avatar: null,
      activeStatus: true,
    });

  useEffect(() => {
    if (defaultValues) {
      setAddStaffData({
        name: defaultValues.name || '',
        email: defaultValues.email || '',
        password: defaultValues.password || '',
        phone: defaultValues.phone || '',
        role: defaultValues.role || '',
        avatar: defaultValues.avatar || null,
        activeStatus: defaultValues.status === 'active',
      });
    }
  }, [defaultValues, userToEdit]);
   const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setAddStaffData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else if (type === 'file') {
      setAddStaffData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setAddStaffData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  }
  const validateForm = () => {
    if (!addStaffData.name || !addStaffData.email || !addStaffData.phone || !addStaffData.role) {
      alert('Please fill in all required fields.');
      return false;
    }
    // Password is only required when adding a new user
    if (!userToEdit && !addStaffData.password) {
      alert('Please enter a password.');
      return false;
    }
    return true;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    if (userToEdit) {
      // Edit existing user
      editUser({
        ...defaultValues,
        ...addStaffData,
        status: addStaffData.activeStatus ? 'active' : 'inactive',
        avatar: addStaffData.avatar instanceof File ? URL.createObjectURL(addStaffData.avatar) : addStaffData.avatar,
      });
      setUserToEdit(null);
    } else {
      // Add new user
      addUser({
        ...addStaffData,
        id: Date.now().toString(),
        hireDate: new Date(),
        status: addStaffData.activeStatus ? 'active' : 'inactive',
        avatar: addStaffData.avatar ? URL.createObjectURL(addStaffData.avatar) : null,
      });
    }
    closeModal();
  }
  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center md:p-0 p-2 z-50'>
        <form className='bg-white p-6 rounded-md shadow-md max-w-xl w-full' onSubmit={handleSubmit}>
            <h2 className='text-xl mb-2'>{userToEdit ? 'Edit Staff Member' : 'Add New Staff Member'}</h2>
            <p className='mb-4 text-sm text-gray-600'>{userToEdit ? 'Update staff member information.' : 'Add a new team member to your coffee shop.'}</p>
            <div className='mb-4'>
                <label className='block mb-1 font-medium' htmlFor="name">Name</label>
                <input className='w-full border border-gray-300 p-2 rounded-md' type="text" id='name' name='name' required placeholder='John Doe' value={addStaffData.name} onChange={handleChange} />
            </div>
            <div className='mb-4'>
                <label className='block mb-1 font-medium' htmlFor="email">Email</label>
                <input className='w-full border border-gray-300 p-2 rounded-md' type="email" id='email' name='email' required placeholder='john.doe@example.com' value={addStaffData.email} onChange={handleChange} />
            </div>
            <div className='mb-4'>
                <label className='block mb-1 font-medium' htmlFor="password">Password {!userToEdit && <span className='text-red-500'>*</span>}</label>
                <input className='w-full border border-gray-300 p-2 rounded-md' type="password" id='password' name='password' required={!userToEdit} placeholder='Enter a secure password' value={addStaffData.password} onChange={handleChange} />
            </div>
            <div className='mb-4'>
                <label className='block mb-1 font-medium' htmlFor="phone">Phone</label>
                <input className='w-full border border-gray-300 p-2 rounded-md' type="text" id='phone' name='phone' required placeholder='(123) 456-7890' value={addStaffData.phone} onChange={handleChange} />
            </div>
            <div className='mb-4'>
                <label className='block mb-1 font-medium' htmlFor="role">Role</label>
                <select className='w-full border border-gray-300 p-2 rounded-md bg-white' id='role' name='role' required value={addStaffData.role} onChange={handleChange}>
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="staff">Staff</option>
                </select>
            </div>
            <div className='mb-4'>
                <label className='block mb-1 font-medium' htmlFor="avatar">Avatar</label>
                <input className='w-full border border-gray-300 bg-blue-50 p-2 rounded-md cursor-pointer' type="file" id='avatar' name='avatar' accept='image/*' onChange={handleChange} />
            </div>
            <div className='mb-4 flex items-center'>
                <input type="checkbox" id='activeStatus' name='activeStatus' className='mr-2' checked={addStaffData.activeStatus} onChange={handleChange} />
                <label htmlFor="activeStatus" className='font-medium'>Active Status</label>
            </div>
            <div className='flex justify-end space-x-2'>
                <button onClick={closeModal} className='bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600' type='button'>Cancel</button>
                <button className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600' type='submit'>{userToEdit ? 'Update Staff Member' : 'Add Staff Member'}</button>
            </div>
        </form>
    </div>
  )
}

export default AddStaffModal