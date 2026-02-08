import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import { useContext } from "react";
import { OrderContext } from "../../contexts/OrderContext";

const TopSellingItems = () => {
  const { orders } = useContext(OrderContext);

  const map = {};
  orders
    .filter(o => o.status === "completed")
    .forEach(o =>
      o.items.forEach(i => {
        map[i.name] = (map[i.name] || 0) + i.quantity;
      })
    );

  const data = Object.entries(map).map(([name, qty]) => ({
    name,
    qty
  }));

  return (
    <div className="bg-white rounded-xl p-5 shadow">
      <h3 className="font-medium mb-4 text-gray-700">Top Selling Items</h3>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={100} />
            <Tooltip />

            <Bar
              dataKey="qty"
              fill="#114B8A"
              radius={[0, 8, 8, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TopSellingItems;
