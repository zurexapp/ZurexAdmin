// components
import Spring from "../components/Spring";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// hooks
import { useTheme } from "../contexts/themeContext";
import { useWindowSize } from "react-use";
import { numFormatter } from "../utils/helpers";

const data = [
  { name: "Jan", revenue: 4000, expense: 2400 },
  { name: "Feb", revenue: 3000, expense: 1398 },
  { name: "Mar", revenue: 2000, expense: 9800 },
  { name: "Apr", revenue: 3450, expense: 3908 },
  { name: "May", revenue: 8000, expense: 4800 },
  { name: "Jun", revenue: 2390, expense: 6800 },
  { name: "Jul", revenue: 1900, expense: 4300 },
  { name: "Aug", revenue: 8900, expense: 4500 },
  { name: "Sep", revenue: 5600, expense: 10000 },
  { name: "Oct", revenue: 6450, expense: 1200 },
  { name: "Nov", revenue: 7840, expense: 3000 },
  { name: "Dec", revenue: 3490, expense: 4300 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip p-4">
        <h6 className="mb-1">{label}</h6>
        <div className="flex flex-col">
          {payload.map((item, index) => (
            <div className="flex gap-1.5" key={index}>
              <span className="label-text capitalize">{item.name}:</span>
              <span className="h6 !text-sm">
                {numFormatter(item.value, 1, "$")}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

const OrderStats = () => {
  const { theme } = useTheme();
  const { width } = useWindowSize();
  const revenueColor = theme === "light" ? "var(--header)" : "#C4DEFF";
  //const expenseColor = theme === "light" ? "var(--input-border)" : "#8D8D99";

  return (
    <Spring
      className="card flex flex-col  sm:h-[494px] lg:col-span-3 xl:col-span-1"
      style={{ height: "100%" }}
    >
      <div className="flex flex-col gap-2.5 mb-5 md:flex-row md:justify-between md:items-center">
        <h4>Order Statistic</h4>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2.5">
            <span
              className="w-4 h-4 rounded-full"
              style={{ background: revenueColor }}
            />
            <span className="font-heading font-semibold text-sm text-header">
              Orders
            </span>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={false}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--input-border)"
              strokeOpacity={0.6}
            />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              dy={9}
              hide={width < 768}
              tick={{
                fontSize: 14,
                fontFamily: "var(--heading-font)",
                fontWeight: 700,
                fill: "var(--header)",
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => numFormatter(value, 0, "$")}
              tick={{
                fill: "var(--header)",
              }}
              hide={width < 768}
            />
            <Tooltip cursor={false} content={<CustomTooltip />} />
            <Bar
              dataKey="revenue"
              fill={revenueColor}
              maxBarSize={16}
              radius={10}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Spring>
  );
};

export default OrderStats;
