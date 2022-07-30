import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import { getChallenges } from "../../helpers/challenges";
import SplashScreen from "../../modules/Partials/SplashScreen";
import { customStyles } from "../../modules/styles/customStyles";
import CreateChallenges from "./CreateChallenges";
import DeleteChallenges from "./DeleteChallenges";

import ValidOrderDate from "./ValidOrderDate";
// import "./Challenges.css";
const Challenges = () => {
  const [seaching, setSearching] = useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [offset, setOffset] = React.useState(0);
  const [limit, setLimit] = React.useState(10);
  const [onButtonChange, setOnButtonChange] = useState("");
  const [newChallenge, setNewChallenge] = useState(false);
  const [Row, setRow] = useState({});
  const [newEmp, setNewEmp] = useState(false);
  const [title, setTitle] = useState("");
  const [validDate, setValiDate] = useState("");
  const [challengesData, setChallengesData] = useState([]);
  const [nOfOrder, setNOfOrder] = useState("");
  const [pointsEarned, setPointsEarned] = useState("");
  const [shortDes, setShortDes] = useState("");
  // const [tableRowsData, setTableRowsData] = useState();
  const [search, setSearch] = useState([]);
  // const [Row, setRow] = React.useState({});
  const [deleteShow, setDeleteShow] = React.useState(false);
  console.log("title....", challengesData);
  useEffect(() => {
    getChallengesData();
  }, []);
  // useEffect(() => {}, [challengesData]);
  const getChallengesData = async () => {
    // setIsLoading(true);
    try {
      await getChallenges().then((data) => {
        console.log("Challenges datat", data);
        setChallengesData(data);
        setSearch(data);
      });
    } catch (error) {
      toast.error(error, {
        autoClose: 3000,
      });
    }
  };
  // console.log("getchallenges", getChallengesData);
  const data = [
    {
      // _id: `${orders?._id}`,
      // name: `${orders?.name}`,
      // categroyName: `${orders?.categoryId?.name}`,
      // size: `${orders?.size}`,
      // price: `${orders?.pirce}`,
    },
  ];
  const columns = [
    {
      name: "#",
      selector: "#",
      sortable: true,
      width: "50px",
      cell: (row, index) => <p>{index + 1}</p>,
    },
    {
      name: <div>Title</div>,
      selector: "title",
      sortable: true,
      width: "220px",
      //   cell: (row, index) => <p>{row?.customerId?._id}</p>,
      // cell: (row, index) => <p>Hello</p>,
    },
    {
      name: "Points Earned",
      selector: "pointsEarned",
      sortable: true,
      width: "220px",
      //   cell: (row, index) => <p>{row?.customerId?._id}</p>,
      // cell: (row, index) => <p>Hello</p>,
    },
    {
      name: "Valid Date",
      selector: "validDate",
      sortable: true,
      width: "220px",
      //   cell: (row, index) => <p>{row?.customerId?._id}</p>,
      // cell: (row, index) => <ValidOrderDate />,
    },
    {
      name: "Order#",
      selector: "nOfOrder",
      sortable: true,
      width: "220px",
      //   cell: (row, index) => <p>{row?.customerId?._id}</p>,
      // cell: (row) => <p>Hello</p>,
    },
    {
      name: "ShortDes",
      selector: "shortDes",
      sortable: true,
      width: "220px",
      //   cell: (row, index) => <p>{row?.customerId?._id}</p>,
      // cell: (row, index) => <p>Hello</p>,
    },
    {
      name: "Description",
      selector: "desc",
      sortable: true,
      width: "220px",
      //   cell: (row, index) => <p>{row?.customerId?._id}</p>,
      // cell: (row, index) => <p>Hello</p>,
    },
    {
      name: "Action",
      selector: "",
      sortable: true,
      width: "220px",
      //   cell: (row, index) => <p>{row?.customerId?._id}</p>,
      cell: (row, index) => {
        return (
          <button
            type="button"
            class="btn btn-inverse-danger btn-icon mr-2"
            onClick={() => handleDeleteShow(row)}
          >
            <i class="ti-trash"></i>
          </button>
        );
      },
    },
  ];
  const handleShow = () => {
    setOnButtonChange("Add");
    setNewChallenge(true);
  };
  const handleClose = () => setNewChallenge(false);
  const reloadData = () => {
    getChallengesData();
  };
  const handleDeleteShow = (row) => {
    setDeleteShow(true);
    setRow(row);
  };
  const onDeleteHide = () => {
    setDeleteShow(false);
  };
  const onChange = async (e) => {
    setSearching(e.target.value);
    if (e.target.value === "") {
      setChallengesData(search);
    } else {
    }
    console.log("search", search);

    var searchData = challengesData.filter((item) => {
      if (
        item.title
          .toString()
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      ) {
        return item;
      }
    });
    console.log("searchData", searchData);
    setChallengesData(searchData);
  };
  const handleRemoveFilter = () => {
    setSearching("");
    getChallengesData();
  };

  return (
    <div className="container">
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
              <h3 className="font-weight-bold">Challenges</h3>
              <h6 className="font-weight-normal mb-0">
                All Challenges available here
              </h6>
            </div>
            <div className="col-12 col-xl-4 col-md-4 mb-4 mb-xl-0">
              <button
                type="button"
                class="btn btn-primary"
                style={{ float: "right", margin: "0 0 20px 0" }}
                onClick={() => handleShow()}
              >
                Add Challenges
              </button>
            </div>
            <div className="col-12 col-xl-8 col-md-8 mb-4 mb-xl-0"></div>
            <div className="col-12 col-xl-4 col-md-4 mb-4 mb-xl-0">
              <div className="row">
                <div className="col-8 input-container">
                  <div className="form-group">
                    <input
                      className="form-control form-control-sm"
                      placeholder="Search title "
                      onChange={(e) => onChange(e)}
                      value={seaching}
                      // type={passwordShown ? "text" : "password"}
                      // onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      className="fas fa-times fa-1x field-icon  px-3 "
                      onClick={() => handleRemoveFilter()}
                    ></span>
                  </div>
                </div>
                <div className="col-4 ">
                  {/* <i
                    class="fas fa-times"
                    onClick={() => handleRemoveFilter()}
                    style={{ position: "relative" }}
                  ></i> */}
                </div>
              </div>
            </div>
            {/* <div className="col-12 col-xl-8 col-md-8 mb-4 mb-xl-0 mt-3">
              <div className="row">
                <div className="col-8">
                  <input
                    type="text"
                    onChange={(e) => onChange(e)}
                    style={{
                      width: "100%",
                      border: "none",
                      outline: "none",
                      borderBottom: "1px solid blue",
                     
                    }}
                    placeholder="Search title "
                  />
                </div>
                <div className="col-4 ">
                  <i
                    class="fas fa-times"
                    onClick={() => handleRemoveFilter()}
                  ></i>
                </div>
              </div>
            </div> */}
            {/* </Link> */}
          </div>

          <div>
            <DataTable
              paginationDefaultPage={offset === 0 ? 1 : offset}
              columns={columns}
              data={challengesData}
              customStyles={customStyles}
              pagination
              fixedHeader
              paginationServer
              paginationComponentOptions={{
                noRowsPerPage: 10,
              }}
              // onChangePage={(page) => setOffset(page)}
              // paginationTotalRows={totalOrders}
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

          {/* <Edit Row={Row} show={editShow} handleClose={onEditHide} /> */}
          <DeleteChallenges
            Row={Row}
            show={deleteShow}
            handleClose={onDeleteHide}
            reload={reloadData}
          />
          <CreateChallenges
            Row={onButtonChange === "Add" ? null : Row}
            newChallenge={newChallenge}
            handleClose={handleClose}
            // onButtonChange={onButtonChange}
            reload={reloadData}
          />
        </div>
      </div>
    </div>
  );
};

export default Challenges;
