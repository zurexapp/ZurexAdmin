import React, { useState } from "react";
import { Select } from "antd"; // Remove unused imports
import { PlusOutlined } from "@ant-design/icons";
import StyledTable, { StyledButton, StyledModal, StyledInput, StyledSelect, StyledDatePicker } from "./styles";

import { getCouponsColumnDefs } from "../../constants/columnDefs";
import { toast } from "react-toastify";
import moment from "moment";

const { Option } = Select;

function CouponTable() {
  const dummyData = [
    {
      id: "1",
      couponName: "WELCOME10",
      category: "Filters",
      type: "Percentage",
      amount: 10,
      orderMinAmount: 100,
      expiryDate: "2024-12-31T12:00:00",
      status: true,
    },
    {
      id: "2",
      couponName: "SAVE50",
      category: "Oils",
      type: "Amount",
      amount: 50,
      orderMinAmount: 200,
      expiryDate: "2024-10-15T18:00:00",
      status: false,
    },
  ];

  const [data, setData] = useState(dummyData);
  const [editingRowId, setEditingRowId] = useState(null);
  const [editableData, setEditableData] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal state
  const getInitialCouponData = () => ({
    couponName: "",
    category: "Filters",
    type: "Percentage",
    amount: "",
    orderMinAmount: "",
    expiryDate: null,
    status: true,
  });
  const [newCouponData, setNewCouponData] = useState(getInitialCouponData());

  const handleEditClick = (record) => {
    setEditingRowId(record.id);
    setEditableData({ ...record, expiryDate: moment(record.expiryDate) });
  };

  const handleSave = () => {
    if (!editableData.couponName || !editableData.amount || !editableData.orderMinAmount) {
      toast.error("Please fill in all fields.");
      return;
    }

    setData((prevData) =>
      prevData.map((item) =>
        item.id === editableData.id
          ? { ...editableData, expiryDate: editableData.expiryDate.format("YYYY-MM-DDTHH:mm:ss") }
          : item
      )
    );
    setEditingRowId(null);
  };

  const handleCancel = () => {
    setEditingRowId(null);
  };

  const handleChange = (e, fieldName) => {
    setEditableData({
      ...editableData,
      [fieldName]: e.target.value,
    });
  };

  const handleSelectChange = (value, fieldName) => {
    setEditableData({
      ...editableData,
      [fieldName]: value,
    });
  };

  const handleDateChange = (date) => {
    setEditableData({
      ...editableData,
      expiryDate: date,
    });
  };

  const handleStatusToggle = (id, checked) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, status: checked } : item
      )
    );
  };

  const handleNewCouponChange = (e, fieldName) => {
    setNewCouponData({
      ...newCouponData,
      [fieldName]: e.target.value,
    });
  };

  const handleNewCouponSelectChange = (value, fieldName) => {
    setNewCouponData({
      ...newCouponData,
      [fieldName]: value,
    });
  };

  const handleNewCouponDateChange = (date) => {
    setNewCouponData({
      ...newCouponData,
      expiryDate: date,
    });
  };

  const handleCreateCoupon = () => {
    if (!newCouponData.couponName || !newCouponData.amount || !newCouponData.orderMinAmount || !newCouponData.expiryDate) {
      toast.error("Please fill in all fields.");
      return;
    }

    const newCoupon = {
      id: (data.length + 1).toString(),
      ...newCouponData,
      expiryDate: newCouponData.expiryDate.format("YYYY-MM-DDTHH:mm:ss"),
    };

    setData([...data, newCoupon]);
    setIsModalVisible(false); // Close modal
  setNewCouponData(getInitialCouponData()); // Reset form data

  };

  const columnDefs = getCouponsColumnDefs({
    handleEditClick,
    handleSave,
    handleCancel,
    editingRowId,
    editableData,
    handleChange,
    handleSelectChange,
    handleDateChange,
    handleStatusToggle,
  });

  return (
    <>
      <StyledButton
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        Create Coupon
      </StyledButton>

      <StyledTable
        columns={columnDefs}
        dataSource={data}
        rowKey="id"
        pagination={false}
      />

      <StyledModal
        title="Create Coupon"
        visible={isModalVisible}
        onOk={handleCreateCoupon}
        onCancel={() => setIsModalVisible(false)}
        okText="Create"
      >
        <StyledInput
          placeholder="Coupon Name"
          value={newCouponData.couponName}
          onChange={(e) => handleNewCouponChange(e, "couponName")}
        />
        <StyledSelect
        value={newCouponData.category}
        onChange={(value) => handleNewCouponSelectChange(value, "category")}
        dropdownRender={(menu) => (
          <div style={{ width: '100% !important' }}>
            {menu}
          </div>
        )}
      >
        <Option value="Filters">Filters</Option>
        <Option value="Oils">Oils</Option>
        <Option value="Batteries">Batteries</Option>
        <Option value="Tyres">Tyres</Option>
        <Option value="Engine Oil Petrol">Engine Oil Petrol</Option>
        <Option value="Engine Oil Diesel">Engine Oil Diesel</Option>
      </StyledSelect>
      
      <StyledSelect
        value={newCouponData.type}
        onChange={(value) => handleNewCouponSelectChange(value, "type")}
        dropdownRender={(menu) => (
          <div style={{ width: '100%' }}>
            {menu}
          </div>
        )}
      >
        <Option value="Percentage">Percentage</Option>
        <Option value="Amount">Amount</Option>
      </StyledSelect>
      
        <StyledInput
          placeholder="Amount"
          value={newCouponData.amount}
          type="number"
          onChange={(e) => handleNewCouponChange(e, "amount")}
        />
        <StyledInput
          placeholder="Order Min Amount"
          value={newCouponData.orderMinAmount}
          type="number"
          onChange={(e) => handleNewCouponChange(e, "orderMinAmount")}
        />
        <StyledDatePicker
          showTime
          value={newCouponData.expiryDate}
          onChange={handleNewCouponDateChange}
          format="YYYY-MM-DD HH:mm:ss"
        />
      </StyledModal>
    </>
  );
}

export default CouponTable;
