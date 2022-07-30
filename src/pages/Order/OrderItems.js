import React from "react";

const OrderItems = (props) => {
  const { row } = props;
  //   const { data } = row?.items;
  console.log("dataOrder...", row);
  return (
    <>
      {/*  {row?.items.map((item, i) => (
        <p>{item?.name}</p>
      ))} 
      {row?.items.forEach((product) => {
        <p>{product?.name} </p>;
      })}
      */}
    </>
  );
};

export default OrderItems;
