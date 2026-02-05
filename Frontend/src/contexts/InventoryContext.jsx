import { createContext, useState } from "react";
export const InvetoryContext = createContext();

export const InventoryProvider = ({ children }) => {
    const [inventory, setInventory] = useState([
        {
            id: '1',
            name: 'Coffee Beans',
            unit: 'kg',
            currentStock: 8,
            minStock: 10,
            maxStock: 50,
            unitCost: 12.5,
            supplier: 'Premium Coffee Co.',
            lastRestocked: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        },
        {
            id: '2',
            name: 'Milk',
            unit: 'liters',
            currentStock: 30,
            minStock: 20,
            maxStock: 100,
            unitCost: 1.2,
            supplier: 'Dairy Best',
            lastRestocked: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        },
        {
            id: '3',
            name: 'Sugar',
            unit: 'kg',
            currentStock: 8,
            minStock: 5,
            maxStock: 30,
            unitCost: 0.8,
            supplier: 'Sweet Supplies Ltd.',
            lastRestocked: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        },
        {
            id: '4',
            name: 'Tea Leaves',
            unit: 'kg',
            currentStock: 12,
            minStock: 8,
            maxStock: 40,
            unitCost: 10.0,
            supplier: 'Green Leaf Traders',
            lastRestocked: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        }
    ]);
    return (
        <InvetoryContext.Provider value={{ inventory, setInventory }}>
            {children}
        </InvetoryContext.Provider>
    );
}