import React from 'react'
import { PiCoffeeBold } from 'react-icons/pi';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import { RxExit } from "react-icons/rx";

function Header() {
  const {currentUser,logout} = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (!confirmed) return;
    logout();
  }
  return (
    <div>
      <header className="bg-blue-50 shadow-md p-4 flex items-center justify-between border-b border-blue-200">
        <div className="flex items-center space-x-4">
          <span><PiCoffeeBold className='text-5xl text-white bg-blue-500 p-3 rounded-2xl'/></span>
          <div className='md:block hidden'>
            <p className='text-lg text-blue-900 '>Coffee Shop Management System</p>
            <p className="text-sm text-blue-400">Manage your coffee shop efficiently</p>
          </div>
        </div>
        <div className='flex items-center space-x-4'>
            <div>
              <p className='text-lg text-blue-950'>{currentUser?.name}</p>
              <p className="text-sm text-blue-400">{currentUser?.role}</p>
            </div>
            <button onClick={handleSubmit} className='border border-blue-500 font-semibold text-blue-950 px-3 py-1 rounded-lg flex items-center space-x-1 hover:bg-blue-100'><span><RxExit /></span>Logout</button>
        </div>
      </header>
    </div>
  )
}

export default Header