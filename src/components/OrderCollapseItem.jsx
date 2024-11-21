// // components
// import Collapse from "@mui/material/Collapse";
// import RatingStars from "../ui/RatingStars";
// // import SubmenuTrigger from '../ui/SubmenuTrigger';
// import trash from "../assets/icons/trash.svg";
// import ViewIcon from "../assets/icons/eye.svg";

// // hooks

// // utils
// import PropTypes from "prop-types";
// import { getStatusColor } from "../utils/helpers";
// import { removeData } from "../db/databaseFunction";
// import { toast } from "react-toastify";
// import { NavLink } from "react-router-dom";

// const OrderCollapseItem = ({ order, activeCollapse, handleCollapse }) => {
//   const findQuantity = (data) => {
//     let quantity = 0;
//     data.map((dat) => {
//       quantity = quantity + dat.quantity ? dat.quantity : 1;
//       return null;
//     });
//     return quantity;
//   };
//   const product = order.products;
//   const oilData = product.filter((dat) => dat.referance === "Oils");
//   const filterData = product.filter((dat) => dat.referance === "Filters");
//   const batteryData = product.filter((dat) => dat.referance === "btteries");
//   const tyreData = product.filter((dat) => dat.referance === "Tyres");
//   const engineOilData = product.filter((dat) => dat.referance === "engineOil");

//   const oilsQuantity = findQuantity(oilData);
//   const filterQuantity = findQuantity(filterData);
//   const batteryQuantity = findQuantity(batteryData);
//   const tyreQuantity = findQuantity(tyreData);
//   const engineOilQuantity = findQuantity(engineOilData);
//   const deleteOrder = async (id) => {
//     if (
//       !window.confirm(`Are you sure you want to delete order with id ${id}?`)
//     ) {
//       return;
//     } else {
//       await removeData("orders", id)
//         .then(() => {
//           toast.success("Order Deleted");
//         })
//         .catch((e) => {
//           toast.error(`Error: ${e}`);
//         });
//     }
//   };
//   return (
//     <div className="card">
//       <div className="flex items-center justify-between">
//         <span className="subheading-2">#{order.id}</span>
//         <div className="flex items-center gap-4">
//           <button
//             className={`collapse-btn ${
//               activeCollapse === order.sku ? "active" : ""
//             }`}
//             aria-label="Toggle view"
//             onClick={() => handleCollapse(order.id)}
//           >
//             <i className="icon icon-caret-down-solid" />
//           </button>
//         </div>
//       </div>
//       <Collapse in={activeCollapse === order.id}>
//         <table className="basic-table">
//           <tbody>
//             <tr>
//               <td colSpan={2}>Order</td>
//             </tr>

//             <tr>
//               <td>Total Products</td>
//               <td>
//                 <h5 className="text-sm">
//                   Filters : {filterQuantity} , Oils : {oilsQuantity} , Tyres :{" "}
//                   {tyreQuantity} , Batteries :{batteryQuantity} Engine Oil:
//                   {engineOilQuantity}
//                 </h5>
//               </td>
//             </tr>
//             <tr>
//               <td>Warrenty</td>
//               <td className="capitalize"> {order.Warrenty ? "Yes" : "No"}</td>
//             </tr>
//             <tr>
//               <td>Payment</td>
//               <td className="capitalize">{order?.totalPrice} SAR</td>
//             </tr>
//             <tr>
//               <td>Order Status</td>
//               <td className="capitalize">
//                 <span
//                   className="badge-status badge-status--lg"
//                   style={{
//                     backgroundColor: `var(--${getStatusColor(
//                       order.orderStatus
//                     )})`,
//                   }}
//                 >
//                   {order.orderStatus}
//                 </span>
//               </td>
//             </tr>
//             <tr>
//               <td>Rate</td>
//               <td className="capitalize">
//                 <RatingStars rating={order?.rating ? order?.rating : 0} />
//               </td>
//             </tr>
//             <tr>
//               <td>Actions</td>
//               <td className="flex items-center justify-evenly">
//                 <button onClick={() => deleteOrder(order.id)} aria-label="Edit">
//                   <img src={trash} alt="trash" />
//                 </button>
//                 <NavLink to={`/orderDetails/${order.id}`} aria-label="Details">
//                   <img src={ViewIcon} alt="view" />
//                 </NavLink>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </Collapse>
//     </div>
//   );
// };

