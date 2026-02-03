import React from 'react'
import { PlusIcon } from 'lucide-react'
import { useContext } from 'react'
import { MenuContext } from '../contexts/MenuContext.jsx'
import MenuCard from '../components/menu/MenuCard.jsx'

function Menu() {
  const {menu, categories} = useContext(MenuContext);
  return (
    <div className='xl:w-7xl lg:p-2 w-full md:p-2 xl:p-0 p-2 mx-auto mt-6 flex flex-col space-y-4'>
        <div className='flex md:items-center md:justify-between mb-4 flex-col md:flex-row gap-4'>
          <div className='flex flex-col'>
            <h1 className='text-2xl font-semibold text-blue-950'>Menu Management</h1>
            <p className='text-gray-500'>Manage your menu items and categories</p>
          </div>
          <button onClick={""} className='bg-blue-800 flex items-center text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition md:w-auto w-full md:mt-0 mt-2'><span className='mr-2'><PlusIcon /></span> Add Item Menu</button>
        </div>
        <div className='flex gap-3'>
          {categories.map((category, index) => (
            <button key={index} className='px-4 py-1 border border-gray-300 bg-gray-50 rounded-lg hover:bg-gray-300 transition'>{category}</button>
          ))}
        </div>
        <div className='w-full grid md:grid-cols-3 grid-cols-1 gap-6 mb-10'>
          {menu? menu.map((item) => (
            <MenuCard key={item.id} item={item} />
          )) : <p>No menu items found.</p>
          }
        </div>
    </div>
  )
}

export default Menu