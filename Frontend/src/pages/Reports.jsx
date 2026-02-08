import React from 'react'
import ReportStatCard from '../components/Report/ReportStatCard'
import DailyRevenueOverview from '../components/Report/DailyRevenueOverview'
import DailyOrderVolume from '../components/Report/DailyOrderVolume'
import DailySalesBreakdown from '../components/Report/DailySalesBreakdown'
import TopSellingItems from '../components/Report/TopSellingItems'
import BestSellersDetails from '../components/Report/BestSellersDetails'

function Reports() {
  return (
    <div className='xl:w-7xl lg:p-2 w-full md:p-2 xl:p-0 p-2 mx-auto mt-6 flex flex-col space-y-4'>
        <div className='flex md:items-center md:justify-between mb-4 flex-col md:flex-row gap-4'>
          <div className='flex flex-col'>
            <h1 className='text-2xl font-semibold text-blue-950'>Sales Reports</h1>
            <p className='text-gray-500'>Comprehensive analytics for the last 7 days</p>
          </div>
        </div>
        <div className='w-full h-full'>
            <ReportStatCard />
        </div>
        <div className='w-full h-full grid grid-cols-1 md:grid-cols-2 gap-4'>
            <DailyRevenueOverview />
            <DailyOrderVolume />
            <TopSellingItems />
            <BestSellersDetails />
        </div>
        <div className='w-full h-full mb-5'>
            <DailySalesBreakdown />
        </div>
    </div>
  )
}

export default Reports