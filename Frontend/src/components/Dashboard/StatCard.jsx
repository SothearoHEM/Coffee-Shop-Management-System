import React from 'react'
import { useContext } from 'react'
import { OrderContext } from '../../contexts/OrderContext.jsx';
import { MenuContext } from '../../contexts/MenuContext.jsx';
import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineLineChart } from "react-icons/ai";
import { FiCoffee } from "react-icons/fi";
import { LuDollarSign } from "react-icons/lu";

function StatCard() {
    const { orders } = useContext(OrderContext);
    const { menu } = useContext(MenuContext);
    const today = new Date().toDateString();
  return (
    <div className='grid md:grid-cols-4 grid-cols-1 gap-6 mb-5'>
        <div className='w-full bg-white p-4 rounded-xl border border-blue-200 flex flex-col gap-3 hover:shadow-lg duration-300 hover:scale-105 transition-transform'>
            <h1 className='font-semibold flex justify-between items-center gap-2 text-lg'><span className=' text-gray-700'>Today's Revenue</span><span className='p-2  bg-blue-600 text-white rounded-xl'><LuDollarSign /></span></h1>
            <h2 className='text-2xl font-bold text-blue-900'>${orders.filter(order => order.createdAt.toDateString() === today).reduce((total, order) => total + order.total, 0).toFixed(2)}</h2>
            <p className='text-sm text-gray-500'>Revenue generated today</p>
        </div>
        <div className='w-full bg-white p-4 rounded-xl border border-blue-200 flex flex-col gap-3 hover:shadow-lg duration-300 hover:scale-105 transition-transform'>
            <h1 className='font-semibold flex justify-between items-center gap-2 text-lg'><span className=' text-gray-700'>Today's Orders</span><span className='p-2  bg-blue-600 text-white rounded-xl'><FiShoppingCart /></span></h1>
            <h2 className='text-2xl font-bold text-blue-900'>{orders.filter(order => order.createdAt.toDateString() === today).length}</h2>
            <p className='text-sm text-gray-500'>Orders placed today</p>
        </div>
        <div className='w-full bg-white p-4 rounded-xl border border-blue-200 flex flex-col gap-3 hover:shadow-lg duration-300 hover:scale-105 transition-transform'>
            <h1 className='font-semibold flex justify-between items-center gap-2 text-lg'><span className=' text-gray-700'>Total Orders</span><span className='p-2  bg-blue-600 text-white rounded-xl'><AiOutlineLineChart /></span></h1>
            <h2 className='text-2xl font-bold text-blue-900'>{orders.length}</h2>
            <p className='text-sm text-gray-500'>Total orders placed</p>
        </div>
        <div className='w-full bg-white p-4 rounded-xl border border-blue-200 flex flex-col gap-3 hover:shadow-lg duration-300 hover:scale-105 transition-transform'>
            <h1 className='font-semibold flex justify-between items-center gap-2 text-lg'><span className=' text-gray-700'>Active Items</span><span className='p-2  bg-blue-600 text-white rounded-xl'><FiCoffee /></span></h1>
            <h2 className='text-2xl font-bold text-blue-900'>{menu.filter(item => item.available).length}</h2>
            <p className='text-sm text-gray-500'>Total active menu items</p>
        </div>
    </div>
  )
}

export default StatCard