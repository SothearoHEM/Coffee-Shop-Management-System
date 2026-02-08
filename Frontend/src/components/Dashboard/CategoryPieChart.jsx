import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useContext } from "react";
import { OrderContext } from "../../contexts/OrderContext.jsx";


const COLORS = [
  "#0B3C5D",
  "#114B8A",
  "#1E5AA8",
  "#2B6CB0",
  "#3B82F6",
  "#4C9BFF",
  "#7AA7E9",
  "#90B4F8",
  "#A7C5FF",
  "#C9DBFF"
];

const CategoryPieChart = () => {
  const { categorySales } = useContext(OrderContext);
  const totalRevenue = categorySales.reduce((sum, entry) => sum + entry.revenue, 0);
  const chartData = categorySales.map(entry => ({
    ...entry,
    percent: totalRevenue > 0 ? (entry.revenue / totalRevenue) * 100 : 0
  }));

  return (
    <div className="w-full bg-white p-4 rounded-lg border border-blue-200">
      <h3 className="font-semibold mb-4 text-gray-700">Sales by Category</h3>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart width={400} height={250}>
          <Pie
            data={chartData}
            dataKey="revenue"
            nameKey="category"
            outerRadius={80}
            label={({ name, percent }) => `${name} ${percent.toFixed(1)}%`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name, props) => {
              const percent = props?.payload?.percent ?? 0;
              return [`${value.toFixed(2)} (${percent.toFixed(1)}%)`, name];
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryPieChart;
