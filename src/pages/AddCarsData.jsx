import React, { useState } from "react";
import PageHeader from "../layout/PageHeader";
import Spring from "../components/Spring";
import classNames from "classnames";
import { toast } from "react-toastify";
import { postData } from "../db/databaseFunction";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Select, { components } from "react-select";

// Car model options with a "Select All" at the top
const carModelsOptions = [
  { value: "selectAll", label: "Select All" },
  ...Array.from({ length: 2025 - 2010 + 1 }, (_, index) => {
    const year = 2010 + index;
    return { value: year.toString(), label: year.toString() };
  })
];

console.log(carModelsOptions);


const AddCarsData = () => {
  const navigate = useNavigate();
  const { adminCarsData } = useSelector((state) => state.project);

  const [formData, setformData] = useState({
    carCompany: "",
    carCompanyAr: "",
    carName: "",
    carNameAr: "",
    carModal: [], // For storing multiple car models
    oilCapacity: "",
  });

  // Handle car model changes
  const handleCarModalChange = (selectedOptions) => {
    const isSelectAll = selectedOptions.some(option => option.value === "selectAll");

    if (isSelectAll) {
      // Select all car models if "Select All" is chosen
      const allCarModels = carModelsOptions.slice(1).map(option => option.value);
      setformData({ ...formData, carModal: allCarModels });
    } else {
      const selectedValues = selectedOptions.map((option) => option.value);
      setformData({ ...formData, carModal: selectedValues });
    }
  };

  // Display a single toast with all the selected cars
  const showSelectedCarsToast = () => {
    if (formData.carModal.length > 0) {
      const cars = formData.carModal.join(", ");
      toast.success(`Car models added: ${cars}`);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const carModelData = formData.carModal.map((year) => ({
      carCompany: formData.carCompany,
      carCompanyAr: formData.carCompanyAr,
      carName: formData.carName,
      carNameAr: formData.carNameAr,
      carModal: year,
      oilCapacity: formData.oilCapacity,
    }));

    for (const data of carModelData) {
      const checkExistingCar = adminCarsData?.filter((car) =>
        `${car.carCompany} ${car.carName} ${car.carCompanyAr} ${car.carNameAr} ${car.carModal}`
          .toLowerCase()
          .includes(
            `${data.carCompany} ${data.carName} ${data.carCompanyAr} ${data.carNameAr} ${data.carModal}`.toLowerCase()
          )
      );

      if (checkExistingCar?.length > 0) {
        toast.error(`Car data for year ${data.carModal} already exists`);
      } else {
        await postData("adminCarsData", data)
          .then(() => {
            toast.success(`Car data for year ${data.carModal} added successfully`);
          })
          .catch((e) => toast.error("Error: " + e));
      }
    }

    // Show a single toast listing all car models
    showSelectedCarsToast();
    navigate(-1);
  };

  // Custom dropdown option with checkbox
  const Option = (props) => {
    return (
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
          style={{ marginRight: 8 }}
        />
        <label>{props.label}</label>
      </components.Option>
    );
  };

  return (
    <>
      <PageHeader title="Add Car" />
      <div className="bg-widget flex items-center justify-center w-full py-10 px-4 lg:p-[60px]">
        <Spring
          className="w-full max-w-[560px]"
          type="slideUp"
          duration={400}
          delay={300}
        >
          <form className="mt-5 flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* Car Company English */}
            <div className="field-wrapper">
              <label htmlFor="carCompany" className="field-label">
                Car Company English
              </label>
              <input
                className={classNames("field-input")}
                required
                id="carCompany"
                type="text"
                placeholder="Car Company English"
                value={formData.carCompany}
                onChange={(e) =>
                  setformData({ ...formData, carCompany: e.target.value })
                }
              />
            </div>

            {/* Car Company Arabic */}
            <div className="field-wrapper">
              <label htmlFor="carCompanyAr" className="field-label">
                Car Company Arabic
              </label>
              <input
                className={classNames("field-input")}
                required
                id="carCompanyAr"
                type="text"
                placeholder="Car Company Arabic"
                value={formData.carCompanyAr}
                onChange={(e) =>
                  setformData({ ...formData, carCompanyAr: e.target.value })
                }
              />
            </div>

            {/* Car Name English */}
            <div className="field-wrapper">
              <label htmlFor="carName" className="field-label">
                Car Name English
              </label>
              <input
                className={classNames("field-input")}
                required
                id="carName"
                type="text"
                placeholder="Car Name English"
                value={formData.carName}
                onChange={(e) =>
                  setformData({ ...formData, carName: e.target.value })
                }
              />
            </div>

            {/* Car Name Arabic */}
            <div className="field-wrapper">
              <label htmlFor="carNameAr" className="field-label">
                Car Name Arabic
              </label>
              <input
                className={classNames("field-input")}
                required
                id="carNameAr"
                type="text"
                placeholder="Car Name Arabic"
                value={formData.carNameAr}
                onChange={(e) =>
                  setformData({ ...formData, carNameAr: e.target.value })
                }
              />
            </div>

            {/* Car Modal Dropdown with Checkboxes */}
            <div className="field-wrapper">
              <label htmlFor="carModal" className="field-label">
                Car Modal
              </label>
              <Select
                isMulti
                options={carModelsOptions}
                value={carModelsOptions.filter((option) =>
                  formData.carModal.includes(option.value)
                )}
                onChange={handleCarModalChange}
                className="basic-multi-select"
                classNamePrefix="select"
                components={{ Option }}
                placeholder="Select Car Models"
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: "var(--widget)",
                    border: "1px solid var(--input-border)",
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected
                      ? "var(--primary)"
                      : "var(--widget)",
                    color: state.isSelected ? "#fff" : "#000",
                    "&:hover": {
                      backgroundColor: "var(--primary-light)",
                    },
                  }),
                }}
              />
            </div>

            {/* Oil Capacity */}
            <div className="field-wrapper">
              <label htmlFor="oilCapacity" className="field-label">
                Car Oil Capacity 
              </label>
              <input
                className={classNames("field-input")}
                required
                id="oilCapacity"
                type="number"
                placeholder="Car Oil Capacity"
                value={formData.oilCapacity}
                onChange={(e) =>
                  setformData({ ...formData, oilCapacity: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col items-center gap-6 mt-4 mb-10">
              <button type="submit" className="btn btn--primary w-full">
                Upload
              </button>
            </div>
          </form>
        </Spring>
      </div>
    </>
  );
};

export default AddCarsData;


// import React from "react";
// import PageHeader from "../layout/PageHeader";
// import Spring from "../components/Spring";
// import { useState } from "react";
// import classNames from "classnames";
// import { toast } from "react-toastify";
// import { postData } from "../db/databaseFunction";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const AddCarsData = () => {
//   const navigate = useNavigate();
//   const { adminCarsData } = useSelector((state) => state.project);
//   const [formData, setformData] = useState({
//     carCompany: "",
//     carCompanyAr: "",
//     carName: "",
//     carNameAr: "",
//     carModal: "",
//     oilCapacity: "",
//   });
//   const handlePasswordReminder = async (e) => {
//     e.preventDefault();
//     const checkExistingCar = adminCarsData?.filter((car) =>
//       `${car.carCompany} ${car.carName} ${car.carCompanyAr} ${car.carNameAr} ${car.carModal}`
//         .toLowerCase()
//         .includes(
//           `${formData.carCompany} ${formData.carName} ${formData.carCompanyAr} ${formData.carNameAr} ${formData.carModal}`.toLowerCase()
//         )
//     );
//     if (checkExistingCar?.length > 0) {
//       toast.error("This car data is already present in database");
//     } else {
//       const dataToPost = {
//         carCompany: formData.carCompany,
//         carCompanyAr: formData.carCompanyAr,
//         carName: formData.carName,
//         carNameAr: formData.carNameAr,
//         carModal: formData.carModal,
//         oilCapacity: formData.oilCapacity,
//       };
//       await postData("adminCarsData", { ...dataToPost })
//         .then(() => {
//           toast.success("Car Added");
//           navigate(-1);
//         })
//         .catch((e) => toast.error("Error" + e));
//     }
//   };

//   return (
//     <>
//       <PageHeader title="Add Car" />
//       <div className="bg-widget flex items-center justify-center w-full py-10 px-4 lg:p-[60px]">
//         <Spring
//           className="w-full max-w-[560px]"
//           type="slideUp"
//           duration={400}
//           delay={300}
//         >
//           <form
//             className="mt-5 flex flex-col gap-5"
//             onSubmit={handlePasswordReminder}
//           >
//             <div className="field-wrapper">
//               <label htmlFor="skuId" className="field-label">
//                 Car Company English
//               </label>
//               <input
//                 className={classNames("field-input")}
//                 required
//                 id="skuId"
//                 type="text"
//                 minLength={3}
//                 placeholder="Car Company English"
//                 value={formData.carCompany}
//                 onChange={(e) =>
//                   setformData({ ...formData, carCompany: e.target.value })
//                 }
//               />
//             </div>
//             <div className="field-wrapper">
//               <label htmlFor="skuId" className="field-label">
//                 Car Company Arabic
//               </label>
//               <input
//                 className={classNames("field-input")}
//                 required
//                 id="skuId"
//                 type="text"
//                 minLength={3}
//                 placeholder="Car Company Arabic"
//                 value={formData.carCompanyAr}
//                 onChange={(e) =>
//                   setformData({ ...formData, carCompanyAr: e.target.value })
//                 }
//               />
//             </div>
//             <div className="field-wrapper">
//               <label htmlFor="skuId" className="field-label">
//                 Car Name English
//               </label>
//               <input
//                 className={classNames("field-input")}
//                 required
//                 id="skuId"
//                 type="text"
//                 minLength={3}
//                 placeholder="Car Name English"
//                 value={formData.carName}
//                 onChange={(e) =>
//                   setformData({ ...formData, carName: e.target.value })
//                 }
//               />
//             </div>
//             <div className="field-wrapper">
//               <label htmlFor="skuId" className="field-label">
//                 Car Name Arabic
//               </label>
//               <input
//                 className={classNames("field-input")}
//                 required
//                 id="skuId"
//                 type="text"
//                 minLength={3}
//                 placeholder="Car Name Arabic"
//                 value={formData.carNameAr}
//                 onChange={(e) =>
//                   setformData({ ...formData, carNameAr: e.target.value })
//                 }
//               />
//             </div>
//             <div className="field-wrapper">
//               <label htmlFor="skuId" className="field-label">
//                 Car Modal
//               </label>
//               <input
//                 className={classNames("field-input")}
//                 required
//                 id="skuId"
//                 type="number"
//                 minLength={4}
//                 placeholder="Car Modal"
//                 value={formData.carModal}
//                 onChange={(e) =>
//                   setformData({ ...formData, carModal: e.target.value })
//                 }
//               />
//             </div>
//             <div className="field-wrapper">
//               <label htmlFor="skuId" className="field-label">
//                 Car Oil Capacity
//               </label>
//               <input
//                 className={classNames("field-input")}
//                 required
//                 id="skuId"
//                 type="number"
//                 minLength={1}
//                 placeholder="Car Oil Capacity"
//                 value={formData.oilCapacity}
//                 onChange={(e) =>
//                   setformData({ ...formData, oilCapacity: e.target.value })
//                 }
//               />
//             </div>
//             <div className="flex flex-col items-center gap-6 mt-4 mb-10">
//               <button type="submit" className="btn btn--primary w-full">
//                 Upload
//               </button>
//             </div>
//           </form>
//         </Spring>
//       </div>
//     </>
//   );
// };

// export default AddCarsData;



