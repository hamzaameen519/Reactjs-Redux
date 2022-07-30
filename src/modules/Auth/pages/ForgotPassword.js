import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import OTPInput, { ResendOTP } from "otp-input-react";
import { useHistory } from "react-router-dom";
const ForgotPassword = (props) => {
  console.log("props", props.location.state);
  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  useEffect(() => {
    setEmail(props.location.state);
  }, []);
  const url = "http://localhost:5000/api/code-verify";
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      email: email,
      code: OTP,
    }),
  };
  const Handle = () => {
    console.log("hello");
    setLoading(true);
    try {
      // setLoad(true);
      fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
          console.log("data", data);
          if (!data == "") {
            toast.success(
              "Code verify",
              {
                autoClose: 1500,
              },
              1000
            );
            history.push({
              pathname: "/auth/ChangePassword",
              state: { email, OTP },
            });
          } else {
            setTimeout(() => {
              toast.error("Incorrect Password", {
                autoClose: 1500,
              });
            }, 1000);
          }
          setLoading(false);
        });

      // setForgot(true);
      // setLoad(false);
      // setResetEmail("");
    } catch (error) {
      // console.log("error", error);
      // setLoad(false);
      setTimeout(() => {
        toast.error("Code error", {
          autoClose: 1500,
        });
      }, 1000);
      setLoading(false);
    }
  };
  const renderButton = (buttonProps) => {
    return (
      <button {...buttonProps} className="btn btn-outline-light text-dark">
        Resend
      </button>
    );
  };
  const renderTime = (remainingTime) => {
    return <span>{remainingTime} seconds remaining</span>;
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
                    <img src="/assets/images/logo2.png" alt="logo" />
                  </div>
                  <h4>Hello! let's get started</h4>
                  <h6 className="font-weight-light">Sign in to continue.</h6>
                  <form className="pt-3">
                    <div className="form-group">
                      <OTPInput
                        value={OTP}
                        onChange={setOTP}
                        autoFocus
                        OTPLength={4}
                        otpType="number"
                        disabled={false}
                        secure={false}
                      />
                    </div>

                    <div className="mt-3">
                      <button
                        type="submit"
                        className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                        onClick={() => Handle()}
                        // onClick={(e) => handleSubmit(e)}
                        disabled={loading ? "true" : null}
                      >
                        {loading ? (
                          <div
                            class="spinner-border spinner-border-sm"
                            role="status"
                          ></div>
                        ) : (
                          "OTP Verify"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
