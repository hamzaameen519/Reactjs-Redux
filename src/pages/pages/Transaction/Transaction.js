import React from "react";

const Transaction = () => {
  return (
    <>
      <div className="content-wrapper">
        <div className="row">
          <div className="col-12 col-xl-8 col-md-8 mb-4 mb-xl-0">
            <h3 className="font-weight-bold">Transactions</h3>
            <h6 className="font-weight-normal mb-0">
              All Transaction history available here
            </h6>
          </div>
          <div className="col-12 col-xl-4 col-md-4  mb-4 mb-xl-0">
            <button
              type="button"
              class="btn btn-primary"
              style={{ float: "right", margin: "0 0 20px 0" }}
              // onClick={() => handleAddShow()}
            >
              Add Transaction
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transaction;
