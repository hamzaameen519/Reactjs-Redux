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
    try {
      await statusUpdate({ orderId, status }).then((data) => {
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
            >
              Placed
            </option>
            <option
              value="confirmed"
              selected={row?.status === "confirmed" ? "true" : false}
            >
              Confirmed
            </option>
            <option
              value="prepared"
              selected={row?.status === "prepared" ? "true" : false}
            >
              Prepared
            </option>
            <option
              value="delivered"
              selected={row?.status === "delivered" ? "true" : false}
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
