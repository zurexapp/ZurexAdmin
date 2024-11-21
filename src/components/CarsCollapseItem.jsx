// components
import Collapse from "@mui/material/Collapse";
//import RatingStars from "@ui/RatingStars";
// import SubmenuTrigger from '@ui/SubmenuTrigger';
import trash from "../assets/icons/trash.svg";

// hooks

// utils
import PropTypes from "prop-types";
import { removeData } from "../db/databaseFunction";
import { toast } from "react-toastify";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const CarsCollapseItem = ({ user }) => {
  const [showExtra, setshowExtra] = useState(false);
  const deleteOrder = async (id) => {
    if (!window.confirm(`Are you sure you want to delete car with id ${id}?`)) {
      return;
    } else {
      await removeData("adminCarsData", id)
        .then(() => {
          toast.success("Car Deleted");
        })
        .catch((e) => {
          toast.error(`Error: ${e}`);
        });
    }
  };
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <span className="subheading-2">#{user?.dbId}</span>
        <div className="flex items-center gap-4">
          <button
            className={`collapse-btn ${showExtra ? "active" : ""}`}
            aria-label="Toggle view"
            onClick={() => setshowExtra(!showExtra)}
          >
            <i className="icon icon-caret-down-solid" />
          </button>
        </div>
      </div>
      <Collapse in={showExtra}>
        <table className="basic-table">
          <tbody>
            <tr>
              <td colSpan={2}>Car</td>
            </tr>
            <tr>
              <td>Car Company</td>
              <td>{user?.carCompany}</td>
            </tr>
            <tr>
              <td>Car Company Arabic</td>
              <td>{user?.carCompanyAr}</td>
            </tr>
            <tr>
              <td>Car Name</td>
              <td>{user?.carName}</td>
            </tr>
            <tr>
              <td>Car Arabic Name</td>
              <td>{user?.carNameAr}</td>
            </tr>

            <tr>
              <td>Car Modal</td>
              <td>{user?.carModal}</td>
            </tr>
            <tr>
              <td>Oil Capacity</td>
              <td>{user?.oilCapacity}</td>
            </tr>
            <tr>
              <td>Actons</td>
              <td className="capitalize">
                <div className="flex items-center justify-evenly">
                  <button
                    onClick={() => deleteOrder(user?.dbId)}
                    aria-label="Edit"
                  >
                    <img src={trash} alt="trash" />
                  </button>
                  <NavLink to={`/editCarData/${user.dbId}`} aria-label="Edit">
                    <i className="icon icon-pen-to-square-regular text-lg leading-none" />
                  </NavLink>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </Collapse>
    </div>
  );
};

CarsCollapseItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default CarsCollapseItem;
