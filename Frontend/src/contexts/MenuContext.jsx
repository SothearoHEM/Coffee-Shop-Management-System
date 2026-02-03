import { createContext, useState } from "react";

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const [menu, setMenu] = useState([
        {
            id: '1',
            name: 'Espresso',
            category: 'Coffee',
            price: 3.5,
            cost: 0.8,
            description: 'Rich and bold espresso shot',
            available: true,
            image: 'https://example.com/images/espresso.jpg'
        },
        {
            id: '2',
            name: 'Cappuccino',
            category: 'Coffee',
            price: 4.0,
            cost: 1.0,
            description: 'Espresso with steamed milk and foam',
            available: true,
            image: 'https://example.com/images/cappuccino.jpg'
        },
        {
            id: '3',
            name: 'Blueberry Muffin',
            category: 'Pastry',
            price: 2.5,
            cost: 0.5,
            description: 'Freshly baked muffin with blueberries',
            available: true,
            image: 'https://example.com/images/blueberry_muffin.jpg'
        }
        ,{
            id: '4',
            name: 'Croissant',
            category: 'Pastry',
            price: 2.0,
            cost: 0.4,
            description: 'Buttery and flaky croissant',
            available: true,
            image: 'https://example.com/images/croissant.jpg'
        },
        {
            id: '5',
            name: 'Tea Latte',
            category: 'Tea',
            price: 3.0,
            cost: 0.7,
            description: 'Smooth and creamy tea latte',
            available: true,
            image: 'https://example.com/images/tea_latte.jpg'
        }
    ]);

    const categories = ["All", ...new Set(menu.map(item => item.category)),"Other"];

    return (
    <MenuContext.Provider value={{ menu, setMenu, categories }}>
        {children}
    </MenuContext.Provider>
);
}



