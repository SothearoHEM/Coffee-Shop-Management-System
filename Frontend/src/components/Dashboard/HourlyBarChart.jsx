import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useContext } from "react";
import { OrderContext } from "../../contexts/OrderContext.jsx";

const HourlyBarChart = () => {
    const { hourlySales } = useContext(OrderContext);

  return (
    <div className="w-full bg-white p-4 rounded-lg border border-blue-200">
      <h3 className="font-semibold mb-4 text-gray-700">Today's Hourly Activity</h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={hourlySales}>
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#114B8A" radius={[6,6,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HourlyBarChart;
