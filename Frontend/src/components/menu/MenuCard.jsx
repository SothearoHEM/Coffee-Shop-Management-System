import React from 'react'
import { useContext } from 'react'
import { MenuContext } from '../../contexts/MenuContext.jsx'
import { FiCoffee } from 'react-icons/fi';
import { MdOutlineModeEdit } from 'react-icons/md';
import { FaRegTrashCan } from 'react-icons/fa6';

function MenuCard({ item, itemEdit }) {
  const price = Number(item.price) || 0;
  const cost = Number(item.cost) || 0;
  const profitMargin = price > 0 ? ((price - cost) / price) * 100 : 0;
  const profit = price - cost;
  const { updateMenuItem, deleteMenuItem } = useContext(MenuContext);

  const handleUnavailable = () => {
    const updatedItem = {
      ...item,
      available: !item.available,
    };
    updateMenuItem(updatedItem);
  }
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${item.name}?`))
    deleteMenuItem(item.id);
  }
  const handleEdit = () => {
    itemEdit(item.id);
  }
  return (
    <div className='flex flex-col p-4 bg-gray-50 rounded-lg border border-blue-200 hover:shadow-lg transition space-y-3'>
        <div className='flex flex-col'>
            <div className='flex flex-row mb-2 items-center space-x-3 text-lg'>
                <span className='text-blue-800'><FiCoffee /></span>
                <span>{item.name}</span>
            </div>
            <div className='flex flex-row mb-4 items-center space-x-3 text-xs'>
                <span className='border border-gray-300 p-1 rounded-lg font-semibold'>{item.category}</span>
                <span className={`border ${item.available ? 'border-gray-300 bg-blue-500 text-white' : 'border-red-500 bg-red-200 text-red-800'} p-1 rounded-lg font-semibold`}>{item.available ? "Available" : "Unavailable"}</span>
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
              <p className='text-gray-500 text-sm'>Cost: ${cost.toFixed(2)}</p>
              <p className='text-blue-800 text-sm'>Price: ${price.toFixed(2)}</p>
              <p className='text-green-600 text-sm mt-3'>Profit Margin: {profitMargin.toFixed(2)}%</p>
              <p className='text-green-600 text-sm'>Profit: ${profit.toFixed(2)}</p>
        </div>
        <div className='mt-4 flex'>
            <button onClick={handleUnavailable} className='flex-1 border border-blue-200 rounded-md md:px-2 lg:px-4 px-4 py-1 mr-2 hover:bg-blue-300'>{item.available ? 'Mark Unavailable' : 'Mark Available'}</button>
            <button onClick={handleEdit} className='border border-blue-200 rounded-md md:px-3 lg:px-4 px-4 py-1 mr-2 hover:bg-blue-300'><MdOutlineModeEdit /></button>
            <button onClick={handleDelete} className='border border-red-300 rounded-md md:px-3 lg:px-4 px-4 py-1 text-red-500 hover:bg-red-300'><FaRegTrashCan /></button>
        </div>
    </div>
  )
}

export default MenuCard