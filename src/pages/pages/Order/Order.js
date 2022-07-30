import React, { useState } from "react";
// import Table from "../../modules/Partials/DataTables";
import SplashScreen from "../../modules/Partials/SplashScreen";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { customStyles } from "../../modules/styles/customStyles";
import DataTable from "react-data-table-component";
import Edit from "./Edit";
import moment from "moment";
import Delete from "./Delete";
import { toggleChatButton } from "../../reducers/authReducer";
import { data } from "../Products/Data";
import { getOrder } from "../../helpers/order";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../config/baseUrl";
import StatusUpdate from "./StatusUpdate";
import OrderItems from "./OrderItems";
toast.configure();

const Order = () => {
  const dispatch = useDispatch();
  const [hide, setHide] = useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [orders, setOrders] = React.useState([]);
  const [totalOrders, setTotalOrders] = React.useState(82);
  const [isDataLoading, setIsDataLoading] = React.useState(false);
  const [offset, setOffset] = React.useState(0);
  const [limit, setLimit] = React.useState(10);
  const [rowId, setRowId] = React.useState("");
  // edit or delete
  const [editShow, setEditShow] = React.useState(false);
  const [deleteShow, setDeleteShow] = React.useState(false);
  const [addShow, setAddShow] = React.useState(false);
  const [addOrder, setAddOrder] = React.useState(false);
  const [Row, setRow] = React.useState({});

  React.useEffect(() => {
    GetAllOrders();
  }, []);
  const GetAllOrders = async () => {
    setIsLoading(true);
    try {
      await getOrder().then((data) => {
        console.log("dataddddd", data);
        if (data) {
          setOrders(data);
          setIsLoading(false);
          setTotalOrders(data?.length);
        } else {
          setIsLoading(false);
        }
      });
    } catch (error) {
      toast.error(error, {
        autoClose: 3000,
      });
    }
  };

  const handleAddShow = () => {
    setAddOrder(true);
  };
  const handleEditShow = (row) => {
    setEditShow(true);
    setRow(row);
    // console.log("set", row);
  };
  const handleDeleteShow = (row) => {
    setDeleteShow(true);
    setRow(row);
  };
  const onAddHide = () => {
    setAddShow(false);
  };
  const onEditHide = () => {
    setEditShow(false);
  };

  const onDeleteHide = () => {
    setDeleteShow(false);
  };

  const reload = () => {
    GetAllOrders();
  };
  const handleAddOrder = () => {
    setAddOrder(true);
  };
  const data = [
    {
      _id: `${orders?._id}`,
      name: `${orders?.name}`,
      categroyName: `${orders?.categoryId?.name}`,
      size: `${orders?.size}`,
      price: `${orders?.pirce}`,
    },
  ];
  // const entities = data;

  const columns = [
    {
      name: "#",
      selector: "#",
      sortable: true,
      width: "50px",
      cell: (row, index) => <p>{index + 1}</p>,
    },
    {
      name: "Order Id",
      selector: "_id",
      sortable: true,
      width: "220px",
      //   cell: (row, index) => <p>{row?.customerId?._id}</p>,
    },
    {
      name: "Customer",
      selector: "_id",
      sortable: true,
      width: "120px",
      cell: (row, index) => <p>{row?.customerId?.name}</p>,
    },
    {
      name: "Order",
      selector: "items",
      sortable: true,
      width: "120px",
      cell: (row, index) => (
        <div style={{ overflow: "hidden", textOverflow: "ellipses" }}>
          {row?.items?.length > 0 ? (
            <>
              <ol>
                {row?.items?.map((item, index) => (
                  <li>{item?.name}</li>
                ))}
              </ol>
            </>
          ) : (
            "-"
          )}
        </div>
      ),
    },

    {
      name: "Qty",
      selector: "totalQty",
      sortable: true,
      width: "70px",
      //   cell: (row) => (
      //     <div style={{ overflow: "hidden", textOverflow: "ellipses" }}>
      //       {row?.totalqty}
      //     </div>
      //   ),
    },
    {
      name: "Price",
      selector: "totalPrice",
      sortable: true,
      width: "70px",
    },

    {
      name: "Placed At",
      selector: "createdAt",
      sortable: true,
      width: "140px",
      cell: (row) => (
        <div style={{ overflow: "hidden", textOverflow: "ellipses" }}>
          {moment(row?.createdAt).format("lll")}
        </div>
      ),
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
      width: "100px",
      cell: (row) => (
        <span
          class={`badge  ${
            row?.status === "order_placed"
              ? "badge-danger"
              : row?.status === "confirmed"
              ? "badge-warning"
              : row?.status === "prepared"
              ? "badge-info"
              : row?.status === "delivered"
              ? "badge-success"
              : ""
          }`}
          style={{ textTransform: "capitalize" }}
        >
          {row?.status === "order_placed" ? "order placed" : row?.status}
        </span>
      ),
    },
    {
      name: "Update Status",
      selector: "status",
      sortable: true,
      width: "150px",
      cell: (row) => <StatusUpdate row={row} reload={reload} />,
    },
    {
      name: "Chat from Customeer",
      selector: "",
      sortable: true,
      width: "120px",
      cell: (row, index) => {
        return (
          <>
            <button
              class="btn btn-primary btn-sm"
              onClick={() => toggleFun(row._id)}
            >
              Chat
            </button>
          </>
        );
      },
    },

    {
      /*{
      name: "Actions",
      selector: "edit",
      cell: (row) => {
        return (
          <>
            <Link to="#">
              <button
                type="button"
                class="btn btn-inverse-info btn-icon mr-2"
                onClick={() => handleEditShow(row)}
              >
                <i class="ti-pencil"></i>
              </button>
            </Link>
            <button
              type="button"
              class="btn btn-inverse-danger btn-icon mr-2"
              onClick={() => handleDeleteShow(row)}
            >
              <i class="ti-trash"></i>
            </button>
          </>
        );
      },
    },
  */
    },
  ];
  const toggleFun = (id) => {
    console.log("chat Id", id);
    // setHide(!hide);
    dispatch(toggleChatButton({ hide, id }));
  };
  return (
    <div className="content-wrapper">
      <div className="card">
        <div className="card-body">
          <div
            class="row "
            style={{
              border: "2px solid #ffff",
              borderRadius: "10px",
            }}
          >
            <div className="col-12 col-xl-8 col-md-8 mb-4 mb-xl-0">
              <h3 className="font-weight-bold">Orders</h3>
              <h6 className="font-weight-normal mb-0">
                All Orders available here
              </h6>
            </div>
            {/* <div className="col-12 col-xl-4 col-md-4 mb-4 mb-xl-0">
              <button
                type="button"
                class="btn btn-primary"
                style={{ float: "right", margin: "0 0 20px 0" }}
                onClick={() => handleAddShow()}
              >
                Add Order
              </button>
            </div>*/}
            {/* </Link> */}
          </div>
          {isLoading ? (
            <center>
              <SplashScreen />
            </center>
          ) : (
            <div>
              <DataTable
                paginationDefaultPage={offset === 0 ? 1 : offset}
                columns={columns}
                data={orders}
                customStyles={customStyles}
                pagination
                fixedHeader
                paginationServer
                paginationComponentOptions={{
                  noRowsPerPage: 10,
                }}
                onChangePage={(page) => setOffset(page)}
                paginationTotalRows={totalOrders}
                // expandableRows
                // onRowExpandToggled={(bol, row) => viewManageData(row)}
                // expandableRowExpanded={(row) => row._id === rowId}
                // expandableRowsComponent={
                //   <ViewManage
                //     manageData={manageData}
                //     organizationData={organizationData}
                //     manageLoading={manageLoading}
                //   />
                // }
              />
            </div>
          )}

          <Edit Row={Row} show={editShow} handleClose={onEditHide} />
          <Delete Row={Row} show={deleteShow} handleClose={onDeleteHide} />
        </div>
      </div>
    </div>
  );
};

export default Order;
