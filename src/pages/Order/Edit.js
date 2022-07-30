import React from "react";
import { Modal } from "react-bootstrap";
function Edit(props) {
  const { Row, show, handleClose } = props;
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Order</Modal.Title>
        </Modal.Header>
        <>
          <Modal.Body className="overlay overlay-block cursor-default">
            <form className="form form-label-right">
              <div className="form-group row">
                {/*  Form */}
                <div className="col-lg-6">
                  <select name="form" label="Form" className="form-control">
                    <option value="Female">Form 1</option>
                    <option value="Female">Form 2</option>
                    <option value="Female">Form 3</option>
                  </select>
                </div>
              </div>
            </form>
          </Modal.Body>
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
              onClick={handleClose} // () => handleSubmit()
              className="btn btn-primary btn-elevate"
            >
              Save
            </button>
          </Modal.Footer>
        </>
      </Modal>
    </>
  );
}

export default Edit;
