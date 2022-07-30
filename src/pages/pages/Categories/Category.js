import React, { useState, useEffect } from "react";
import SplashScreen from "../../modules/Partials/SplashScreen";
import { Link } from "react-router-dom";
import { customStyles } from "../../modules/styles/customStyles";
import DataTable from "react-data-table-component";
import Delete from "./Delete";
import CreateTable from "./createTable";
// import { data } from "./Data";
import { getCategory } from "../../helpers/category";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../config/baseUrl";
toast.configure();

const Category = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [totalCategories, setTotalCategories] = useState(82);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [rowId, setRowId] = useState("");
  // edit or delete
  const [editShow, setEditShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [onButtonChange, setOnButtonChange] = useState("");
  const [newEmp, setNewEmp] = useState(false);
  const [Row, setRow] = useState({});

  useEffect(() => {
    GetAllCategories();
  }, []);
  const GetAllCategories = async () => {
    setIsLoading(true);
    try {
      await getCategory().then((data) => {
        console.log("dataddddd", data);
        if (data) {
          setCategories(data);
          setIsLoading(false);
          setTotalCategories(data?.length);
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

  const handleClose = () => setNewEmp(false);
  const handleShow = () => {
    setOnButtonChange("Add");
    setNewEmp(true);
  };

  const handleEditShow = (row) => {
    setOnButtonChange("Edit");
    setNewEmp(true);
    setRow(row);
  };

  const handleDeleteShow = (row) => {
    setDeleteShow(true);
    setRow(row);
  };

  const onDeleteHide = () => {
    setDeleteShow(false);
  };

  const reloadData = () => {
    GetAllCategories();
  };

  const columns = [
    {
      name: "#",
      selector: "#",
      sortable: true,
      width: "50px",
      cell: (row, index) => <p>{index + 1}</p>,
    },
    {
      name: "Category Image",
      selector: "categoryImage",
      sortable: true,
      cell: (row) => (
        <div style={{ overflow: "hidden", textOverflow: "ellipses" }}>
          <img
            src={`${row?.categoryImage}`}
            height={40}
            width={40}
            style={{ borderRadius: "40px" }}
          />
        </div>
      ),
    },
    {
      name: "Category Name",
      selector: "name",
      sortable: true,
      cell: (row) => (
        <div style={{ overflow: "hidden", textOverflow: "ellipses" }}>
          {row?.name}
        </div>
      ),
    },

    {
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
                <i class="ti-pencil mr-2"></i>
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
  ];

  return (
    <>
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
                <h3 className="font-weight-bold">Categories</h3>
                <h6 className="font-weight-normal mb-0">
                  All categories available here
                </h6>
              </div>
              <div className="col-12 col-xl-4 col-md-4 mb-4 mb-xl-0">
                <button
                  type="button"
                  class="btn btn-primary"
                  style={{ float: "right", margin: "0 0 20px 0" }}
                  onClick={() => handleShow()}
                >
                  Add Category
                </button>
              </div>
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
                  data={categories}
                  customStyles={customStyles}
                  pagination
                  fixedHeader
                  paginationServer
                  paginationComponentOptions={{
                    noRowsPerPage: 10,
                  }}
                  onChangePage={(page) => setOffset(page)}
                  paginationTotalRows={totalCategories}
                  // expandableRows
                  // onRowExpandToggled={(bol, row) => viewManageData(row)}
                  expandableRowExpanded={(row) => row._id === rowId}
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
            <Delete
              Row={Row}
              show={deleteShow}
              handleClose={onDeleteHide}
              reload={reloadData}
            />
            <CreateTable
              Row={onButtonChange === "Add" ? null : Row}
              newEmp={newEmp}
              handleClose={handleClose}
              onButtonChange={onButtonChange}
              reload={reloadData}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
