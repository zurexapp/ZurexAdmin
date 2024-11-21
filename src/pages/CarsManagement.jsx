// pages/CarsManagement.js

import React, { useState } from "react";
import PageHeader from "../layout/PageHeader";
import CustomersInfobox from "../components/CustomersInfobox";
import CarsTable from "../widgets/UsersTable/CarsTable";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Search from "../ui/Search";

const CarsManagement = () => {
  const navigate = useNavigate();
  const { adminCarsData } = useSelector((state) => state.project);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <PageHeader title="Cars Management" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full items-center">
        <CustomersInfobox
          count={adminCarsData?.length}
          color="green"
          label="All"
          carlabel="Cars"
          customerlabel="Customers"
          isCarManagement={true} // Pass isCarManagement prop to indicate car management page
        />
        <button
          onClick={() => navigate("/addCars")}
          className="btn btn--primary"
          style={{ maxWidth: "250px", margin: "0px auto" }}
        >
          Add new car <i className="icon-circle-plus-regular" />
        </button>
        <Search
          wrapperClass="lg:w-[350px] h-[44px] mx-auto"
          placeholder="Search"
          query={searchQuery}
          setQuery={setSearchQuery}
        />
      </div>

      <CarsTable status={{ value: "default" }} name={searchQuery} />
    </>
  );
};

export default CarsManagement;
