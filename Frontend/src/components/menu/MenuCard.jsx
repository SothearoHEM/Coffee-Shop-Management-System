import React from 'react'
import { useContext } from 'react'
import { MenuContext } from '../../contexts/MenuContext.jsx'
import { FiCoffee } from 'react-icons/fi';
import { MdOutlineModeEdit } from 'react-icons/md';
import { FaRegTrashCan } from 'react-icons/fa6';

function MenuCard({ item }) {
  const profitMargin = ((item.price - item.cost) / item.price) * 100;
  const profit = item.price - item.cost;
  return (
    <div key={item.id} className='flex flex-col p-4 bg-gray-50 rounded-lg border border-blue-200 hover:shadow-lg transition space-y-3'>
        <div className='flex flex-col'>
            <div className='flex flex-row mb-2 items-center space-x-3 text-lg'>
                <span className='text-blue-800'><FiCoffee /></span>
                <span>{item.name}</span>
            </div>
            <div className='flex flex-row mb-4 items-center space-x-3 text-xs'>
                <span className='border border-gray-300 p-1 rounded-lg font-semibold'>{item.category}</span>
                <span className='border border-gray-300 p-1 rounded-lg font-semibold bg-blue-500 text-white'>{item.available ? "Available" : "Unavailable"}</span>
            </div>
        </div>
        <div className='w-full h-40 bg-gray-200 rounded-lg overflow-hidden'>
            <img src={item.image} alt={item.name} className='w-full h-full object-cover'/>
        </div>
        <div className='flex flex-col space-y-2'>
            <p className='text-gray-600 text-sm'>{item.description}</p>
        </div>
        <hr className='text-gray-500 mx-2'/>
        <div className='grid grid-cols-2 items-center space-y-3'>
              <p className='text-gray-500 text-sm'>Cost: ${item.cost.toFixed(2)}</p>
              <p className='text-blue-800 text-sm'>Price: ${item.price.toFixed(2)}</p>
              <p className='text-green-600 text-sm'>Profit Margin: ${profitMargin.toFixed(2)}%</p>
              <p className='text-green-600 text-sm'>Profit: ${profit.toFixed(2)}</p>
        </div>
        <div className='mt-4 flex'>
            <button className='flex-1 border border-blue-200 rounded-md px-4 py-1 mr-2 hover:bg-blue-300'>Mark {item.available ? "Unavailable" : "Available"}</button>
            <button className='border border-blue-200 rounded-md px-4 py-1 mr-2 hover:bg-blue-300'><MdOutlineModeEdit /></button>
            <button className='border border-red-300 rounded-md px-4 py-1 text-red-500 hover:bg-red-300'><FaRegTrashCan /></button>
        </div>
    </div>
  )
}

export default MenuCard