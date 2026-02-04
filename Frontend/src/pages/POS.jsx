import React, { useContext } from 'react'
import PosMenuCard from '../components/POS/PosMenuCard.jsx';
import { MenuContext } from '../contexts/MenuContext.jsx';
import { FiCoffee } from 'react-icons/fi';
import CartPanel from '../components/POS/CartPanel.jsx';

function POS() {
  const {menu} = useContext(MenuContext);
  return (
    <div className='xl:w-7xl lg:p-2 w-full md:p-2 xl:p-0 p-2 mx-auto mt-6 flex flex-col space-y-4'>
        <div className='flex md:items-center md:justify-between mb-4 flex-col md:flex-row gap-4'>
          <div className='flex flex-col'>
            <h1 className='text-2xl font-semibold text-blue-950'>Point of Sale (POS)</h1>
            <p className='text-gray-500'>Manage your sales transactions and orders</p>
          </div>
        </div>
        <div className='w-full flex flex-row gap-5'>
            <div className='w-2/3 rounded-lg shadow-md p-4 flex flex-col gap-4 border border-blue-300 bg-white'>
                <h2 className='flex items-center gap-2'><span className='text-blue-900'><FiCoffee /></span>Menu Items</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {menu.length > 0 ? (
                        menu.map(item => (
                            <PosMenuCard key={item.id} item={item} />
                        ))
                    ) : (
                        <p className='text-gray-500'>No menu items available.</p>
                    )}
                </div>
            </div>
            <div className='w-1/3 h-full rounded-lg shadow-md p-4 flex flex-col gap-4 border border-blue-300 bg-white'>
                <CartPanel></CartPanel>
            </div>   
        </div>
    </div>
  )
}

export default POS