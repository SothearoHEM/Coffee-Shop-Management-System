import { createContext, useState } from "react";

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const [MenuCategories, setMenuCategories] = useState([
        { id: '1', name: 'Coffee' },
        { id: '2', name: 'Tea' },
        { id: '3', name: 'Pastry' }
    ]);
    const [menu, setMenu] = useState([
        {
            id: '1',
            name: 'Espresso',
            category: MenuCategories.find(cat => cat.name === 'Coffee')?.name || 'Other',
            price: 3.5,
            cost: 0.8,
            description: 'Rich and bold espresso shot',
            available: true,
            image: 'https://images.unsplash.com/photo-1645445644664-8f44112f334c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3ByZXNzbyUyMGNvZmZlZSUyMGN1cHxlbnwxfHx8fDE3NjMzNzEzNDV8MA&ixlib=rb-4.1.0&q=80&w=400',

        },
        {
            id: '2',
            name: 'Cappuccino',
            category: MenuCategories.find(cat => cat.name === 'Coffee')?.name || 'Other',
            price: 4.0,
            cost: 1.0,
            description: 'Espresso with steamed milk and foam',
            available: true,
            image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXBwdWNjaW5vfGVufDF8fHx8MTc2MzM3MTM0NXww&ixlib=rb-4.1.0&q=80&w=400'
        },
        {
            id: '3',
            name: 'Blueberry Muffin',
            category: MenuCategories.find(cat => cat.name === 'Pastry')?.name || 'Other',
            price: 2.5,
            cost: 0.5,
            description: 'Freshly baked muffin with blueberries',
            available: true,
            image: 'https://example.com/images/blueberry_muffin.jpg'
        }
        ,{
            id: '4',
            name: 'Croissant',
            category: MenuCategories.find(cat => cat.name === 'Pastry')?.name || 'Other',
            price: 2.0,
            cost: 0.4,
            description: 'Buttery and flaky croissant',
            available: true,
            image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXBwdWNjaW5vfGVufDF8fHx8MTc2MzM3MTM0NXww&ixlib=rb-4.1.0&q=80&w=400'
        },
        {
            id: '5',
            name: 'Tea Latte',
            category: MenuCategories.find(cat => cat.name === 'Tea')?.name || 'Other',
            price: 3.0,
            cost: 0.7,
            description: 'Smooth and creamy tea latte',
            available: true,
            image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWF8ZW58MXx8fHwxNzYzMzcxMzQ1fDA&ixlib=rb-4.1.0&q=80&w=400'
        }
    ]);

    const categories = ['All', ...MenuCategories.map(cat => cat.name), 'Other'];

    const addMenuItem = (newItem) => {
        setMenu([...menu, newItem]);
    }
    const updateMenuItem = (updatedItem) => {
        setMenu(menu.map(item => item.id === updatedItem.id ? updatedItem : item));
    }
    const deleteMenuItem = (itemId) => {
        setMenu(menu.filter(item => item.id !== itemId));
    }
    return (
    <MenuContext.Provider value={{ menu, setMenu, categories, MenuCategories, setMenuCategories, addMenuItem, updateMenuItem, deleteMenuItem }}>
        {children}
    </MenuContext.Provider>
);
}



