import React, { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'

function PosMenuCard({ item }) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(item);
  };

  return (
    <div className='bg-white rounded-lg shadow-md p-4 flex flex-col gap-2 border border-blue-300 cursor-pointer hover:shadow-lg hover:border-blue-500 hover:scale-105 hover:bg-blue-100 transition'
    onClick={handleAddToCart}>
        <div className='w-full h-32 overflow-hidden border-2 border-blue-200 rounded-lg'>
            <img src={item.image} alt={item.name} className='w-full h-full rounded-lg object-cover mb-2' />
        </div>
        <h2 className='text-lg font-semibold text-blue-900'>{item.name}</h2>
        <p className='text-blue-600 font-semibold text-sm border border-blue-300 rounded-lg px-2 w-fit bg-blue-100'>{item.category}</p>
        <p className='text-blue-600 font-semibold text-sm'>${item.price.toFixed(2)}</p>
    </div>
  )
}

export default PosMenuCard