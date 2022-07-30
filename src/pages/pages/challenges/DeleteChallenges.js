import React from "react";
import { Modal } from "react-bootstrap";
import { baseUrl } from "../../config/baseUrl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const DeleteChallenges = (props) => {
  console.log("props", props);
  const { Row, handleClose, show, reload } = props;
  const handleDeleteItem = async (e) => {
    e.preventDefault();
    let res;
    try {
      res = await axios.delete(`${baseUrl}/api/challenges/${Row._id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log("res delete..", res);
      if (res?.status === 200) {
        toast.success("Product Deleted Successfully", {
          autoClose: 2000,
        });
        handleClose();
        reload();
      } else {
        toast.error("Error", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error("Error", error, {
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="sm"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header class="mdi mdi-alert">
          <span
            style={{
              right: "0",
              position: "absolute",
              marginRight: "20px",
              cursor: "pointer",
            }}
            onClick={handleClose}
          >
            <i class="fas fa-times"></i>
          </span>
          <Modal.Title>
            Delete Challenges <span className="text-danger">'{Row.title}'</span>
          </Modal.Title>
        </Modal.Header>
        <>
          <Modal.Body className="overlay overlay-block cursor-default">
            Are you sure! you want to delete this permanently?
          </Modal.Body>
        </>
        <Modal.Footer>
          <button
            type="button"
            onClick={handleClose}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="submit"
            onClick={handleDeleteItem} // () => handleSubmit()
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteChallenges;
