import React from 'react'
import { MdOutlineInventory2 } from "react-icons/md";
import { MdOutlineModeEdit } from 'react-icons/md';
import { FaRegTrashCan } from 'react-icons/fa6';
import { useContext } from 'react'
import { InventoryContext } from '../../contexts/InventoryContext.jsx';

function InventoryCard({ item, onRestock, onEdit }) {
    const {deleteInventoryItem} = useContext(InventoryContext);
    const stockStatus = () => {
        if (item.currentStock <= item.minStock) {
            return { text: 'Low Stock', color: 'text-red-500', border: 'border-red-500',bg: 'bg-red-50' }; 
        } else if (item.currentStock >= item.maxStock) {
            return { text: 'Overstocked', color: 'text-yellow-500', border: 'border-yellow-500',bg: 'bg-yellow-50' };
        } else {
            return { text: 'In Stock', color: 'text-green-500', border: 'border-green-500',bg: 'bg-green-50' };
        }
    };
    const handleDelete = (itemId) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
        deleteInventoryItem(itemId);
        }
    };
  return (
    <div className='w-full bg-white p-4 rounded-lg border border-blue-200 flex flex-col gap-3'>
        <div className='flex flex-col gap-1'>
            <p className='font-semibold flex items-center gap-2'><span className='text-blue-900 text-lg'><MdOutlineInventory2 /></span>{item.name}</p>
            <p className={`text-xs border w-fit p-0.5 rounded-lg ${stockStatus().color}  ${stockStatus().border} ${stockStatus().bg}`}>{stockStatus().text}</p>
        </div>
        <div className='flex flex-col gap-1 text-sm mt-5 border-b border-blue-200 mb-3 pb-3'>
            <div className='flex justify-between'>
                <span>Stock level</span>
                <span>{item.currentStock} {item.unit} / {item.maxStock} {item.unit}</span>
            </div>
            <div className='w-full bg-blue-100 h-2 rounded-lg overflow-hidden'>
                <div className='bg-blue-500 h-2 rounded-lg animate-bar transition-width duration-500' style={{ width: `${(item.currentStock / item.maxStock) * 100}%` }}></div>
            </div>
        </div>
        <div className='flex flex-col gap-4 text-sm'>
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <span className='text-gray-500'>Minimum Stock:</span> <span className='text-blue-900 font-semibold'>{item.minStock} {item.unit}</span>
                </div>
                <div className='flex gap-2'>
                    <span className='text-gray-500'>Unit Cost:</span>
                    <span className='text-blue-900 font-semibold'>${item.unitCost.toFixed(2)} per {item.unit}</span>
                </div>
            </div>
            <div className='flex justify-between'>
                <span className='text-gray-500'>Supplier:</span>
                <span className='text-blue-900 font-semibold'>{item.supplier}</span>
            </div>
            <div className='flex justify-between'>
                <span className='text-gray-500'>Last Restocked:</span>
                <span className='text-blue-900 font-semibold'>{new Date(item.lastRestocked).toLocaleDateString()}</span>
            </div>
        </div>
        <div className='mt-4 flex'>
            <button onClick={onRestock} className='flex-1 border border-blue-200 rounded-md md:px-2 lg:px-4 px-4 py-1 mr-2 hover:bg-blue-300'>Restock to Max</button>
            <button onClick={onEdit} className='border border-blue-200 rounded-md md:px-3 lg:px-4 px-4 py-1 mr-2 hover:bg-blue-300'><MdOutlineModeEdit /></button>
            <button onClick={() => handleDelete(item.id)} className='border border-red-300 rounded-md md:px-3 lg:px-4 px-4 py-1 text-red-500 hover:bg-red-300'><FaRegTrashCan /></button>
        </div>
    </div>
  )
}

export default InventoryCard