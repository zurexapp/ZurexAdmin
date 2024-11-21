// // components
// import Spring from "../components/Spring";
// // import InfoBtn from "@ui/InfoBtn";
// import ReportItem from "../components/ReportItem";
// import { useSelector } from "react-redux";
// //import { NavLink } from "react-router-dom";
// //import Submenu from "@ui/Submenu";

// // hooks
// //import useSubmenu from "@hooks/useSubmenu";

// // const data = [
// //   { dataKey: "revenue", title: "Daily", amount: 176120, trend: 45 },
// //   { dataKey: "revenue", title: "Monthly", amount: 310452, trend: -12 },
// //   { dataKey: "revenue", title: "Yearly", amount: 342558, trend: 14.56 },
// // ];

// const TotalReport = () => {
//   // const { anchorEl, open, handleClick, handleClose } = useSubmenu();
//   const { myOrdersData } = useSelector((state) => state.project);

//   const totalRevenueByMonth = (month) => {
//     let totalRev = 0;
//     const filteredData = myOrdersData?.filter(
//       (dat) =>
//         new Date(dat?.updatedAt).getMonth() + 1 === month &&
//         new Date(dat?.updatedAt).getFullYear() === new Date().getFullYear() &&
//         dat.orderStatus === "completed"
//     );
//     filteredData?.map((dat) => {
//       totalRev = totalRev + dat.orderPrice;
//       return null;
//     });
//     return totalRev;
//   };
//   const totalRevenueByYear = () => {
//     let totalRev = 0;
//     const filteredData = myOrdersData?.filter(
//       (dat) =>
//         new Date(dat?.updatedAt).getFullYear() === new Date().getFullYear() &&
//         dat.orderStatus === "completed"
//     );
//     filteredData?.map((dat) => {
//       totalRev = totalRev + dat.orderPrice;
//       return null;
//     });
//     return totalRev;
//   };
//   const data = [
//     // { dataKey: "revenue", title: "Hourly", amount: 342558 },
//     // { dataKey: "revenue", title: "Daily", amount: 176120 },
//     // { dataKey: "revenue", title: "Weekly", amount: 342558 },
//     {
//       dataKey: "revenue",
//       title: "Monthly",
//       amount: totalRevenueByMonth(new Date().getMonth() + 1),
//     },
//     { dataKey: "revenue", title: "Yearly", amount: totalRevenueByYear() },
//   ];
//   return (
//     <Spring className="card flex flex-col lg:col-span-3 xl:col-span-1">
//       <div>
//         <div className="flex items-center justify-between">
//           <h4>Total Sales Report</h4>
//           {/* <InfoBtn onClick={handleClick} /> */}
//         </div>
//         <p className="mt-1.5 mb-4 text-sm md:text-base">
//           A complete and comprehensive report about sales.
//         </p>
//       </div>
//       <div
//         className="flex flex-col flex-1 gap-6 mb-6"
//         style={{ alignItems: "center", justifyContent: "space-evenly" }}
//       >
//         {data.map((item, index) => (
//           <ReportItem key={index} data={item} />
//         ))}
//       </div>
//     </Spring>
//   );
// };

// export default TotalReport;


// components
import Spring from "../components/Spring";
import ReportItem from "../components/ReportItem";
import { useSelector } from "react-redux";

const TotalReport = () => {
  const { myOrdersData } = useSelector((state) => state.project);

  const totalRevenueByMonth = (month) => {
    let totalRev = 0;
    const currentYear = new Date().getFullYear();
    const filteredData = myOrdersData?.filter((dat) => {
      const orderDate = new Date(dat?.updatedAt);
      return (
        orderDate.getMonth() + 1 === month &&
        orderDate.getFullYear() === currentYear &&
        dat.orderStatus === "completed"
      );
    });

    filteredData?.forEach((dat) => {
      totalRev += dat?.totalPrice || 0; // Ensure orderPrice exists
    });

    return totalRev;
  };

  const totalRevenueByYear = () => {
    let totalRev = 0;
    const currentYear = new Date().getFullYear();
    const filteredData = myOrdersData?.filter((dat) => {
      const orderDate = new Date(dat?.updatedAt);
      return (
        orderDate.getFullYear() === currentYear && 
        dat.orderStatus === "completed"
      );
    });

    filteredData?.forEach((dat) => {
      totalRev += dat?.totalPrice || 0; // Ensure orderPrice exists
    });

    return totalRev;
  };

  const data = [
    {
      dataKey: "revenue",
      title: "Monthly",
      amount: totalRevenueByMonth(new Date().getMonth() + 1), // Current month
    },
    {
      dataKey: "revenue",
      title: "Yearly",
      amount: totalRevenueByYear(),
    },
  ];

  return (
    <Spring className="card flex flex-col lg:col-span-3 xl:col-span-1">
      <div>
        <div className="flex items-center justify-between">
          <h4>Total Sales Report</h4>
        </div>
        <p className="mt-1.5 mb-4 text-sm md:text-base">
          A complete and comprehensive report about sales.
        </p>
      </div>
      <div className="flex flex-col flex-1 gap-6 mb-6" style={{ alignItems: "center", justifyContent: "space-evenly" }}>
        {data.map((item, index) => (
          <ReportItem key={index} data={item} />
        ))}
      </div>
    </Spring>
  );
};

export default TotalReport;
