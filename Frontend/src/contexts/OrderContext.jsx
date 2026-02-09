/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useMemo } from "react";
import { MenuContext } from "./MenuContext.jsx";

export const OrderContext = createContext();
export const useOrders = () => useContext(OrderContext);

const initialOrders = (() => {
  const now = Date.now();
  return [
    {
      id: "ORD-1001",
      items: [
        { name: "Espresso", category: "Coffee", price: 3.0, quantity: 2 },
        { name: "Blueberry Muffin", category: "Pastry", price: 2.5, quantity: 1 },
      ],
      subtotal: 8.5,
      tax: 0.85,
      total: 9.35,
      paymentMethod: "cash",
      cashier: "Alice",
      status: "completed",
      customers: [
        { id: 'CUST-001', name: 'John Doe', email: 'john.doe@example.com' }
      ],
      createdAt: new Date(now - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      id: "ORD-1002",
      items: [
        { name: "Latte", category: "Coffee", price: 4.0, quantity: 1 },
        { name: "Chocolate Croissant", category: "Pastry", price: 3.0, quantity: 2 },
      ],
      subtotal: 10.0,
      tax: 1.0,
      total: 11.0,
      paymentMethod: "card",
      cashier: "Bob",
      status: "pending",
      createdAt: new Date(now - 30 * 60 * 1000), // 30 minutes ago
      customers: [
        { id: 'CUST-002', name: 'Jane Smith', email: 'jane.smith@example.com' }
      ],
    }
  ];
})();

export const OrderProvider = ({ children }) => {
    const { MenuCategories } = useContext(MenuContext);
  const [orders, setOrders] = useState(initialOrders);
  const weeksRevenue = useMemo(() => {
    const today = new Date();
    const days = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (6 - index));
      return {
        dateKey: date.toDateString(),
        day: date.toLocaleDateString(undefined, { weekday: "short" }),
        revenue: 0,
      };
    });

    orders.forEach(order => {
      const dateKey = order.createdAt.toDateString();
      const dayEntry = days.find(day => day.dateKey === dateKey);
      if (dayEntry) {
        dayEntry.revenue += order.total;
      }
    });

    return days.map(({ day, revenue }) => ({ day, revenue }));
  }, [orders]);

  const categorySales = useMemo(() => {
    const sales = {};
    orders.forEach(order => {
      order.items.forEach(item => {
        const category = MenuCategories.find(cat => cat.name === item.category)?.name || 'Other';
        sales[category] = (sales[category] || 0) + item.price * item.quantity;
      });
    });
    return Object.entries(sales).map(([category, revenue]) => ({ category, revenue }));
  }, [orders, MenuCategories]);

  const hourlySales = useMemo(() => {
    const hours = Array.from({ length: 24 }, (_, index) => ({
      hour: `${index}:00`,
      revenue: 0,
    }));
    orders.forEach(order => {
      const hour = order.createdAt.getHours();
      hours[hour].revenue += order.total;
    });
    return hours;
  }, [orders]);


  /* ======================
     CREATE ORDER (POS)
  ======================= */
  const createOrder = ({ items, paymentMethod, cashier }) => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    const newCustomerId = `CUST-${Date.now().toString().slice(-6)}`;

    const newOrder = {
      id: `ORD-${Date.now()}`,
      items,
      subtotal,
      tax,
      total,
      paymentMethod,
      cashier,
      status: "pending",
      customers: [{ id: newCustomerId }],
      createdAt: new Date(),
    };

    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  /* ======================
     UPDATE ORDER STATUS
  ======================= */
  const updateOrderStatus = (orderId, status) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        updateOrderStatus,
        weeksRevenue,
        categorySales,
        hourlySales
      }}
    >{children}</OrderContext.Provider>
  );
}   

