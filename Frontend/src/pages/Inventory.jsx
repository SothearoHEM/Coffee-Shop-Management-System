import React from 'react'
import { PlusIcon } from 'lucide-react'
import InventoryCard from '../components/Inventory/InventoryCard.jsx'
import { useContext } from 'react'
import { InvetoryContext } from '../contexts/InventoryContext.jsx'
import Lottie from 'lottie-react'

function Inventory() {
  const { inventory } = useContext(InvetoryContext);
  return (
    <div className='xl:w-7xl lg:p-2 w-full md:p-2 xl:p-0 p-2 mx-auto mt-6 flex flex-col space-y-4'>
        <div className='flex md:items-center md:justify-between mb-4 flex-col md:flex-row gap-4'>
          <div className='flex flex-col'>
            <h1 className='text-2xl font-semibold text-blue-950'>Inventory Management</h1>
            <p className='text-gray-500'>Manage your inventory and stock levels</p>
          </div>
          <button className='bg-blue-800 flex items-center text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition md:w-auto w-full md:mt-0 mt-2'><span className='mr-2'><PlusIcon /></span> Add New Inventory Item </button>
        </div>
        <div className='w-full h-full rounded-lg shadow-md p-4 flex flex-col gap-4 border border-blue-300 bg-white'>
            Restock Inventory
        </div>
        <div className='w-full h-full '>
            {inventory.length > 0 ? (
              <div className='grid md:grid-cols-3 grid-cols-1 gap-6 mb-5'>
                  {inventory.map(item => (
                    <InventoryCard key={item.id} item={item} />
                ))}
              </div>
                
            ) : (
              <div className='flex items-center justify-center h-125 mx-auto mb-5'>
                <Lottie animationData={Lottie} loop={true} className='w-64 h-64 md:w-90 md:h-90'/>
              </div>             
            )}
        </div>
    </div>
  )
}

export default Inventory