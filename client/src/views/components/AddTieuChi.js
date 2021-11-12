import React, { useState } from "react";
import Cookies from "universal-cookie";
// reactstrap components
import { Button, FormGroup, Form, Input, Modal, Label } from "reactstrap";

const Modals = () => {
  const [state, setState] = useState(false);
  const [className, setClassName] = useState("");
  const [role, setRole] = useState("0");
  var cookies = new Cookies();

  const AddTieuChi = async () => {
    fetch("http://localhost:8080/criteria/new-criteria", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.get("token"),
      },
      body: JSON.stringify({ criteria_name: className, role: role }),
    });
    setClassName("");
    setRole("0");
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
        Thêm tiêu chí
      </Button>

      {/* Modal */}
      <Modal
        className="modal-dialog-centered"
        isOpen={state}
        toggle={() => setState(!state)}
      >
        <div className="modal-header">
          <h1 className="modal-title" id="exampleModalLabel">
            Thêm tiêu chí
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
              <Label for="className">Tên tiêu chí</Label>
              <Input
                type="text"
                name="className"
                id="className"
                value={className}
                placeholder="Tên tiêu chí"
                onChange={(e) => {
                  setClassName(e.target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="gender">Loại tiêu chí</Label>
              <Input
                type="select"
                name="gender"
                id="gender"
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              >
                <option value={"0"} selected={true}>
                  Chủ Nhiệm
                </option>
                <option value={"1"}>Bộ Môn</option>
              </Input>
            </FormGroup>
          </Form>
        </div>
        <div className="modal-footer">
          <Button
            disabled={!className && !role}
            color="primary"
            type="button"
            onClick={() => {
              setState(!state);
              AddTieuChi();
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
