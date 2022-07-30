import React, { useState, useEffect } from "react";
// import Table from "../../modules/Partials/DataTables";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import "./Profile.css";

import ProfileUpdate from "./ProfileUpdate";
import SplashScreen from "../../modules/Partials/SplashScreen";
import { me } from "../../helpers/auth";
import { isMeAuth } from "../../reducers/authReducer";
toast.configure();

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: false,
  });
  const [newEdit, setNewEdit] = useState(false);
  const handleClose = () => setNewEdit(false);
  const handleShowName = () => {
    setData({ name: user?.name, email: "", password: false });
    setNewEdit(true);
    console.log("user data in redux", user);
    console.log("data in prodile", data);
  };
  const handleMe = () => {
    setLoading(true);
    try {
      me().then((data) => {
        if (data?._id) {
          dispatch(isMeAuth({ data }));
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
    } catch (error) {
      console.log("login page catch error", error);
    }
  };

  const handleShowEmail = () => {
    setNewEdit(true);
    setData({ name: "", email: user?.email, password: false });
  };
  const handleShowPassword = () => {
    setNewEdit(true);
    setData({ name: "", email: "", password: true });
  };

  if (loading) {
    return <SplashScreen />;
  }
  return (
    <>
      <div className="content-wrapper">
        {/*<div className="row" style={{ marginTop: "10px" }}>
          <div className="col-12 col-xl-8 col-md-8 mb-4 mb-xl-0 ">
            <h3 className="font-weight-bold">Profile</h3>
            <h6 className="font-weight-normal mb-0">Profile Change Easily</h6>
          </div>
        </div>*/}

        <div className="card">
          <div className="card-body">
            <div
              class="row "
              style={{
                border: "2px solid #ffff",
                borderRadius: "10px",
              }}
            >
              <div class="col-md-4 border-right ">
                <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                  <img
                    class="rounded-circle mt-5"
                    width="150px"
                    src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                  />
                  <span class="font-weight-bold">{user?.name}</span>
                  <span class="text-black-50">{user?.email}</span>
                  <span> </span>
                </div>
              </div>

              <div class="col-md-8  grid-margin stretch-card mt-4  ">
                <div class="p-3 " style={{ width: "100%" }}>
                  <div class="d-flex justify-content-between align-items-center mb-4">
                    <h4 class="card-title"> Update Password</h4>
                  </div>
                  <div
                    className="card border px-4 pb-3  mt-3"
                    mt-3
                    style={{
                      boxShadow: "4px 4px 4px 4px white",
                    }}
                  >
                    <div
                      class="row"
                      style={{
                        borderRadius: "10px",
                      }}
                    >
                      <div class="col-md-11 col-sm-11 col-10">
                        <label class="labels mt-3">Name</label>
                        <h4>{user?.name}</h4>
                      </div>
                      <div class="col-md-1 col-sm-1 col-2 mt-1">
                        <i
                          class="ti-pencil update"
                          onClick={() => handleShowName()}
                        ></i>{" "}
                      </div>
                    </div>
                  </div>
                  <div
                    className="card border px-4 pb-3  mt-3"
                    mt-3
                    style={{
                      boxShadow: "4px 4px 4px 4px white",
                    }}
                  >
                    <div
                      class="row"
                      style={{
                        borderRadius: "10px",
                      }}
                    >
                      <div class="col-md-11 col-sm-11 col-10">
                        <label class="labels mt-3">Email</label>
                        <h4>{user?.email}</h4>
                      </div>
                      <div class="col-md-1 col-sm-1 col-2 mt-1">
                        <i
                          class="ti-pencil update"
                          onClick={() => handleShowEmail()}
                        ></i>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card border px-4 pb-3  mt-3"
                    style={{
                      boxShadow: "4px 4px 4px 4px white",
                    }}
                  >
                    <div
                      class="row"
                      style={{
                        borderRadius: "10px",
                      }}
                    >
                      <div class="col-md-11 col-sm-11 col-10">
                        <label class="labels mt-3">Password</label>
                        <h4>********</h4>
                      </div>
                      <div class="col-md-1 col-sm-1 col-2 mt-1">
                        <i
                          class="ti-pencil update"
                          onClick={() => handleShowPassword()}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProfileUpdate
          data={data}
          newEdit={newEdit}
          handleClose={handleClose}
          reload={handleMe}
        />
      </div>
    </>
  );
};

export default Profile;
