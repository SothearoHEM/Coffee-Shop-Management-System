import React, { useContext } from "react";
import { OrderContext } from "../../contexts/OrderContext.jsx";

const BestSellersDetails = () => {
  const { orders } = useContext(OrderContext);

  const map = {};

  orders
    .filter(o => o.status === "completed")
    .forEach(order =>
      order.items.forEach(i => {
        if (!map[i.name]) {
          map[i.name] = { qty: 0, revenue: 0 };
        }
        map[i.name].qty += i.quantity;
        map[i.name].revenue += i.price * i.quantity;
      })
    );

  const list = Object.entries(map)
    .map(([name, v]) => ({ name, ...v }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

    const numColor = (i) => {
        if (i === 0) return "bg-yellow-600";
        if (i === 1) return "bg-gray-400";
        if (i === 2) return "bg-red-700";
        return "bg-blue-600";
    };
  return (
    <div className="h-90 bg-white rounded-xl p-5 shadow gap-3 flex flex-col">
      <h3 className="font-medium mb-4 text-gray-700">Best Sellers Details</h3>
      <div className="flex flex-col gap-3 overflow-y-auto">
        {list.map((item, i) => (
        <div key={item.name} className="flex justify-between items-center py-3 border border-blue-300 rounded-lg p-2">
          <div className="flex items-center gap-4">
            <p className={`font-medium px-3 py-2 rounded-xl text-white shadow-md ${numColor(i)}`}>#{i + 1}</p>
            <div className="flex flex-col">
                <p className="text-lg font-semibold text-gray-700">{item.name}</p>
                <p className="text-sm text-gray-500"> Sold {item.qty} times</p>
            </div>
          </div>
          <p className="font-semibold text-lg text-blue-800">${item.revenue.toFixed(2)}</p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default BestSellersDetails;