// OrderCollapseItem.propTypes = {
//   order: PropTypes.object.isRequired,
//   activeCollapse: PropTypes.string.isRequired,
//   handleCollapse: PropTypes.func.isRequired,
// };

// export default OrderCollapseItem;
import Collapse from "@mui/material/Collapse";
import RatingStars from "../ui/RatingStars";
import trash from "../assets/icons/trash.svg";
import ViewIcon from "../assets/icons/eye.svg";
import PropTypes from "prop-types";
import { getStatusColor } from "../utils/helpers";
import { removeData } from "../db/databaseFunction";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const OrderCollapseItem = ({ order, activeCollapse, handleCollapse }) => {
  const findQuantity = (data) => {
    let quantity = 0;
    data.map((dat) => {
      quantity = quantity + dat.quantity ? dat.quantity : 1;
      return null;
    });
    return quantity;
  };

  const product = order.products;
  const oilData = product.filter((dat) => dat.referance === "Oils");
  const filterData = product.filter((dat) => dat.referance === "Filters");
  const batteryData = product.filter((dat) => dat.referance === "btteries");
  const tyreData = product.filter((dat) => dat.referance === "Tyres");
  const engineOilData = product.filter((dat) => dat.referance === "engineOil");
  const engineOilPetrolData = product.filter(
    (dat) => dat.referance === "engineOilPetrol"
  );

  const oilsQuantity = findQuantity(oilData);
  const filterQuantity = findQuantity(filterData);
  const batteryQuantity = findQuantity(batteryData);
  const tyreQuantity = findQuantity(tyreData);
  const engineOilQuantity = findQuantity(engineOilData);
  const engineOilPetrolQuantity = findQuantity(engineOilPetrolData);

  const engineOilTotalQuantity = engineOilQuantity + engineOilPetrolQuantity;

  const deleteOrder = async (id) => {
    if (
      !window.confirm(`Are you sure you want to delete order with id ${id}?`)
    ) {
      return;
    } else {
      await removeData("orders", id)
        .then(() => {
          toast.success("Order Deleted");
        })
        .catch((e) => {
          toast.error(`Error: ${e}`);
        });
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <span className="subheading-2">#{order.id}</span>
        <div className="flex items-center gap-4">
          <button
            className={`collapse-btn ${
              activeCollapse === order.sku ? "active" : ""
            }`}
            aria-label="Toggle view"
            onClick={() => handleCollapse(order.id)}
          >
            <i className="icon icon-caret-down-solid" />
          </button>
        </div>
      </div>
      <Collapse in={activeCollapse === order.id}>
        <table className="basic-table">
          <tbody>
            <tr>
              <td colSpan={2}>Order</td>
            </tr>
            <tr>
              <td>Total Products</td>
              <td>
                <h5 className="text-sm">
                  Filters: {filterQuantity}, Oils: {oilsQuantity}, Tyres:{" "}
                  {tyreQuantity}, Batteries: {batteryQuantity}, Engine Oil:{" "}
                  {engineOilTotalQuantity}
                </h5>
              </td>
            </tr>
            <tr>
              <td>Warrenty</td>
              <td className="capitalize"> {order.Warrenty ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td>Payment</td>
              <td className="capitalize">{order?.totalPrice} SAR</td>
            </tr>
            <tr>
              <td>Order Status</td>
              <td className="capitalize">
                <span
                  className="badge-status badge-status--lg"
                  style={{
                    backgroundColor: `var(--${getStatusColor(
                      order.orderStatus
                    )})`,
                  }}
                >
                  {order.orderStatus}
                </span>
              </td>
            </tr>
            <tr>
              <td>Rate</td>
              <td className="capitalize">
                <RatingStars rating={order?.rating ? order?.rating : 0} />
              </td>
            </tr>
            <tr>
              <td>Actions</td>
              <td className="flex items-center justify-evenly">
                <button onClick={() => deleteOrder(order.id)} aria-label="Edit">
                  <img src={trash} alt="trash" />
                </button>
                <NavLink to={`/orderDetails/${order.id}`} aria-label="Details">
                  <img src={ViewIcon} alt="view" />
                </NavLink>
              </td>
            </tr>
          </tbody>
        </table>
      </Collapse>
    </div>
  );
};

OrderCollapseItem.propTypes = {
  order: PropTypes.object.isRequired,
  activeCollapse: PropTypes.string.isRequired,
  handleCollapse: PropTypes.func.isRequired,
};

export default OrderCollapseItem;
