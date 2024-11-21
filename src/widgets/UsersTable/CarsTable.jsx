import React from "react";
import usePagination from "../../hooks/usePagination";
import { useEffect, useState } from "react";
import { useWindowSize } from "react-use";

import Spring from "../../components/Spring";
import StyledTable from "./styles";
import Pagination from "../../ui/Pagination";
import Empty from "../../components/Empty";
import { CARS_COLUMN_DEFS } from "../../constants/columnDefs";
import { useSelector } from "react-redux";
import CarsCollapseItem from "../../components/CarsCollapseItem";

function CarsTable({ name }) {
  const { width } = useWindowSize();
  const { adminCarsData } = useSelector((state) => state.project);
  const [activeCollapse, setActiveCollapse] = useState("");
  console.log(activeCollapse);
  const filteredDataRaw =
    name?.lenght <= 0
      ? adminCarsData
      : adminCarsData.filter(
          (order) =>
            `${order.carCompany} ${order.carName} ${order.carModal}`
              .toLowerCase()
              .includes(`${name}`.toLowerCase()) ||
            `${order.carCompanyAr} ${order.carNameAr} ${order.carModal}`
              .toLowerCase()
              .includes(`${name}`.toLowerCase())
        );

  const pagination = usePagination(filteredDataRaw, 15);

  // go to first page when period or sort changes and reset active collapse

  // reset active collapse when page or window width changes
  useEffect(() => {
    setActiveCollapse("");
  }, [pagination.currentPage, width]);

  return (
    <Spring className="flex flex-col flex-1 w-full">
      {width >= 768 ? (
        <StyledTable
          className="mb-[26px] mt-[26px]"
          columns={CARS_COLUMN_DEFS}
          dataSource={pagination.currentItems()}
          pagination={false}
          locale={{
            emptyText: <Empty text="No cars found" />,
          }}
          rowKey={(record) => record.id}
        />
      ) : (
        <div className="flex flex-1 flex-col gap-5 mb-[26px] mt-[26px]">
          {pagination.currentItems().map((order) => (
            <CarsCollapseItem key={order?.dbId} user={order} />
          ))}
        </div>
      )}
      {pagination.maxPage > 1 && <Pagination pagination={pagination} />}
    </Spring>
  );
}

export default CarsTable;
