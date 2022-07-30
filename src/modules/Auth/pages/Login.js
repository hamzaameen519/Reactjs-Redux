import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import {
  loginPending,
  loginFail,
  loginSuccess,
  emailSend,
} from "../../../reducers/authReducer";
import { Link, useHistory } from "react-router-dom";
import { Button, ButtonGroup, textDecoration } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login, authenticate } from "../../../helpers/auth";
import { Spinner } from "@chakra-ui/react";
import { disabled } from "express/lib/application";
// import { Link } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import { baseUrl } from "../../../config/baseUrl";
toast.configure();

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [passwordShown, setPasswordShown] = useState(false);
  const [password, setPassword] = useState();
  const [forgot, setForgot] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(loginPending());

    console.log("email ", email, " password: ", password);

    try {
      // setValues({ ...values, error: false, loading: true });
      login({ email, password }).then((data) => {
        if (data?.message === "success") {
          authenticate(data, () => {
            setTimeout(() => {
              dispatch(loginSuccess({ data }));
              setLoading(false);
              toast.success("Login Successfully!", {
                autoClose: 1000,
              });
            }, 1000);
          });
        } else {
          const error = data?.message;
          setTimeout(() => {
            dispatch(loginFail({ error }));
            setLoading(false);
            toast.error(error, {
              autoClose: 1500,
            });
          }, 1000);
        }
      });
    } catch (error) {
      console.log("login page catch error", error);
      toast.error(error, {
        autoClose: 1500,
      });
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div className="content-wrapper d-flex align-items-center auth px-0">
            <div className="row w-100 mx-0">
              <div className="col-lg-4 mx-auto">
                <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                  <div className="brand-logo">
                    {/* <img src="/assets/images/logo2.png" alt="logo" /> */}
                    <h3>Wegoz</h3>
                  </div>
                  <h4>Hello! let's get started</h4>
                  <h6 className="font-weight-light">Sign in to continue.</h6>
                  <form className="pt-3">
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        id="exampleInputEmail1"
                        placeholder="Enter Email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control form-control-lg"
                        id="exampleInputPassword1"
                        placeholder="Password"
                        type={passwordShown ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {passwordShown ? (
                        <span
                          toggle="#password-field"
                          class="fa fa-fw fa-eye field-icon toggle-password mx-4"
                          aria-hidden="false"
                          onClick={togglePassword}
                        ></span>
                      ) : (
                        <span
                          toggle="#password-field"
                          class="fa fa-eye-slash field-icon toggle-password mx-4"
                          aria-hidden="true"
                          onClick={togglePassword}
                        ></span>
                      )}
                    </div>
                    {/* <h6
                      className="font-weight-light text-success"
                      style={{ cursor: "pointer", textDecoration: "none" }}
                    >
                      <Link
                        to="/auth/VerifyEmail"
                        style={{ cursor: "pointer", textDecoration: "none" }}
                      >
                        Forgot Password.
                      </Link>
                    </h6> */}
                    {/* <div
                      class="modal fade"
                      id="exampleModal"
                      tabindex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                              Send Otp on your email
                            </h5>
                            <button
                              type="button"
                              class="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">
                            <div className="container">
                              <div className="row">
                                <div className="col-sm-12 col-12 col-lg-12">
                                  <label
                                    style={{
                                      fontFamily: "BhuTuka Expanded One",
                                    }}
                                  >
                                    Email
                                  </label>
                                </div>
                                <div className="col-sm-12 col-12 col-lg-12 mt-2">
                                  <input
                                    placeholder="Enter email here..."
                                    type="email"
                                    pattern="[^ @]*@[^ @]*"
                                    className="bg bg-light text-dark w-75"
                                    style={{
                                      outline: "none",
                                      border: "none",
                                      borderBottom: "1px solid blue",
                                    }}
                                    onChange={(e) =>
                                      setResetEmail(e.target.value)
                                    }
                                    value={resetEmail}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="button"
                              class="btn btn-primary"
                              onClick={() => handleForgot()}
                            >
                              {load ? (
                                <div
                                  class="spinner-border spinner-border-sm"
                                  role="status"
                                ></div>
                              ) : (
                                ""
                              )}
                              Send
                            </button>
                          </div>
                        </div>
                      </div>
                    </div> */}
                    <div className="mt-3">
                      <button
                        type="submit"
                        className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                        onClick={(e) => handleSubmit(e)}
                        disabled={loading ? "true" : null}
                      >
                        {loading ? (
                          <div
                            class="spinner-border spinner-border-sm"
                            role="status"
                          ></div>
                        ) : (
                          "SIGN IN"
                        )}
                      </button>
                    </div>
                    {/* <div className="my-2 d-flex justify-content-between align-items-center">
                   <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        Keep me signed in
                      </label>
                    </div> 
                    <Link
                      to="/auth/forgot-password"
                      className="auth-link text-black"
                    >
                      Forgot password?
                    </Link>
                  </div> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/*  content-wrapper ends  */}
        </div>
        ;{/* <!-- page-body-wrapper ends --> */}
      </div>
    </>
  );
};

export default Login;
