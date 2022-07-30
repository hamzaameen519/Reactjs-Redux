import React from "react";

const OrderNumber = () => {
  return (
    <div>
      <select
        name="orders"
        id="orders"
        className="form-control"
        // onChange={(e) => ChangeState(e, row?._id)}
      >
        <option
          value="noOfOrder"
          //   selected={row?.status === "order_placed" ? "true" : false}
        >
          No of Order
        </option>
      </select>
    </div>
  );
};

export default OrderNumber;
