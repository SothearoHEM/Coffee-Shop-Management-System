import React, { useEffect } from 'react'
import { useContext } from 'react'
import { MenuContext } from '../../contexts/MenuContext.jsx'

function MenuModal({categories, onClose, itemToEdit, setItemToEdit, defaultValues}) {
    const {addMenuItem, updateMenuItem} = useContext(MenuContext);
    const [itemData, setItemData] = React.useState({
        name: '',
        category: '',  
        price: 0,
        cost: 0,
        description: '',
        image: '',
        available: true,
    });

    useEffect(() => {
        if (defaultValues) {
            setItemData({
                name: defaultValues.name || '',
                category: defaultValues.category || '',
                price: defaultValues.price || 0,
                cost: defaultValues.cost || 0,
                description: defaultValues.description || '',
                image: defaultValues.image || '',
                available: defaultValues.available ?? true,
            });
        }
    }, [defaultValues, itemToEdit]);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'checkbox') {
            setItemData({
                ...itemData,
                [name]: checked,
            });
        } else if (type === 'file') {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setItemData({
                    ...itemData,
                    [name]: reader.result,
                });
            };
            if (file) {
                reader.readAsDataURL(file);
            }
        } else {
            setItemData({
                ...itemData,
                [name]: value,
            });
        }
    }
    const menuDataValidation = () => {
        if (!itemData.name || !itemData.category || !itemData.description || !itemData.price || !itemData.cost) {
            alert('Please fill in all required fields.');
            return false;
        }
        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!menuDataValidation()) {
            return;
        }

        if (itemToEdit) {
            // Edit existing item
            updateMenuItem({
                ...defaultValues,
                ...itemData,
                price: Number(itemData.price),
                cost: Number(itemData.cost),
            });
            setItemToEdit(null);
        } else {
            // Add new item
            const newItem = {
                id: Date.now().toString(),
                ...itemData,
                price: Number(itemData.price),
                cost: Number(itemData.cost),
            };
            addMenuItem(newItem);
            // Reset form for next item
            setItemData({
                name: '',
                category: '',
                price: 0,
                cost: 0,
                description: '',
                image: '',
                available: true,
            });
        }
        onClose();
    }
    
  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center md:p-0 p-2 z-50'>
        <form onSubmit={handleSubmit} className='bg-white p-6 rounded-md shadow-md max-w-xl w-full'>
            <h2 className='text-xl mb-2'>{itemToEdit ? 'Edit Menu Item' : 'Add New Menu Item'}</h2>
            <p className='mb-4 text-sm text-gray-600'>{itemToEdit ? 'Update menu item information.' : 'Add a new item to your coffee shop menu.'}</p>
            <div className='mb-4'>
                <label className='block mb-1 font-medium' htmlFor="itemName">Item Name</label>
                <input onChange={handleChange} value={itemData.name} type="text" id="itemName" name="name" className='w-full border border-gray-300 p-2 rounded-md' placeholder='Enter item name' required/>
            </div>
            <div className='mb-4'>
                <label className='block mb-1 font-medium' htmlFor="category">Category</label>
                {categories.length > 0 ? (
                  <select onChange={handleChange} value={itemData.category} id="category" name="category" className='w-full border border-gray-300 p-2 rounded-md' required>
                      <option value="" hidden>Select a category</option>
                      {categories.filter(cat => cat !== "All" && cat !== "Other").map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                      ))}
                  </select>
                ) : (
                  <p className='text-gray-500'>No categories available.</p>
                )
                }
            </div>
            <div className='grid grid-cols-2 gap-4 mb-4'>
                <div className='mb-4'>
                    <label className='block mb-1 font-medium' htmlFor="price">Price</label>
                    <input onChange={handleChange} value={itemData.price} type="number" id="price" name="price" className='w-full border border-gray-300 p-2 rounded-md' placeholder='Enter item price' step="0.01" required/>
                </div>
                <div className='mb-4'>
                    <label className='block mb-1 font-medium' htmlFor="cost">Cost</label>
                    <input onChange={handleChange} value={itemData.cost} type="number" id="cost" name="cost" className='w-full border border-gray-300 p-2 rounded-md' placeholder='Enter item cost' step="0.01" required/>
                </div>
            </div>
            <div className='mb-4'>
                <label className='block mb-1 font-medium' htmlFor="description">Description</label>
                <textarea onChange={handleChange} value={itemData.description} id="description" name="description" className='w-full border border-gray-300 p-2 rounded-md' placeholder='Enter item description' required></textarea>
            </div>
            <div className='mb-4'>
                <label className='block mb-1 font-medium' htmlFor="image">Image</label>
                <input onChange={handleChange} type="file" id="image" name="image" className='w-full border bg-gray-100 cursor-pointer border-gray-300 p-2 rounded-md' placeholder='Enter image URL'/>
            </div>
            <div className='items-center mb-4'>
                <input onChange={handleChange} type="checkbox" id="available" name="available" checked={itemData.available}/>
                <label htmlFor="available" className='ml-2'>Available for Sale</label>
            </div>
            <div className='flex justify-end space-x-4'>
                <button type="button" onClick={onClose} className='px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition'>Cancel</button>
                <button type="submit" className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition'>{itemToEdit ? 'Update Menu Item' : 'Add Menu Item'}</button>
            </div>
        </form>
    </div>
  )
}

export default MenuModal