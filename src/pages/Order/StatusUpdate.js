import React, { useState } from "react";
import { statusUpdate } from "../../helpers/status";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StatusUpdate = (props) => {
  const [state, setState] = useState("");
  // const [status, setStatus] = useState("");
  // const [orderId, setOrderId] = useState();

  const { row, reload } = props;
  const ChangeState = (e, id) => {
    e.preventDefault();
    // setStatus(e.target.value);
    // setOrderId(id);
    setState(e.target.value);
    StatusUpdateFunc(e.target.value, id);
  };

  const StatusUpdateFunc = async (status, orderId) => {
    console.log("status", status);
    console.log("orderid", orderId);
    let message;
    if (status == "order_placed") {
      message = "Order Placed, Need confirmation from admin";
    } else if (status == "confirmed") {
      message = "Your order has been confirmed!";
    } else if (status == "prepared") {
      message = "Meal Prepared, Ready to delieverd!";
    } else if (status == "delivered") {
      message = "Rider picked your order!";
    } else if (status == "completed") {
      message = "Thanks for using Wegoz, Enjoy Meal!";
    }
    console.log("message", message);
    try {
      await statusUpdate({ orderId, status, message }).then((data) => {
        console.log("status page", data);
        if (data?.message) {
          toast.success("status updated", {
            autoClose: 2000,
          });
          reload();
        } else {
          toast.error("something went wrong!", {
            autoClose: 3000,
          });
        }
      });
    } catch (error) {
      toast.error(error, {
        autoClose: 3000,
      });
    }
  };
  return (
    <>
      <form>
        <div style={{ overflow: "hidden", textOverflow: "ellipses" }}>
          <select
            name="orders"
            id="orders"
            className="form-control"
            onChange={(e) => ChangeState(e, row?._id)}
          >
            <option
              value="order_placed"
              selected={row?.status === "order_placed" ? "true" : false}
              disabled={
                row?.status === "order_placed" ||
                row?.status === "confirmed" ||
                row?.status === "delivered" ||
                row?.status === "prepared"
                  ? "true"
                  : false
              }
            >
              Placed
            </option>
            <option
              value="confirmed"
              selected={row?.status === "confirmed" ? "true" : false}
              disabled={
                row?.status === "confirmed" ||
                row?.status === "delivered" ||
                row?.status === "prepared"
                  ? "true"
                  : false
              }
            >
              Confirmed
            </option>
            <option
              value="prepared"
              selected={row?.status === "prepared" ? "true" : false}
              disabled={
                row?.status === "prepared" || row?.status === "delivered"
                  ? "true"
                  : false
              }
            >
              Prepared
            </option>
            <option
              value="delivered"
              selected={row?.status === "delivered" ? "true" : false}
              disabled={row?.status === "delivered" ? "true" : false}
            >
              Delivered
            </option>
            <option
              value="completed"
              selected={row?.status === "completed" ? "true" : false}
            >
              Completed
            </option>
          </select>
        </div>
      </form>
    </>
  );
};

export default StatusUpdate;
