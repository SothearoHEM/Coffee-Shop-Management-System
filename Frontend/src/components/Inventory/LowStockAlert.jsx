import React from 'react'
import { GoAlert } from "react-icons/go";

function LowStockAlert({ items, onRestock }) {
  return (
    <div>
        <div className='w-full h-full rounded-lg shadow-md p-4 flex flex-col gap-4 border border-red-300 bg-red-50'>
          <div>
            <span className='flex items-center gap-2 text-red-600'><GoAlert /><span>Low Stock Alert</span></span>
          </div>
          <div className='flex flex-col gap-3'>
            <p className='text-red-700'>{items.length} item(s) need restocking</p>
            {items.map(item => (
              <div key={item.id} className='p-2 bg-white border border-red-200 flex justify-between rounded-lg items-center'>
                  <p className='font-semibold text-blue-900'>{item.name}</p>
                  <div className='flex items-center gap-3'>
                      <p className='text-gray-600'><span className='font-semibold text-blue-900'>{item.currentStock} {item.unit} / {item.maxStock} {item.unit}</span></p>
                      <button onClick={() => onRestock(item.id)} className='mt-2 bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-800'>Restock</button>
                  </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}

export default LowStockAlert