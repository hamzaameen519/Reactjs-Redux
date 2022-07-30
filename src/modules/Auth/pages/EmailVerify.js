import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
const EmailVerify = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [resetEmail, setResetEmail] = useState("");
  const [load, setLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const url = "http://localhost:5000/api/email-send";
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      email: email,
    }),
  };
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const handleSubmit = async () => {
    setLoad(true);
    if (!email || regex.test(email) === false) {
      toast.error(
        "Please Enter valid email",
        {
          autoClose: 1500,
        },
        1000
      );
      // history.push("/auth/VerifyEmail");
      setLoad(false);
    } else {
      try {
        fetch(url, options)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            // dispatch(emailSend(data));
          });

        // setResetEmail("");
        toast.success("Send code Successfully in your email", {
          autoClose: 1500,
        });
        setLoad(false);
        history.push({ pathname: "/auth/ForgotPassword", state: email });
        // setTimeout(() => {}, 3000);
      } catch (error) {
        setLoad(false);
        setTimeout(() => {
          toast.error("Not found your email", {
            autoClose: 1500,
          });
        }, 1000);
        setLoad(false);
      }
      // setLoad(false);
    }
  };
  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <h4 className="my-2 py-2">Forgot Password</h4>
                <h6 className="font-weight-light">
                  Write email and verify code send your email.
                </h6>
                <form className="pt-3">
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="exampleInputEmail1"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="mt-3">
                    <button
                      type="submit"
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      onClick={() => handleSubmit()}
                    >
                      {load ? (
                        <div
                          class="spinner-border spinner-border-sm"
                          role="status"
                        ></div>
                      ) : (
                        "Send"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/*  content-wrapper ends  */}
      </div>
      ;{/* <!-- page-body-wrapper ends --> */}
    </div>
  );
};

export default EmailVerify;
