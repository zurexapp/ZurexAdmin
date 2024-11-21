// components
//import FilterItem from "@ui/FilterItem";
import Select from "../../ui/Select";
import StyledTable from "./styles";
import Empty from "../../components/Empty";
import Pagination from "../../ui/Pagination";
import ProductManagementCollapseItem from "../../components/ProductManagementCollapseItem";

// hooks
import { useState, useEffect } from "react";
import usePagination from "../../hooks/usePagination";
import { useWindowSize } from "react-use";

// constants
import {
  // PRODUCT_MANAGEMENT_OPTIONS,
  PRODUCT_CATEGORIES,
  // PRODUCT_TYPE_OPTIONS,
  // PRODUCT_SELLER_OPTIONS,
  // PRODUCT_ADDITIONAL_OPTIONS,
  // PRODUCT_SELECT_OPTIONS,
} from "../../constants/options";
import { PRODUCTS_MANAGEMENT_COLUMN_DEFS } from "../../constants/columnDefs";

// data placeholder
import { useSelector } from "react-redux";

const ProductManagementTable = ({ searchQuery, setSearchQuery }) => {
  const { width } = useWindowSize();
  const { filtersData, oilsData, tireData, batteryData, engineOilData,engineOilPetrolData } =
    useSelector((state) => state.project);

  const [category, setCategory] = useState("all");
  const [filters, setFilters] = useState({
    label: "All Products",
    value: "all",
  });
  const [activeCollapse, setActiveCollapse] = useState("");
  const [filteredData, setfilteredData] = useState([]);

  useEffect(() => {
    const mergedData = [
      ...(filtersData?.length > 0 ? filtersData : []),
      ...(oilsData?.length > 0 ? oilsData : []),
      ...(tireData?.length > 0 ? tireData : []),
      ...(batteryData?.length > 0 ? batteryData : []),
      ...(engineOilData?.length > 0 ? engineOilData : []),
      ...(engineOilPetrolData?.length > 0 ? engineOilPetrolData : []),
    ];
    if (category === "all" || category === "") {
      setfilteredData(
        mergedData?.filter(
          (dat) =>
            `${dat?.productNameArab}`
              .toLowerCase()
              .includes(`${searchQuery}`.toLowerCase()) ||
            `${dat?.productNameEng}`
              .toLowerCase()
              .includes(`${searchQuery}`.toLowerCase())
        )
      );
    } else {
      setfilteredData(
        mergedData.filter(
          (product) =>
            product.reference === category &&
            (`${product?.productNameArab}`
              .toLowerCase()
              .includes(`${searchQuery}`.toLowerCase()) ||
              `${product?.productNameEng}`
                .toLowerCase()
                .includes(`${searchQuery}`.toLowerCase()))
        )
      );
    }
  }, [
    category,
    filtersData,
    tireData,
    batteryData,
    oilsData,
    searchQuery,
    engineOilData,
    engineOilPetrolData,
  ]);

  const handleClearFilters = () => {
    setFilters({ label: "All Products", value: "all" });
    setCategory("all");
    setSearchQuery("");
  };

  const pagination = usePagination(filteredData, 25);

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
    <div className="flex flex-col flex-1">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-x-6 xl:grid-cols-6 mb-4">
        <Select
          options={PRODUCT_CATEGORIES}
          value={filters}
          placeholder="Product Category"
          onChange={(e) => {
            setFilters(e);
            setCategory(e.value);
          }}
        />

        <div className="grid grid-cols-2 gap-3">
          <button
            className="btn btn--outline blue !h-[44px]"
            onClick={handleClearFilters}
          >
            Clear
          </button>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-[22px] mt-4">
        {width >= 768 ? (
          <StyledTable
            columns={PRODUCTS_MANAGEMENT_COLUMN_DEFS}
            dataSource={pagination.currentItems()}
            rowKey={(record) => record.sku}
            locale={{
              emptyText: <Empty text="No products found" />,
            }}
            pagination={false}
          />
        ) : (
          <div className="flex flex-col gap-5">
            {pagination.currentItems().map((product, index) => (
              <ProductManagementCollapseItem
                key={`product-${index}`}
                product={product}
                handleCollapse={handleCollapse}
                activeCollapse={activeCollapse}
              />
            ))}
          </div>
        )}
        {pagination.maxPage > 1 && <Pagination pagination={pagination} />}
      </div>
    </div>
  );
};

export default ProductManagementTable;
