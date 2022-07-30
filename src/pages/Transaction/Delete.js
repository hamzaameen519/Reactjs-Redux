import React from "react";
import { Modal } from "react-bootstrap";
function Delete(props) {
  const { Row, show, handleClose } = props;

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header class="mdi mdi-alert">
          <Modal.Title>Delete Products '{Row.form}'</Modal.Title>
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
            onClick={handleClose} // () => handleSubmit()
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Delete;
