import React from 'react'
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext.jsx';

function Navbar() {
  const {currentUser} = useContext(AuthContext);
      const navAdmin = [
        {id: 1,name: 'Dashboard', path: '/dashboard'},
        {id: 2,name: 'Inventory', path: '/inventory'},
        {id: 3,name: 'POS', path: '/pos'},
        {id: 4,name: 'Menu', path: '/menu'},
        {id: 5,name: 'Reports', path: '/reports'},
        {id: 6,name: 'Staff', path: '/staff'},
      ];
      const navStaff = [
        {id: 1,name: 'Dashboard', path: '/dashboard'},
        {id: 2,name: 'Inventory', path: '/inventory'},
        {id: 3,name: 'POS', path: '/pos'},
        {id: 4,name: 'Menu', path: '/menu'},
        {id: 5,name: 'Reports', path: '/reports'},
      ];
      const navItems = currentUser?.role === 'staff' ? navStaff : navAdmin;
      return (
    <div>
      <nav className="bg-blue-50 py-2 w-7xl mx-auto rounded-3xl mt-5 border border-blue-200 shadow-md">
        <ul className="flex justify-around">
          {navItems.map((item) => (
            <li key={item.id}>  
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `font-semibold text-blue-950 hover:text-white py-2 px-20 rounded-3xl hover:bg-blue-500 ${
                    isActive ? 'bg-blue-500 text-white' : ''
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Navbar