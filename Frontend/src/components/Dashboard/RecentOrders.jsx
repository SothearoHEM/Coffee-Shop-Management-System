import React from 'react';
import { useContext } from 'react';
import { OrderContext } from '../../contexts/OrderContext.jsx';

const statusStyle = {
  preparing: "bg-blue-100 text-blue-600",
  pending: "bg-yellow-100 text-yellow-600",
  completed: "bg-purple-100 text-purple-600",
};

const RecentOrders = () => {
  const { orders } = useContext(OrderContext);

  const recentOrders = orders
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 5)
    .map(order => ({
      id: order.customers?.[0]?.id || order.id,
      items: order.items.reduce((sum, item) => sum + item.quantity, 0),
      amount: order.total,
      time: order.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: order.status
    }));

  return (
    <div className="w-full bg-white p-4 rounded-lg border border-blue-200">
      <h3 className="font-semibold mb-4 text-gray-700">Recent Orders</h3>

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {recentOrders.map(order => (
          <div key={order.id} className="flex justify-between border p-3 rounded-lg border-blue-200">
            <div>
              <p className="font-medium text-gray-700">{order.id}</p>
              <p className="text-xs text-gray-500">
                {order.items} items • {order.time}
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold text-gray-700">${order.amount.toFixed(2)}</p>
              <span className={`text-xs px-2 py-1 rounded ${statusStyle[order.status]}`}>
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;
