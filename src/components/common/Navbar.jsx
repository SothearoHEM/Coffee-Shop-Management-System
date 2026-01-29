import React from 'react'
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import { PiChartLineUp } from 'react-icons/pi';
import { MdOutlineInventory2 } from 'react-icons/md';
import { LuShoppingCart } from 'react-icons/lu';
import { IoMenuOutline } from 'react-icons/io5';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { TbUsers } from 'react-icons/tb';


function Navbar() {
  const {currentUser} = useContext(AuthContext);
      const navAdmin = [
        {id: 1,name: 'Dashboard', path: '/dashboard',icon: <PiChartLineUp />},
        {id: 2,name: 'Inventory', path: '/inventory',icon: <MdOutlineInventory2 />},
        {id: 3,name: 'POS', path: '/pos',icon: <LuShoppingCart />},
        {id: 4,name: 'Menu', path: '/menu',icon: <IoMenuOutline />},
        {id: 5,name: 'Reports', path: '/reports',icon: <HiOutlineDocumentReport />},
        {id: 6,name: 'Staff', path: '/staff',icon: <TbUsers />},
      ];
      const navStaff = [
        {id: 1,name: 'Dashboard', path: '/dashboard',icon: <PiChartLineUp />},
        {id: 2,name: 'Inventory', path: '/inventory',icon: <MdOutlineInventory2 />},
        {id: 3,name: 'POS', path: '/pos',icon: <LuShoppingCart />},
        {id: 4,name: 'Menu', path: '/menu',icon: <IoMenuOutline />},
        {id: 5,name: 'Reports', path: '/reports',icon: <HiOutlineDocumentReport />},
      ];
      const navItems = currentUser?.role === 'staff' ? navStaff : navAdmin;
      return (
    <div className='px-2 md:px-0'>
      <nav className="bg-blue-50 py-0.5 max-w-7xl mx-auto rounded-3xl mt-5 border border-blue-200 shadow-md shadow-gray-300">
        <ul className="flex justify-around items-center">
          {navItems.map((item) => (
            <li key={item.id}>  
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `font-semibold text-blue-950 flex items-center hover:text-white md:px-5 lg:px-11 xl:px-16 px-3 py-1 rounded-3xl hover:bg-blue-500 ${
                    isActive ? 'bg-blue-500 text-white' : ''
                  }`
                }
              >
                <span className="md:mr-2 font-semibold">{item.icon}</span> <span className='md:block hidden'>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Navbar