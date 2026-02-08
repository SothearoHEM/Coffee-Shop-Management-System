import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import { useContext } from "react";
import { OrderContext } from "../../contexts/OrderContext";

const DailyRevenueOverview = () => {
  const { weeksRevenue } = useContext(OrderContext)

  return (
    <div className="bg-white rounded-xl p-5 shadow">
      <h3 className="font-medium mb-4 text-gray-700">Daily Revenue Overview</h3>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={weeksRevenue}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#114B8A" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#114B8A" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#114B8A"
              fill="url(#revenueGradient)"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DailyRevenueOverview;
