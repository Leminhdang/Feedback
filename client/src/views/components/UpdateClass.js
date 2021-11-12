import React, { useState } from "react";
import Cookies from "universal-cookie";
// reactstrap components
import { Button, FormGroup, Form, Input, Modal, Label, DropdownItem } from "reactstrap";

const Modals = ({closeModal, classInfo}) => {
  // const [mainState, setMainState] = useState();
  // let state = paramsState
  // const [state, setState] = useState(paramsState);

  let state = closeModal
  
  const [className, setClassName] = useState(classInfo.class_name);
  var cookies = new Cookies();

  const addClass = async () => {
    fetch("http://localhost:8080/classes/edit-class/" + classInfo._id, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.get("token"),
      },
      body: JSON.stringify({ class_name: className }),
    });
    setClassName("");
  };
  return (
    <>
      {/* Button trigger modal */}
      {/* <Button className="text-green"onClick={() => setState(!state)}>
        Update
      </Button> */}
      
      {/* Modal */}
      <Modal
        className="modal-dialog-centered"
        isOpen={state}
        toggle={() =>  closeModal(false)}
      >
        <div className="modal-header">
          <h1 className="modal-title" id="exampleModalLabel">
            Cập nhật lớp
          </h1>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => closeModal(false)}
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
              closeModal(false)
              addClass();
            }}
          >
            Sửa
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Modals;
