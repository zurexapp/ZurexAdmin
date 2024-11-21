  // components
  import Spring from "../../components/Spring";
  import StyledTable from "./styles";
  import Pagination from "../../ui/Pagination";
  import OrderCollapseItem from "../../components/OrderCollapseItem";
  import Empty from "../../components/Empty";

  // hooks
  import usePagination from "../../hooks/usePagination";
  import { useEffect, useState } from "react";
  import { useWindowSize } from "react-use";

  // constants
  import { ORDERS_COLUMN_DEFS } from "../../constants/columnDefs";

  // data placeholder

  const OrdersTable = ({ category, sort, status, searchValue, orders }) => {
    const { width } = useWindowSize();
    const [activeCollapse, setActiveCollapse] = useState("");

    const filteredDataRaw =
      category.value === "all"
        ? orders
        : orders.filter((order) => order.category === category.value);
    const filteredDataRwNew =
      status.value === "default"
        ? filteredDataRaw
        : filteredDataRaw.filter((order) => order.orderStatus === status.value);
    const filteredData = searchValue
      ? filteredDataRwNew.filter((order) =>
          `${order.id}`.toLowerCase().includes(`${searchValue}`.toLowerCase())
        )
      : filteredDataRwNew;
const sortedData = () => {
  const dataToSort = [...filteredData]; // Create a copy of the array
  switch (sort.value) {
    default:
    case "default":
      // Sort by createdAt to show the latest orders first
      return dataToSort.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    case "a-z":
      return dataToSort.sort((a, b) =>
        a.product.name.localeCompare(b.product.name)
      );
    case "z-a":
      return dataToSort.sort((a, b) =>
        b.product.name.localeCompare(a.product.name)
      );
    case "rating-high-to-low":
      return dataToSort.sort((a, b) => b.rating - a.rating);
    case "rating-low-to-high":
      return dataToSort.sort((a, b) => a.rating - b.rating);
  }
};

    const pagination = usePagination(sortedData(), 25);

    // go to first page when period or sort changes and reset active collapse
    useEffect(() => {
      pagination.goToPage(0);
      setActiveCollapse("");
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, sort]);

    // reset active collapse when page or window width changes
    useEffect(() => {
      setActiveCollapse("");
    }, [pagination.currentPage, width]);

    const handleCollapse = (sku) => {
      if (activeCollapse === sku) {
        setActiveCollapse("");
      } else {
        setActiveCollapse(sku);
      }
    };

    return (
      <Spring className="flex flex-col flex-1 w-full">
        {width >= 768 ? (
          <StyledTable
            columns={ORDERS_COLUMN_DEFS}
            dataSource={pagination.currentItems()}
            pagination={false}
            locale={{
              emptyText: <Empty text="No orders found" />,
            }}
            rowKey={(record) => record.orderNumber}
          />
        ) : (
          <div className="flex flex-1 flex-col gap-5 mb-[26px]">
            {pagination.currentItems().map((order) => (
              <OrderCollapseItem
                key={order.id}
                order={order}
                activeCollapse={activeCollapse}
                handleCollapse={handleCollapse}
              />
            ))}
          </div>
        )}
        {pagination.maxPage > 1 && <Pagination pagination={pagination} />}
      </Spring>
    );
  };

  export default OrdersTable;
