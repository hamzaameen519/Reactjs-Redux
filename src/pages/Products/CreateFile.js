import React, { useState, Fragment, useEffect, useRef } from "react";
import { Modal } from "react-bootstrap";
import { addCategory, getCategory } from "../../helpers/category";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./CreateFile.css";
import { baseUrl } from "../../config/baseUrl";
function CreateFile(props) {
  // const { show, handleClose } = props;
  const { Row, newProduct, handleClose, onButtonChange, reload } = props;
  const [_id, setId] = useState("");
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [checkImage, setCheckImage] = React.useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [productImage, setProductImage] = useState([]);
  // const [image, setImage] = useState([]);
  const [price, setPrice] = useState();
  const [type, setType] = useState("");
  const [categories, setCategories] = useState([]);
  const [totalCategories, setTotalCategories] = useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [image, setImage] = useState();
  const [preview, setPreview] = useState("");
  const fileInputRef = useRef();
  console.log("Size......", size);
  useEffect(() => {
    console.log("hello button ", onButtonChange);

    if (onButtonChange === "Add") {
      setPreview("");
      resetAllStates();
    } else if (onButtonChange === "Edit") {
      console.log("Edit button");
      console.log("Row data", Row);
      setName(Row?.name);
      setPrice(Row?.price);
      setSize(Row?.size);
      setProductImage(Row?.image);
      setPreview(Row?.image);
      setId(Row?._id);
      setCategoryId(Row?.categoryId?._id);
      console.log(".......Row", Row);
    }
  }, [newProduct]);
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

  useEffect(() => {
    GetAllCategories();
  }, []);
  const GetAllCategories = async () => {
    setIsLoading(true);
    try {
      await getCategory().then((data) => {
        console.log("datd", data);
        if (data) {
          setCategories(data);
          setIsLoading(false);
          setTotalCategories(data?.length);
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

  const onChangeFile = (e) => {
    setProductImage(e.target.files[0]);
    setCheckImage(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };

    if (!productImage || !name || !price || !size) {
      setTimeout(() => {
        toast.error("Full fill requirments", {
          autoClose: 1500,
        });
        setIsLoading(false);
      }, 1000);
    } else {
      var formData = new FormData();

      formData.append("name", name);
      formData.append("image", image);
      formData.append("price", price);
      formData.append("size", size);
      formData.append("categoryId", categoryId);
      console.log("categoryId", categoryId);
      console.log("formdata", formData);
      let res;
      try {
        res =
          onButtonChange === "Add"
            ? await axios.post(`${baseUrl}/api/products`, formData, {
                headers,
              })
            : onButtonChange === "Edit"
            ? await axios.put(`${baseUrl}/api/products/${_id}`, formData, {
                headers,
              })
            : null;
        setIsLoading(false);
        console.log("responosd", res);
        if (res?.status === 201) {
          toast.success("Category Added Successfully", {
            autoClose: 2000,
          });

          handleClose();
          reload();
          resetAllStates();
          setIsLoading(false);
          setPreview("");
          setImage();
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
    setSize("");
    setImage();
    setProductImage({});
    setPrice("");
  };

  const handleCloseButton = () => {
    resetAllStates();
    handleClose();
    setPreview("");
    setImage();
  };
  return (
    <>
      <Modal
        show={newProduct}
        onHide={handleCloseButton}
        size="md"
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
          <Modal.Title>{onButtonChange} Product</Modal.Title>
        </Modal.Header>
        <Modal.Body className="overlay overlay-block cursor-default">
          <form className="form form-label-right">
            {/*  Form */}
            <div className="form-group row">
              <div className="col-lg-6">
                <label htmlFor="ProductName">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  id="name"
                  placeholder="Product Name"
                />
              </div>
              <div className="col-lg-6">
                <label>Category Name</label>
                <select
                  name="orders"
                  id="orders"
                  value={categoryId}
                  className="form-control"
                  onChange={(e) => setCategoryId(e.target.value)}
                  // onChange={(e) => ChangeState(e, row?._id)}
                >
                  <option
                    value=""
                    onChange={(e) => {
                      setCategoryId(e.target.value);
                    }}
                    //   selected={row?.status === "order_placed" ? "true" : false}
                  >
                    Select Category
                  </option>
                  {categories.map((item, index) => (
                    <option
                      value={item?._id}
                      selected={item?._id == categoryId ? "true" : false}
                    >
                      {item?.name}
                    </option>

                    // <CategorySelect name={item.name} id={item._id} />
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-lg-6">
                <label>Price</label>
                <input
                  type="text"
                  className="form-control"
                  value={price}
                  placeholder="Price"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </div>
              <div className="col-lg-6">
                <label>Size</label>

                <select
                  name="orders"
                  id="orders"
                  value={size}
                  className="form-control"
                  onChange={(e) => setSize(e.target.value)}
                >
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
              </div>
              {/* <div className="col-lg-6">
                <label>Image</label>
                <input
                  type="file"
                  className="form-control"
                  fileName={image}
                  // onChange={(e) => setImages(e.target.file[0])}
                  onChange={onChangeFile}
                  accept="image/*"
                />
                </div>*/}
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
            {/* {image == ""
              ? ""
              : image !== "" && (
                  <img
                    style={{
                      marginLeft: "10px",
                      marginTop: "20px",
                      borderRadius: "10px",
                      border: "1px solid lightblue",
                      padding: "2px",
                    }}
                    src={
                      image !== ""
                        ? `${baseUrl}/${image}`
                        : URL.createObjectURL(image)
                    }
                    width={200}
                    height={120}
                    alt=""
                  />
                  )} */}
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
                "Submit"
              )}
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={handleCloseButton}
            >
              Cancel
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreateFile;
