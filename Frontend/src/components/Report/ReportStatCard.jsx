import React, { useContext } from 'react'
import { LuDollarSign } from 'react-icons/lu'
import { OrderContext } from '../../contexts/OrderContext.jsx';
import { FiShoppingCart } from 'react-icons/fi'
import { AiOutlineLineChart } from 'react-icons/ai'

function ReportStatCard() {
  const { orders } = useContext(OrderContext);

  const last7DaysRevenue = orders.reduce((total, order) => {
    const orderDate = new Date(order.createdAt);
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    if (orderDate >= sevenDaysAgo && orderDate <= today) {
      return total + order.total;
    }
    return total;
  }, 0);

  const totalOrders = orders.length;
  const averageOrderValue = totalOrders > 0 ? (orders.reduce((total, order) => total + order.total, 0) / totalOrders).toFixed(2) : 0;
  return (
    <div className='grid md:grid-cols-3 grid-cols-1 gap-4 mb-4'>
        <div className='w-full bg-white p-4 rounded-xl border border-blue-200 flex flex-col gap-3 hover:shadow-lg duration-300 hover:scale-105 transition-transform'>
            <h1 className='font-semibold text-gray-700 flex justify-between items-center gap-2 text-lg'><span className=' text-gray-700'>Total Revenue</span><span className='p-2  bg-blue-600 text-white rounded-xl'><LuDollarSign /></span></h1>
            <h2 className='text-2xl font-bold text-blue-900'>{last7DaysRevenue.toFixed(2)}</h2>
            <p className='text-sm text-gray-500'>Last 7 days</p>
        </div>
        <div className='w-full bg-white p-4 rounded-xl border border-blue-200 flex flex-col gap-3 hover:shadow-lg duration-300 hover:scale-105 transition-transform'>
            <h1 className='font-semibold text-gray-700 flex justify-between items-center gap-2 text-lg'><span className=' text-gray-700'>Total Orders</span><span className='p-2  bg-blue-600 text-white rounded-xl'><FiShoppingCart /></span></h1>
            <h2 className='text-2xl font-bold text-blue-900'>{totalOrders}</h2>
            <p className='text-sm text-gray-500'>Completed orders</p>
        </div>
        <div className='w-full bg-white p-4 rounded-xl border border-blue-200 flex flex-col gap-3 hover:shadow-lg duration-300 hover:scale-105 transition-transform'>
            <h1 className='font-semibold text-gray-700 flex justify-between items-center gap-2 text-lg'><span className=' text-gray-700'>Average Order</span><span className='p-2  bg-blue-600 text-white rounded-xl'><AiOutlineLineChart /></span></h1>
            <h2 className='text-2xl font-bold text-blue-900'>{averageOrderValue}</h2>
            <p className='text-sm text-gray-500'>Per transaction</p>
        </div>
    </div>
  )
}

export default ReportStatCard