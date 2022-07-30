import React, { useState, Fragment, useEffect, useRef } from "react";
import { Modal } from "react-bootstrap";
import { addCategory } from "../../helpers/category";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { baseUrl } from "../../config/baseUrl";
import "./CreateTable.css";

toast.configure();

function CreateTable(props) {
  const { Row, newEmp, handleClose, onButtonChange, reload } = props;

  const [_id, setId] = useState("");
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState([]);
  const [price, setPrice] = useState();
  const [type, setType] = useState("");
  const [categories, setCategories] = useState([]);
  const [totalCategories, setTotalCategories] = useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [checkImage, setCheckImage] = React.useState(false);
  const [image, setImage] = useState();
  const [preview, setPreview] = useState("");
  const fileInputRef = useRef();
  useEffect(() => {
    console.log("hello button ", onButtonChange);

    if (onButtonChange === "Add") {
      setPreview("");
      resetAllStates();
    } else if (onButtonChange === "Edit") {
      console.log("Edit button");
      console.log("Row data", Row);
      setName(Row?.name);
      setCategoryImage(Row?.categoryImage);
      setPreview(Row?.categoryImage);
      setCategoryId(Row?._id);
      // setCategoryId(Row?.categoryId?._id);
      console.log(".......Row", Row);
    }
  }, [newEmp]);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      console.log("reader file", reader);
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  const onChangeFile = (e) => {
    setCategoryImage(e.target.files[0]);
    setCheckImage(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };

    if (!categoryImage || !name) {
      setTimeout(() => {
        toast.error("Full fill requirments", {
          autoClose: 1500,
        });
        setIsLoading(false);
      }, 1000);
    } else {
      var formData = new FormData();

      formData.append("name", name);
      if (checkImage) {
        formData.append("categoryImage", image);
      }

      console.log("categoryId", categoryId);
      console.log("formdata", formData);
      let res;
      try {
        res =
          onButtonChange === "Add"
            ? await axios.post(`${baseUrl}/api/categories`, formData, {
                headers,
              })
            : onButtonChange === "Edit"
            ? await axios.put(
                `${baseUrl}/api/categories/${categoryId}`,
                formData,
                {
                  headers,
                }
              )
            : null;
        setIsLoading(false);
        console.log("responosd", res);
        if (res?.status === 201) {
          toast.success("Category Added Successfully", {
            autoClose: 2000,
          });
          setCheckImage(false);
          handleClose();
          reload();
          resetAllStates();
          setIsLoading(false);
        } else {
          toast.error("Error", {
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

  const resetAllStates = () => {
    setName("");
    setCategoryImage({});
    setImage();
  };

  const handleCloseButton = () => {
    resetAllStates();
    handleClose();
  };
  return (
    <>
      <Modal
        size="md"
        show={newEmp}
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
            onClick={handleClose}
          >
            <i class="fas fa-times"></i>
          </span>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>

        <>
          <form
            onSubmit={handleSubmit}
            className="form form-label-right"
            encType="multipart/form-data"
          >
            <Modal.Body className="overlay overlay-block cursor-default">
              <div class="form-group row ">
                <div class="col-md-12 col-12 col-sm-12 col-lg-12">
                  <label>Category Name</label>
                  <div id="the-basics">
                    <input
                      class="typeahead"
                      type="text"
                      placeholder="Category Name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                </div>

                {/* <div class="col">
                  <div class="form-group">
                    <label>
                      Property Images<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      fileName={categoryImage}
                      onChange={onChangeFile}
                      accept="categoryImage/*"
                    />
                   {
                      categoryImage
                        ? ""
                        : // images?.map((item, i) => (
                          // <Fragment>
                          //   <img
                          //     style={{
                          //       marginLeft: "10px",
                          //       marginTop: "20px",
                          //       borderRadius: "10px",
                          //       border: "1px solid lightblue",
                          //       padding: "2px",
                          //     }}
                          //     src={
                          //       categoryImage
                          //         ? `${baseUrl}/${categoryImage}`
                          //         : URL.createObjectURL(categoryImage)
                          //     }
                          //     width={200}
                          //     height={120}
                          //     alt=""
                          //   />
                          // </Fragment>
                          null
                      // null
                      // ))
                    }
                     <div class="input-group col-xs-12">
                      <input
                        type="text"
                        class="form-control file-upload-info"
                        disabled
                        placeholder="Upload Image"
                      />
                      <span class="input-group-append">
                        <button
                          class="file-upload-browse btn btn-primary"
                          type="button"
                        >
                          Upload
                        </button>
                      </span>
                    </div> 
                  </div>
                  </div> */}
                <div class="col-md-12 col-12 col-sm-12 col-lg-12 ">
                  <div className="containerr">
                    <form>
                      {preview ? (
                        <img
                          src={preview}
                          style={{ objectFit: "cover" }}
                          onClick={() => {
                            setImage(null);
                          }}
                          className="img"
                        />
                      ) : (
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            fileInputRef.current.click();
                          }}
                          className="button"
                        >
                          Upload Image
                        </button>
                      )}
                      <input
                        type="file"
                        style={{ display: "none" }}
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={(event) => {
                          const file = event.target.files[0];
                          if (file && file.type.substr(0, 5) === "image") {
                            setImage(file);
                            setCheckImage(true);
                          } else {
                            setImage(null);
                          }
                        }}
                      />
                    </form>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={handleClose}
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
        </>
      </Modal>
    </>
  );
}

export default CreateTable;
