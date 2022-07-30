import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { baseUrl } from "../../config/baseUrl";
import { useHistory } from "react-router-dom";
const ProfileUpdate = (props) => {
  const { history } = useHistory();
  const { user } = useSelector((state) => state?.user);

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [labelTitle, setLabelTitle] = useState(" ");
  const [updateData, setUpdateData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [updateNewPassword, setUpdatePassword] = useState("");
  const [updateConfirmPassword, setUpdateConfirmPassword] = useState("");
  console.log(props);
  const { newEdit, data, handleClose, reload } = props;
  console.log(data);
  console.log("....", handleClose);

  useEffect(() => {
    if (data?.name !== "") {
      console.log("name============>");
      updateName();
    } else if (data?.email !== "") {
      console.log("email============>");
      updateEmail();
    } else if (data?.password !== false) {
      console.log("pass============>");
      updatePassword();
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setPassword({ updateConfirmPassword });
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };

    if (!updateData) {
      setTimeout(() => {
        toast.error("Full fill requirments", {
          autoClose: 1500,
        });
        setIsLoading(false);
      }, 1000);
    } else if (updateNewPassword !== updateConfirmPassword) {
      setTimeout(() => {
        toast.error("Password does not match", {
          autoClose: 1500,
        });
        setIsLoading(false);
      }, 1000);
    } else {
      // var formData = new FormData();

      // if (name !== "") {
      //   formData.append("name", name);
      // } else if (email !== "") {
      //   console.log("helo email", email);
      //   formData.append("email", email);
      // } else if (updateConfirmPassword == updateNewPassword) {
      //   formData.append("p", email);
      // }
      // formData.append("email", email);
      // formData.append("password", updateNewPassword);

      // console.log("formdata", formData);

      let res;
      try {
        // res = await axios.put(
        //   `${baseUrl}/api/profile/edit/${title}/${user?._id}`,
        //   body,
        //   {
        //     headers,
        //   }
        // );
        const res = await fetch(
          `${baseUrl}/api/profile/edit/${title}/${user?._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            body: JSON.stringify({
              email,
              name,
              password: updateNewPassword,
            }),
          }
        );
        setIsLoading(false);
        console.log("responosd", res);
        if (res?.status === 201) {
          toast.success(`${labelTitle} updated successfully`, {
            autoClose: 2000,
          });
          // history.push("/");
          handleCloseButton();
          reload();
          setIsLoading(false);
        } else {
          toast.error("Something went wrong", {
            autoClose: 2000,
          });
          setIsLoading(false);
        }
      } catch (error) {
        toast.error("Error", error, {
          autoClose: 2000,
        });
        setIsLoading(false);
      }
    }
  };
  const updateName = () => {
    setLabelTitle("Name");
    setTitle("name");
    setSubTitle("This is how we we'll address you");
    setName(data?.name);
  };
  const updateEmail = () => {
    setLabelTitle("Email");
    setTitle("email");
    setSubTitle("Make sure we can reach you at your new email");
    setEmail(data?.email);
  };
  const updatePassword = () => {
    setLabelTitle("Password");
    setEdit(true);
    setTitle("password");
    setSubTitle("Changing  your  password ? Go for at least 6 characters");
  };
  const handleCloseButton = () => {
    handleClose();
    setEdit(false);
    setLabelTitle("");
    setTitle("");
    setSubTitle("");
    setEmail("");
    setName("");
  };
  // const ProfiledataChange = (e) => {
  //   // console.log(e);
  //   // const value = e.target.value;
  //   // console.log(value);

  //   console.log("hello data");
  //   if (updateData?.name == data?.name) {
  //     console.log("hello name");
  //     setUpdateData({ name: e.target.value });
  //     setName(updateData.name);
  //   } else if (updateData?.email === data?.email) {
  //     setUpdateData({ email: e.target.value });
  //     setEmail(updateData.email);
  //   } else if (updateData?.password === data?.password) {
  //     setUpdateData({ password: e.target.value });
  //     setPassword(updateData.password);
  //   }
  //   // setUpdateData(value);
  // };
  return (
    <div>
      <Modal
        size="md"
        show={newEdit}
        onHide={handleCloseButton}
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
            onClick={handleCloseButton}
          >
            <i class="fas fa-times"></i>
          </span>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <form
          onSubmit={handleSubmit}
          className="form form-label-right "
          encType="multipart/form-data"
        >
          <Modal.Body className="overlay overlay-block cursor-default pb-5  ">
            <div class="form-group row  mb-3">
              <div className="col-sm-12">
                <p>{subTitle}</p>
              </div>
              <div className="col-sm-12 mt-2">
                <label>{labelTitle}</label>
                <div id="the-basics">
                  {edit ? (
                    <>
                      <input
                        class="typeahead"
                        type="text"
                        onChange={(e) => setUpdatePassword(e.target.value)}
                        placeholder={`New ${labelTitle}`}
                      />
                      <label className="mt-2">Confirm password</label>
                      <input
                        class="typeahead"
                        type="text"
                        onChange={(e) =>
                          setUpdateConfirmPassword(e.target.value)
                        }
                        placeholder={`Confirm ${labelTitle}`}
                      />
                    </>
                  ) : (
                    <input
                      class="typeahead"
                      type="text"
                      value={name !== "" ? name : email !== "" ? email : null}
                      // onChange={() => ProfiledataChange()}
                      onChange={
                        name !== ""
                          ? (e) => setName(e.target.value)
                          : email !== ""
                          ? (e) => setEmail(e.target.value)
                          : null
                      }
                      placeholder={labelTitle}
                      // value={name}
                      // onChange={(e) => {
                      //   setName(e.target.value);
                      // }}
                    />
                  )}
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              onClick={handleCloseButton}
              className="btn btn-light btn-elevate"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-elevate"
              disabled={isLoading ? "true" : null}
              style={{ width: "6rem" }}
            >
              {isLoading ? (
                <div
                  class="spinner-border spinner-border-sm"
                  role="status"
                ></div>
              ) : (
                "Save"
              )}
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default ProfileUpdate;
