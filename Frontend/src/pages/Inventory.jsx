import React,{useState} from 'react'
import { PlusIcon } from 'lucide-react'
import InventoryCard from '../components/Inventory/InventoryCard.jsx'
import { useContext } from 'react'
import { InventoryContext } from '../contexts/InventoryContext.jsx'
import Lottie from 'lottie-react'
import LowStockAlert from '../components/Inventory/LowStockAlert.jsx'
import InventoryModal from '../components/Inventory/InventoryModal.jsx'
import NotFound from '../assets/NotFound.json'


function Inventory() {
  const { inventory, setInventory } = useContext(InventoryContext);
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const handleRestock = (itemId) => {
    if (window.confirm("Are you sure you want to restock this item?")) {
      setInventory(prevInventory => prevInventory.map(item => {
        if (item.id === itemId) {
          return { ...item, currentStock: item.maxStock };
        }        return item;
      }));
      setInventory(prevInventory => prevInventory.map(item => {
        if (item.id === itemId) {
          return { ...item, lastRestocked: new Date() };
        }        return item;
      }));
    }
  }
  const closeModal = () => {
    setIsInventoryModalOpen(false);
    setItemToEdit(null);
  }
  const handleEdit = (item) => {
    setItemToEdit(item);
    setIsInventoryModalOpen(true);
  }
  return (
    <div className='xl:w-7xl lg:p-2 w-full md:p-2 xl:p-0 p-2 mx-auto mt-6 flex flex-col space-y-4'>
        <div className='flex md:items-center md:justify-between mb-4 flex-col md:flex-row gap-4'>
          <div className='flex flex-col'>
            <h1 className='text-2xl font-semibold text-blue-950'>Inventory Management</h1>
            <p className='text-gray-500'>Manage your inventory and stock levels</p>
          </div>
          <button onClick={() => { setItemToEdit(null); setIsInventoryModalOpen(true); }} className='bg-blue-800 flex items-center text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition md:w-auto w-full md:mt-0 mt-2'><span className='mr-2'><PlusIcon /></span> Add New Inventory Item </button>
        </div>
        {
          inventory.some(item => item.currentStock <= item.minStock) && (
            <LowStockAlert items={inventory.filter(item => item.currentStock <= item.minStock)} onRestock={handleRestock} />
          )
        }
        <div className='w-full h-full '>
            {inventory.length > 0 ? (
              <div className='grid md:grid-cols-3 grid-cols-1 gap-6 mb-5'>
                  {inventory.map(item => (
                    <InventoryCard key={item.id} item={item} onRestock={() => handleRestock(item.id)} onEdit={() => handleEdit(item)} />
                ))}
              </div>
            ) : (
              <div className='flex items-center justify-center h-125 mx-auto mb-5'>
                <Lottie animationData={NotFound} loop={true} className='w-64 h-64 md:w-90 md:h-90'/>
              </div>             
            )}
        </div>
        {isInventoryModalOpen && (
          <InventoryModal onClose={closeModal} itemToEdit={itemToEdit} setItemToEdit={setItemToEdit} defaultValues={itemToEdit} />
        )}
    </div>
  )
}

export default Inventory