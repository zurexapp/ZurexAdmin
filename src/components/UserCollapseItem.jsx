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

const UserCollapseItem = ({ user, activeCollapse, handleCollapse }) => {
  const [showExtra, setshowExtra] = useState(false);
  const deleteOrder = async (id) => {
    if (
      !window.confirm(`Are you sure you want to delete order with id ${id}?`)
    ) {
      return;
    } else {
      await removeData("user", id)
        .then(() => {
          toast.success("Customer Account Deleted");
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
              <td colSpan={2}>User</td>
            </tr>
            <tr>
              <td colSpan={2}>
                <div className="flex gap-6">
                  <div className="img-wrapper w-[70px] h-[64px] flex items-center justify-center">
                    <img
                      src={
                        user?.userImage
                          ? user?.userImage
                          : "data:image/png;base64,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"
                      }
                      alt={user?.name}
                    />
                  </div>
                  <div className="flex flex-col align-center justify-center">
                    <h5 className="text-sm mb-1.5">{user?.name}</h5>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{user?.name}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>{user?.phoneNumber}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{user?.userEmail}</td>
            </tr>
            <tr>
              <td>Actons</td>
              <td className="capitalize">
                <div className="flex items-center justify-center">
                  <button
                    onClick={() => deleteOrder(user?.dbId)}
                    aria-label="Edit"
                  >
                    <img src={trash} alt="trash" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </Collapse>
    </div>
  );
};

UserCollapseItem.propTypes = {
  order: PropTypes.object.isRequired,
  activeCollapse: PropTypes.string.isRequired,
  handleCollapse: PropTypes.func.isRequired,
};

export default UserCollapseItem;
