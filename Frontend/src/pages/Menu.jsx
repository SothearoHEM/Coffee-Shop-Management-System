import React,{useState} from 'react'
import { PlusIcon } from 'lucide-react'
import { useContext } from 'react'
import { MenuContext } from '../contexts/MenuContext.jsx'
import MenuCard from '../components/menu/MenuCard.jsx'
import NotFound from '../assets/NotFound.json'
import Lottie from 'lottie-react'
import MenuModal from '../components/menu/MenuModal.jsx'

function Menu() {
  const {menu, categories} = useContext(MenuContext);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  
  const openMenuModal = () => setIsMenuModalOpen(true);
  const closeMenuModal = () => {
    setIsMenuModalOpen(false);
    setItemToEdit(null);
  }

  const itemEdit = (id) => {
    setItemToEdit(id);
    setIsMenuModalOpen(true);
  }

  const filteredMenu = selectedCategory === "All" ? menu : menu.filter(item => item.category === selectedCategory);
  const defaultValues = itemToEdit ? menu.find(item => item.id === itemToEdit) : null;

  return (
    <div className='xl:w-7xl lg:p-2 w-full md:p-2 xl:p-0 p-2 mx-auto mt-6 flex flex-col space-y-4'>
        <div className='flex md:items-center md:justify-between mb-4 flex-col md:flex-row gap-4'>
          <div className='flex flex-col'>
            <h1 className='text-2xl font-semibold text-blue-950'>Menu Management</h1>
            <p className='text-gray-500'>Manage your menu items and categories</p>
          </div>
          <button onClick={openMenuModal} className='bg-blue-800 flex items-center text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition md:w-auto w-full md:mt-0 mt-2'><span className='mr-2'><PlusIcon /></span> Add Item Menu</button>
        </div>
        <div className='flex gap-3 flex-wrap'>
          {categories.map((category, index) => (
            <button key={index} onClick={() => setSelectedCategory(category)} className={selectedCategory === category ? 'px-4 py-1 border border-gray-300 bg-blue-500 rounded-lg text-white transition' : 'px-4 py-1 border border-gray-300 bg-gray-50 rounded-lg hover:bg-gray-300 transition'}>{category}</button>
          ))}
        </div>
        <div className='w-full'>
          {filteredMenu.length > 0 ? (
            <div className='grid md:grid-cols-3 grid-cols-1 gap-6 md:mb-10 mb-2'>
                {filteredMenu.map((item) => (
                <MenuCard key={item.id} item={item} itemEdit={itemEdit} />
              ))}
            </div>
          ) : (
            <div className='flex items-center justify-center '>
              <Lottie animationData={NotFound} loop={true} className='w-64 h-64 md:w-100 md:h-100'/>
            </div>
          )}
        </div>
        {isMenuModalOpen && <MenuModal categories={categories} onClose={closeMenuModal} itemToEdit={itemToEdit} setItemToEdit={setItemToEdit} defaultValues={defaultValues} />}
    </div>
  )
}

export default Menu