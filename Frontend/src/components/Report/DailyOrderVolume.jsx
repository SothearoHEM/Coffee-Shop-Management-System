import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import { useContext } from "react";
import { OrderContext } from "../../contexts/OrderContext";

const DailyOrderVolume = () => {
  const { orders } = useContext(OrderContext);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const data = days.map(day => ({
    day,
    orders: orders.filter(
      o =>
        o.status === "completed" &&
        o.createdAt.toLocaleDateString(undefined, { weekday: "short" }) === day
    ).length
  }));

  return (
    <div className="bg-white rounded-xl p-5 shadow">
      <h3 className="font-medium mb-4 text-gray-700">Daily Order Volume</h3>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="orders"
              stroke="#114B8A"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DailyOrderVolume;
