import React, { useState } from "react";
import Cookies from "universal-cookie";
// reactstrap components
import { Button, FormGroup, Form, Input, Modal, Label } from "reactstrap";

const Modals = () => {
  const [state, setState] = useState(false);
  const [className, setClassName] = useState("");
  var cookies = new Cookies();

  const addClass = async () => {
    fetch("http://localhost:8080/classes/new-class", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.get("token"),
      },
      body: JSON.stringify({ class_name: className }),
    });
    setClassName("");
    setTimeout(function () {
      window.location.reload();
    }, 2000);
  };
  return (
    <>
      {/* Button trigger modal */}
      <Button
        color="primary"
        type="button"
        className="float-right"
        onClick={() => setState(!state)}
      >
        Thêm lớp
      </Button>

      {/* Modal */}
      <Modal
        className="modal-dialog-centered"
        isOpen={state}
        toggle={() => setState(!state)}
      >
        <div className="modal-header">
          <h1 className="modal-title" id="exampleModalLabel">
            Thêm lớp
          </h1>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setState(!state)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <Form>
            <FormGroup>
              <Label for="className">Tên Lớp</Label>
              <Input
                type="text"
                name="className"
                id="className"
                value={className}
                placeholder="Tên lớp"
                onChange={(e) => {
                  setClassName(e.target.value);
                }}
              />
            </FormGroup>
          </Form>
        </div>
        <div className="modal-footer">
          <Button
            disabled={!className}
            color="primary"
            type="button"
            onClick={() => {
              setState(!state);
              addClass();
            }}
          >
            Thêm
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Modals;
