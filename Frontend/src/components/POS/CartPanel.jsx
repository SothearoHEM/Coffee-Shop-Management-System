import React from 'react'
import { IoCartOutline } from "react-icons/io5";
import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext.jsx';
import { GoTrash } from 'react-icons/go';
import { IoMdClose } from 'react-icons/io';
import { CgMathMinus,CgMathPlus } from "react-icons/cg";
import { IoBagCheckOutline } from "react-icons/io5";
import Receipt from './Receipt.jsx';

function CartPanel() {
  const { cart, increaseQty, decreaseQty, removeItem, subtotal, tax, total, clearCart } = useContext(CartContext);
  const [showReceipt, setShowReceipt] = React.useState(false);

  const closeReceipt = () => {
    setShowReceipt(false);
  };

  return (
    <div className='flex flex-col h-full'>
        <div className='flex items-center justify-between'>
            <h2 className='flex items-center gap-2 mb-4'><span className='text-blue-900'><IoCartOutline /></span>Cart</h2>
            {
                cart.length > 0 && (
                    <button onClick={clearCart} className='text-red-500 hover:text-red-700 text-xl'><GoTrash /></button>
                )
            }
        </div>
      <div className='flex-1 overflow-y-auto border border-blue-200 rounded-lg p-3 mb-4 bg-blue-50'>
        {cart.length > 0 ? (
          <div className='space-y-3'>
            {cart.map(item => (
              <div key={item.id} className='bg-white p-3 rounded-lg border border-blue-200 flex justify-between items-center'>
                <div className='flex gap-3 items-center'>
                    <div className='w-16 h-16 overflow-hidden border-2 border-blue-200 rounded-lg'>
                        <img src={item.image} alt={item.name} className='w-full h-full rounded-lg object-cover' />
                    </div>
                    <div>
                        <p className='font-semibold text-blue-900'>{item.name}</p>
                        <p className='text-sm text-blue-600'>${item.price.toFixed(2)} each</p>
                    </div>
                </div>
                <div className='flex items-center gap-3'>
                  <button onClick={() => decreaseQty(item.id)} className='border border-blue-400 p-2 rounded-lg hover:bg-blue-200'><CgMathMinus /></button>
                  <span className='px-2 font-semibold'>{item.quantity}</span>
                  <button onClick={() => increaseQty(item.id)} className='border border-blue-400 p-2 rounded-lg hover:bg-blue-200'><CgMathPlus /></button>
                  <button onClick={() => removeItem(item.id)} className='text-red-500 hover:text-red-700 text-xl'><IoMdClose /></button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center h-full text-center text-gray-500 p-10'>
            <div className='text-7xl animate-bounce text-gray-400'><IoCartOutline /></div>
            <p className='mt-2'>Cart is empty</p>
            <p className='text-xl text-blue-500'>Add items to get started</p>
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className='space-y-2 border-t border-blue-200 pt-3'>
          <div className='flex justify-between text-sm'>
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className='flex justify-between text-sm'>
            <span>Tax (10%):</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className='flex justify-between font-bold text-blue-900 border-t border-blue-200 pt-2 mt-2'>
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button onClick={() => setShowReceipt(true)} className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mt-3 flex items-center justify-center gap-2'><span><IoBagCheckOutline /></span>Checkout</button>
        </div>
      )}
      {showReceipt && <Receipt close={closeReceipt} />}
    </div>
  )
}

export default CartPanel