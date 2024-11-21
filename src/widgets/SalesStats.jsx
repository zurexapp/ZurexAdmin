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
// import { numFormatter } from "../utils/helpers";
import { useSelector } from "react-redux";

// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="chart-tooltip p-4">
//         <h6 className="mb-1">{label}</h6>
//         <div className="flex flex-col">
//           {payload.map((item, index) => (
//             <div className="flex gap-1.5" key={index}>
//               <span className="label-text capitalize">{item.name}:</span>
//               <span className="h6 !text-sm">
//                 {numFormatter(item.value, 1, "SAR ")}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return null;
// };

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
                {item.value.toLocaleString("en-US", { style: "currency", currency: "SAR" })}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};


const SalesStats = () => {
  const { theme } = useTheme();
  const { width } = useWindowSize();
  const revenueColor = theme === "light" ? "var(--header)" : "#C4DEFF";
  const { myOrdersData } = useSelector((state) => state.project);
  const totalRevenueByMonth = (month) => {
    let totalRev = 0;
    const filteredData = myOrdersData?.filter(
      (dat) =>
        new Date(dat?.updatedAt).getMonth() + 1 === month &&
        new Date(dat?.updatedAt).getFullYear() === new Date().getFullYear() &&
        dat.orderStatus === "completed"
    );
    filteredData?.map((dat) => {
      totalRev = totalRev + dat.totalPrice;
      return null;
    });
    return totalRev;
  };

  const Graphdata = [
    { name: "Jan", revenue: totalRevenueByMonth(1) },
    { name: "Feb", revenue: totalRevenueByMonth(2) },
    { name: "Mar", revenue: totalRevenueByMonth(3) },
    { name: "Apr", revenue: totalRevenueByMonth(4) },
    { name: "May", revenue: totalRevenueByMonth(5) },
    { name: "Jun", revenue: totalRevenueByMonth(6) },
    { name: "Jul", revenue: totalRevenueByMonth(7) },
    { name: "Aug", revenue: totalRevenueByMonth(8) },
    { name: "Sep", revenue: totalRevenueByMonth(9) },
    { name: "Oct", revenue: totalRevenueByMonth(10) },
    { name: "Nov", revenue: totalRevenueByMonth(11) },
    { name: "Dec", revenue: totalRevenueByMonth(12) },
  ];
  return (
    <Spring
      className="card flex flex-col  sm:h-[494px] lg:col-span-3 xl:col-span-1"
      style={{ height: "100%" }}
    >
      <div className="flex flex-col gap-2.5 mb-5 md:flex-row md:justify-between md:items-center">
        <h4>Sales Statistic</h4>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2.5">
            <span
              className="w-4 h-4 rounded-full"
              style={{ background: revenueColor }}
            />
            <span className="font-heading font-semibold text-sm text-header">
              Revenue
            </span>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={Graphdata} margin={false}>
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
              //tickFormatter={(value) => numFormatter(value, 0, "$")}
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

export default SalesStats;
