import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useContext } from "react";
import { OrderContext } from "../../contexts/OrderContext.jsx";


const RevenueLineChart = () => {
    const { weeksRevenue } = useContext(OrderContext);

  return (
    <div className="w-full bg-white p-4 rounded-lg border border-blue-200">
      <h3 className="font-semibold mb-4 text-gray-700">7-Day Revenue Trend</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={weeksRevenue}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line dataKey="revenue" stroke="#114B8A" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueLineChart;
