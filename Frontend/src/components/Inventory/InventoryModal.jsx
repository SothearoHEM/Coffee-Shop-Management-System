import { useContext, useEffect, useState } from 'react'
import { InventoryContext } from '../../contexts/InventoryContext.jsx';

function InventoryModal({ onClose, itemToEdit, setItemToEdit, defaultValues }) {
    const { addInventoryItem, updateInventoryItem } = useContext(InventoryContext);
    const [inventoryData, setInventoryData] = useState({
        itemName: '',
        unit: '',
        currentStock: '',
        minStock: '',
        maxStock: '',
        unitCost: '',
        supplier: ''
    });

    useEffect(() => {
        if (defaultValues) {
            setInventoryData({
                itemName: defaultValues.name || '',
                unit: defaultValues.unit || '',
                currentStock: defaultValues.currentStock?.toString() || '',
                minStock: defaultValues.minStock?.toString() || '',
                maxStock: defaultValues.maxStock?.toString() || '',
                unitCost: defaultValues.unitCost?.toString() || '',
                supplier: defaultValues.supplier || ''
            });
            return;
        }

        setInventoryData({
            itemName: '',
            unit: '',
            currentStock: '',
            minStock: '',
            maxStock: '',
            unitCost: '',
            supplier: ''
        });
    }, [defaultValues, itemToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInventoryData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const { itemName, unit, currentStock, minStock, maxStock, unitCost, supplier } = inventoryData;
        if (!itemName || !unit || !currentStock || !minStock || !maxStock || !unitCost || !supplier) {
            alert('Please fill in all fields.');
            return false;
        }
        if (parseInt(currentStock) < 0 || parseInt(minStock) < 0 || parseInt(maxStock) < 0 || parseFloat(unitCost) < 0) {
            alert('Stock levels and unit cost cannot be negative.');
            return false;
        }
        if (parseInt(minStock) > parseInt(maxStock)) {
            alert('Minimum stock cannot be greater than maximum stock.');
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        const normalizedItem = {
            name: inventoryData.itemName,
            unit: inventoryData.unit,
            currentStock: parseInt(inventoryData.currentStock),
            minStock: parseInt(inventoryData.minStock),
            maxStock: parseInt(inventoryData.maxStock),
            unitCost: parseFloat(inventoryData.unitCost),
            supplier: inventoryData.supplier,
        };

        if (itemToEdit) {
            updateInventoryItem({
                ...defaultValues,
                ...normalizedItem,
                id: defaultValues.id,
                lastRestocked: defaultValues.lastRestocked,
            });
            setItemToEdit(null);
        } else {
            addInventoryItem({
                id: Date.now().toString(),
                ...normalizedItem,
                lastRestocked: new Date(),
            });
        }

        onClose();
    };
  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center md:p-0 p-2 z-50'>
        <form className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md' onSubmit={handleSubmit}>
            <h2 className='text-xl mb-2'>{itemToEdit ? 'Edit Inventory Item' : 'Add Inventory Item'}</h2>
            <p className='mb-4 text-sm text-gray-600'>
                {itemToEdit ? 'Update inventory item details.' : 'Add a new inventory item to your stock.'}
            </p>
            <div className='mb-4'>
                <label className='block mb-1 font-semibold' htmlFor="itemName">Item Name</label>
                <input type="text" onChange={handleChange} name="itemName" id='itemName' className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' required value={inventoryData.itemName} />
            </div>
            <div className='mb-4 flex flex-row gap-4'>
                <div className='flex-1'>
                    <label className='block mb-1 font-semibold' htmlFor="unit">Unit</label>
                    <input type="text" onChange={handleChange} name="unit" id='unit' className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='e.g., kg,litters' required value={inventoryData.unit} />
                </div>
                <div className='flex-1'>
                    <label className='block mb-1 font-semibold' htmlFor="unitCost">Unit Cost($)</label>
                    <input type="number" onChange={handleChange} name="unitCost" id='unitCost' className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' required value={inventoryData.unitCost} />
                </div>
            </div>
            <div className='mb-4 flex-row gap-4 flex'>
                <div className='flex-1'>
                    <label className='block mb-1 font-semibold' htmlFor="currentStock">Current Stock</label>
                    <input type="number" onChange={handleChange} name="currentStock" id='currentStock' className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' required value={inventoryData.currentStock} />
                </div>
                <div className='flex-1'>
                    <label className='block mb-1 font-semibold' htmlFor="minStock">Minimum Stock</label>
                    <input type="number" onChange={handleChange} name="minStock" id='minStock' className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' required value={inventoryData.minStock} />
                </div>
                <div className='flex-1'>
                    <label className='block mb-1 font-semibold' htmlFor="maxStock">Maximum Stock</label>
                    <input type="number" onChange={handleChange} name="maxStock" id='maxStock' className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' required value={inventoryData.maxStock} />
                </div>
            </div>
            <div className='mb-4'>
                <label className='block mb-1 font-semibold' htmlFor="supplier">Supplier</label>
                <input type="text" onChange={handleChange} name="supplier" id='supplier' className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Supplier Name' required value={inventoryData.supplier} />
            </div>
            <div className='flex justify-end gap-4'>
                <button type='button' className='px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100' onClick={onClose}>Cancel</button>
                <button type='submit' className='px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-800'>
                    {itemToEdit ? 'Update Item' : 'Add Item'}
                </button>
            </div>
        </form>
    </div>
  )
}

export default InventoryModal