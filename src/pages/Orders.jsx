import React, { useState, useEffect } from "react";
import PageHeader from "../layout/PageHeader";
import CalendarSelector from "../components/CalendarSelector";
import Select from "../ui/Select";
import OrdersAverageRate from "../widgets/OrdersAverageRate";
import OrdersInfobox from "../components/OrdersInfobox";
import OrdersTable from "../widgets/OrdersTable";
import Search from "../ui/Search";
import { CSVLink } from "react-csv";
import { useSelector } from "react-redux";
import {
  PRODUCT_CATEGORIES,
  ORDER_SORT_OPTIONS,
  PRODUCT_SORT_ORDER_CATEGORY,
} from "../constants/options";

const Orders = () => {
  const category = PRODUCT_CATEGORIES[0];
  const sort = ORDER_SORT_OPTIONS[0];
  const [orderCategory, setOrderCategory] = useState(PRODUCT_SORT_ORDER_CATEGORY[0]);
  const [selectedDateRange, setSelectedDateRange] = useState(() => {
    const storedRange = JSON.parse(localStorage.getItem("selectedDateRange"));
    return storedRange || [null, null];
  });
  const { myOrdersData } = useSelector((state) => state.project);
  const [query, setQuery] = useState("");

  // Function to filter orders based on selected date range
  const filterOrdersByDate = (orders, dateRange) => {
    if (!dateRange || !dateRange[0] || !dateRange[1]) return orders;
    const [startDate, endDate] = dateRange;
    return orders.filter((order) => {
      const orderDate = new Date(order.createdAt); // Assuming 'createdAt' is the date field
      return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
    });
  };

  // Filtered orders based on date range
  const filteredOrders = filterOrdersByDate(myOrdersData, selectedDateRange);

  // Prepare CSV data based on filtered orders, including customer name and phone number

const csvData = [
  ["Order ID", "Payment Method", "Order Status", "Total Price", "Order Price", "Tax Price", "Created At", "Updated At", "Ordered By User ID",  "Appointment Date", "Appointment Time", "City Name", "Location Name", "Car Name", "Car Category", "Number Plate"], // Header row
  ...filteredOrders.map(order => [
    order.id || "N/A",
    // order.customerName || "N/A",
    // order.phoneNumber || "N/A", // Ensure phoneNumber exists in your order data
    order.paymentMethodName || "N/A",
    order.orderStatus || "N/A",
    order.totalPrice || "N/A", // Include totalPrice in the CSV data
    order.orderPrice || "N/A", // Include orderPrice
    order.taxPrice || "N/A", // Include taxPrice
    new Date(order.createdAt).toLocaleString() || "N/A", // Format date as needed
    new Date(order.updatedAt).toLocaleString() || "N/A", // Include updatedAt date
    order.OrderedByUserId || "N/A", // Include OrderedByUserId
    // order.TeamId || "N/A", // Include TeamId
    order.appointment?.date || "N/A", // Include appointment date
    order.appointment?.time || "N/A", // Include appointment time
    order.deliveryInfo?.cityName || "N/A", // Include city name from deliveryInfo
    order.deliveryInfo?.locationName || "N/A", // Include location name from deliveryInfo
    order.selectedCar?.carName || "N/A", // Include car name
    order.selectedCar?.category || "N/A", // Include car category
    order.selectedCar?.numberPlate || "N/A", // Include number plate
  ]),
];


  console.log('dfawfefw',filteredOrders);

  useEffect(() => {
    localStorage.setItem("selectedDateRange", JSON.stringify(selectedDateRange));
  }, [selectedDateRange]);

  useEffect(() => {
    // Optional: Reset filters or perform any side effects when orders data changes
  }, [myOrdersData]);

  return (
    <>
      <PageHeader title="Orders" />
      <div className="flex flex-col-reverse gap-4 mb-5 md:flex-col lg:flex-row lg:justify-between">
        <div className="w-full flex flex-col-reverse gap-4 mb-5 md:flex-col lg:flex-row lg:justify-between">
          <CSVLink
            className="btn btn--outline blue !h-[44px] w-[200px]"
            data={csvData}
            filename={"orders.csv"}
          >
            Export CSV <i className="icon-file-export-solid" />
          </CSVLink>
          <Search
            wrapperClass="lg:w-[326px]"
            placeholder="Search Order by Id"
            query={query}
            setQuery={setQuery}
          />
        </div>
      </div>
      <div className="flex flex-col flex-1 gap-5 md:gap-[26px]">
        <div
          className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-[26px] lg:grid-cols-3 lg:items-end
                     xl:grid-cols-4"
        >
          <CalendarSelector
            wrapperClass="lg:max-w-[275px] lg:col-span-2 xl:col-span-3"
            id="ordersPeriodSelector"
            onChange={setSelectedDateRange}
            value={selectedDateRange}
          />
          <div className="grid grid-cols-1">
            <div className={`lg:max-w-[275px] flex flex-col gap-2.5 w-full`}>
              <label className="h5 w-fit" style={{ color: "transparent" }}>
                hy
              </label>
              <Select
                value={orderCategory}
                options={PRODUCT_SORT_ORDER_CATEGORY}
                onChange={setOrderCategory}
                placeholder="Order Status"
              />
            </div>
          </div>
        </div>
        <div className="w-full widgets-grid grid-cols-1 xl:grid-cols-6">
          <div className="xl:col-span-2">
            <OrdersAverageRate />
          </div>
          <div className="widgets-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:col-span-4">
            <OrdersInfobox
              title="New"
              count={filteredOrders?.filter((dat) => dat.orderStatus === "pending").length}
              icon={<i className="icon-check-to-slot-solid" />}
            />
            <OrdersInfobox
              title="Completed"
              count={filteredOrders?.filter((dat) => dat.orderStatus === "completed").length}
              color="green"
              icon={<i className="icon-list-check-solid" />}
            />
            <OrdersInfobox
              title="Canceled"
              count={filteredOrders?.filter((dat) => dat.orderStatus === "canceled").length}
              color="red"
              icon={<i className="icon-ban-solid" />}
            />
            <OrdersInfobox
              title="Total"
              count={filteredOrders.length}
              color="badge-status-bg"
              icon={<i className="icon-plus-regular" />}
            />
          </div>
        </div>
        <OrdersTable
          category={category}
          sort={sort}
          status={orderCategory}
          searchValue={query}
          orders={filteredOrders}
        />
      </div>
    </>
  );
};

export default Orders;
