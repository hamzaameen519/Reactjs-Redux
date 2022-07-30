import axios from "axios";
import React, { useState } from "react";
import { Modal, ModalBody } from "react-bootstrap";
import { toast } from "react-toastify";
import { baseUrl } from "../../config/baseUrl";

const CreateChallenges = (props) => {
  const [title, setTitle] = useState("");
  const [validDate, setValiDate] = useState(0);
  const [nOfOrder, setNOfOrder] = useState("");
  const [pointsEarned, setPointsEarned] = useState("");
  const [shortDes, setShortDes] = useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [desc, setDesc] = useState("");
  // console.log("ChallengesAdd", props);
  const { onButtonChange, newChallenge, handleClose, reload } = props;
  console.log("reload", reload);
  console.log("validDate", validDate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const current = new Date();
    // console.log("today", today);
    const startDate = current.toDateString();
    console.log("date", startDate);
    // console.log("date", datetoday);
    const num = Number(validDate);
    current.setDate(current.getDate() + num);
    const endDate = current.toDateString();
    console.log("expiry", endDate);
    // console.log("expiry", expiry);
    // console.log("expiry", expiry);
    const body = {
      title,
      validDate,
      nOfOrder,
      pointsEarned,
      startDate,
      endDate,
      shortDes,
      desc,
    };
    // const formData = JSON.stringify(body);
    // var formData = new FormData();
    // formData.append("title", title);
    // formData.append("validDate", validDate);
    // formData.append("nOfOrder", nOfOrder);
    // formData.append("pointsEarned", pointsEarned);
    // formData.append("shortDes", shortDes);
    // formData.append("desc", desc);

    // console.log("body", formData);
    setIsLoading(true);
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };
    if (!title || !validDate || !nOfOrder || !pointsEarned) {
      setTimeout(() => {
        toast.error("Full fill requirments", {
          autoClose: 1500,
        });
        setIsLoading(false);
      }, 1000);
    } else {
      try {
        // console.log("re>>>");
        // const res = await axios.post(`${baseUrl}/api/challenges`, formData, {
        //   headers,
        // });
        // console.log("res", res);
        // setIsLoading(false);
        fetch(`${baseUrl}/api/challenges`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify(body),
        })
          .then(function (response) {
            console.log(response);
            return response.json();
          })
          .then(function (myJson) {
            console.log(myJson);
            setTimeout(() => {
              toast.success("Successfully upload data", {
                autoClose: 1500,
              });
              reload();
              setIsLoading(false);
            }, 1000);
          });
        resetAllStates();
        handleClose();
      } catch (error) {
        console.log("error", error);
        setIsLoading(false);
      }
    }
  };
  const resetAllStates = () => {
    setTitle("");
    setValiDate();
    setNOfOrder("");
    setPointsEarned("");
    setShortDes("");
    setDesc("");
  };
  const handleCloseChallenges = () => {
    handleClose();
    resetAllStates();
  };
  return (
    <div>
      <Modal
        size="md"
        show={newChallenge}
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header>
          <span
            style={{
              right: "0",
              position: "absolute",
              marginRight: "20px",
              cursor: "pointer",
            }}
            onClick={handleCloseChallenges}
          >
            <i class="fas fa-times"></i>
          </span>
          <Modal.Title>Add Challenges</Modal.Title>
        </Modal.Header>
        <Modal.Body className="overlay overlay-block cursor-default">
          <form className="form form-label-right">
            {/*  Form */}
            <div className="form-group row">
              <div className="col-lg-6">
                <label htmlFor="Title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="Title"
                  value={title}
                  autoComplete="false"
                  placeholder="Title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="col-lg-6">
                <label>No of Orders</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Number of orders"
                  value={nOfOrder}
                  onChange={(e) => setNOfOrder(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-lg-6">
                <label>Points Earned</label>
                <input
                  type="text"
                  className="form-control"
                  value={pointsEarned}
                  placeholder="Points Earned"
                  onChange={(e) => setPointsEarned(e.target.value)}
                />
              </div>
              {/* <div className="col-lg-6">
                <label>Size</label>

                <select name="orders" id="orders" className="form-control">
                  <option value="Small" selected="">
                    Small
                  </option>
                  <option value="Medium" selected="">
                    Medium
                  </option>
                  <option value="Large" selected="">
                    Large
                  </option>
                  ))
                </select>
              </div> */}
              <div className="col-lg-6 ">
                <label>Valid Date</label>
                <select
                  name="orders"
                  id="orders"
                  className="form-control"
                  value={validDate}
                  onChange={(e) => setValiDate(e.target.value)}
                  // onChange={(e) => ChangeState(e, row?._id)}
                >
                  <option
                  //   selected={row?.status === "order_placed" ? "true" : false}
                  >
                    Select Valid Date
                  </option>
                  {/* {categories.map((item, index) => ( */}
                  <option value={1}>1 Day</option>
                  <option value={2}>2 Day</option>
                  <option value={3}>3 Day</option>
                  <option value={4}>4 Day</option>
                  <option value={5}>5 Day</option>
                  {/* <CategorySelect name={item.name} id={item._id} /> */}
                  {/* ))} */}
                </select>
              </div>
              <div className="col-lg-12 mt-2">
                <label>More about this challenge</label>
                <textarea
                  className="form-control"
                  id="des"
                  name="Des"
                  rows="2"
                  cols="50"
                  value={shortDes}
                  placeholder="Short description....."
                  onChange={(e) => setShortDes(e.target.value)}
                ></textarea>
              </div>
              <div className="col-lg-12 mt-2">
                <label>Terms and Conditions</label>
                <textarea
                  className="form-control"
                  id="des"
                  name="Des"
                  rows="4"
                  cols="50"
                  value={desc}
                  placeholder="Description....."
                  onChange={(e) => setDesc(e.target.value)}
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary mr-2"
              style={{ width: "6rem" }}
              disabled={isLoading ? "true" : null}
            >
              {isLoading ? (
                <div
                  class="spinner-border spinner-border-sm"
                  role="status"
                ></div>
              ) : (
                " Submit"
              )}
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={handleCloseChallenges}
            >
              Cancel
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CreateChallenges;
