import React from 'react'
import StatCard from '../components/Dashboard/StatCard.jsx'
import RevenueLineChart from '../components/Dashboard/RevenueLineChart.jsx';
import CategoryPieChart from '../components/Dashboard/CategoryPieChart.jsx';
import HourlyBarChart from '../components/Dashboard/HourlyBarChart.jsx';
import RecentOrders from '../components/Dashboard/RecentOrders.jsx';

function Dashboard() {
  return (
    <div className='xl:w-7xl lg:p-2 w-full md:p-2 xl:p-0 p-2 mx-auto mt-6 flex flex-col space-y-4'>
        <div className='flex md:items-center md:justify-between mb-4 flex-col md:flex-row gap-4'>
          <div className='flex flex-col'>
            <h1 className='text-2xl font-semibold text-blue-950'>Dashboard</h1>
            <p className='text-gray-500'>Welcome back! Here's an overview of your coffee shop's performance.</p>
          </div>
        </div>
         <div className='w-full h-full'>
              <StatCard></StatCard>
        </div>
        <div className='w-full h-full grid md:grid-cols-2 grid-cols-1 gap-6 mb-5'>
            <div>
                <RevenueLineChart></RevenueLineChart>
            </div>
            <div>
                <CategoryPieChart></CategoryPieChart>
            </div>
            <div>
                <HourlyBarChart></HourlyBarChart>
            </div>
            <div>
                <RecentOrders></RecentOrders>
            </div>
        </div>
    </div>
  )
}

export default Dashboard