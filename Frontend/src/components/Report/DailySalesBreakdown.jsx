import { useContext } from "react";
import { OrderContext } from "../../contexts/OrderContext";

const DailySalesBreakdown = () => {
  const { orders } = useContext(OrderContext);

  const days = {};

  orders
    .filter(o => o.status === "completed")
    .forEach(o => {
      const key = o.createdAt.toDateString();
      if (!days[key]) days[key] = { total: 0, count: 0 };
      days[key].total += o.total;
      days[key].count += 1;
    });

  const list = Object.entries(days);
  const max = Math.max(...list.map(d => d[1].total), 1);

  return (
    <div className="bg-white rounded-xl p-5 shadow">
      <h3 className="font-medium mb-4 text-gray-700">Daily Sales Breakdown</h3>
      {list.map(([date, d]) => (
        <div key={date} className="mb-4 flex justify-between items-center border border-blue-300 rounded-lg p-3">
          <div className="flex text-sm">
            <div>
              <p className="font-medium text-gray-700">{date}</p>
              <p className="text-xs text-gray-500">{d.count} orders</p>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-end">
            <div className="text-right">
              <p>${d.total.toFixed(2)}</p>
              <p className="text-xs text-gray-500">${(d.total / d.count).toFixed(2)} avg</p>
            </div>
            <div className="md:w-20 w-15 bg-gray-200 rounded h-2">
                <div className="h-2 bg-blue-500 rounded" style={{ width: `${(d.total / max) * 100}%`}}/>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DailySalesBreakdown;
