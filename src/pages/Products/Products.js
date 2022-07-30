import React, { useState, useEffect } from "react";
// import Table from "../../modules/Partials/DataTables";
import SplashScreen from "../../modules/Partials/SplashScreen";
import { Link } from "react-router-dom";
import { customStyles } from "../../modules/styles/customStyles";
import DataTable from "react-data-table-component";
import CreateFile from "./CreateFile";
import Delete from "./Delete";
import { data } from "./Data";
import { getProduct } from "../../helpers/product";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../config/baseUrl";
toast.configure();

const Products = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [totalProducts, setTotalProducts] = React.useState(82);
  const [isDataLoading, setIsDataLoading] = React.useState(false);
  const [offset, setOffset] = React.useState(0);
  const [limit, setLimit] = React.useState(10);
  const [rowId, setRowId] = React.useState("");
  const [newProduct, setNewProduct] = useState(false);
  const [onButtonChange, setOnButtonChange] = useState("");
  const [challengesData, setChallengesData] = useState([]);
  const [seaching, setSearching] = useState("");
  const [search, setSearch] = useState([]);
  // edit or delete
  const [editShow, setEditShow] = React.useState(false);
  const [deleteShow, setDeleteShow] = React.useState(false);
  const [addShow, setAddShow] = React.useState(false);
  const [Row, setRow] = React.useState({});

  useEffect(() => {
    GetAllProducts();
  }, []);
  const GetAllProducts = async () => {
    setIsLoading(true);
    try {
      await getProduct().then((data) => {
        console.log("dataddddd", data);
        if (data) {
          setProducts(data);
          setSearch(data);
          setIsLoading(false);
          // setProducts(data?.length);
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

  const handleClose = () => setNewProduct(false);
  const handleShow = (row) => {
    setOnButtonChange("Add");
    setNewProduct(true);
    console.log("vlir");
  };

  const handleEditShow = (row) => {
    setOnButtonChange("Edit");
    setNewProduct(true);
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
    GetAllProducts();
  };

  const onChange = async (e) => {
    setSearching(e.target.value);
    if (e.target.value === "") {
      setProducts(search);
    } else {
    }
    console.log("search", search);

    var searchData = search.filter((item) => {
      if (
        item.name
          .toString()
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      ) {
        return item;
      }
    });
    console.log("searchData", searchData);
    setProducts(searchData);
  };
  const handleRemoveFilter = () => {
    setSearching("");
    GetAllProducts();
  };

  // const entities = data;

  const columns = [
    {
      name: "#",
      selector: "",
      sortable: true,
      width: "50px",
      cell: (row, index) => <p>{index + 1}</p>,
    },
    {
      name: "Product Image",
      selector: "image",
      sortable: true,
      cell: (row) => (
        <div style={{ overflow: "hidden", textOverflow: "ellipses" }}>
          <img
            src={row?.image}
            height={40}
            width={40}
            style={{ borderRadius: "40px" }}
          />
        </div>
      ),
    },
    {
      name: "Product Name",
      selector: "name",
      sortable: true,
      cell: (row) => (
        <div style={{ overflow: "hidden", textOverflow: "ellipses" }}>
          {row.name}
        </div>
      ),
    },
    {
      name: "Category Name",
      selector: "name",
      sortable: true,
      cell: (row) => (
        <div style={{ overflow: "hidden", textOverflow: "ellipses" }}>
          {row?.categoryId?.name}
        </div>
      ),
    },
    {
      name: "Price",
      selector: "price",
      sortable: true,
      width: "100px",
    },

    {
      name: "Size",
      selector: "size",
      sortable: true,
      width: "100px",
    },

    {
      name: "Actions",
      selector: "edit",
      cell: (row) => {
        return (
          <>
            <button
              type="button"
              class="btn btn-inverse-info btn-icon mr-2"
              onClick={() => handleEditShow(row)}
            >
              <i class="ti-pencil"></i>
            </button>

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
    <div className="content-wrapper ">
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
              <h3 className="font-weight-bold">Products</h3>
              <h6 className="font-weight-normal mb-0">
                All Products available here
              </h6>
            </div>
            <div className="col-12 col-xl-4 col-md-4 mb-4 mb-xl-0">
              <button
                type="button"
                class="btn btn-primary"
                style={{ float: "right", margin: "0 0 20px 0" }}
                onClick={() => handleShow()}
              >
                Add Product
              </button>
            </div>
            <div className="col-12 col-xl-8 col-md-8 mb-4 mb-xl-0"></div>
            <div className="col-12 col-xl-4 col-md-4 mb-4 mb-xl-0">
              <div className="row">
                <div className="col-12 input-container">
                  <div className="form-group">
                    <input
                      className="form-control form-control-sm"
                      placeholder="Search product by name "
                      onChange={(e) => onChange(e)}
                      value={seaching}
                    />
                    <span
                      className="fas fa-times fa-1x field-icon  px-3 "
                      onClick={() => handleRemoveFilter()}
                    ></span>
                  </div>
                </div>
              </div>
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
                data={products}
                customStyles={customStyles}
                pagination
                fixedHeader
                paginationServer
                paginationComponentOptions={{
                  noRowsPerPage: 5,
                }}
                onChangePage={(page) => setOffset(page)}
                paginationTotalRows={totalProducts}
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
          <CreateFile
            Row={onButtonChange === "Add" ? null : Row}
            newProduct={newProduct}
            handleClose={handleClose}
            onButtonChange={onButtonChange}
            reload={reloadData}
          />

          <Delete
            Row={Row}
            show={deleteShow}
            handleClose={onDeleteHide}
            reload={reloadData}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
