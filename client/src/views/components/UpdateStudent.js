import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
// reactstrap components
import { Button, FormGroup, Form, Input, Modal, Label } from "reactstrap";

const Modals = ({ closeModal, studentInfo }) => {
  const [state, setState] = useState(false);
  const [data, setData] = useState([]);
  const [studentId, setStudentId] = useState(studentInfo.student_id);
  const [fullname, setFullName] = useState(studentInfo.fullName);
  const [birthdate, setBirthdate] = useState(studentInfo.date_of_birth);
  const [gender, setGender] = useState(studentInfo.gender);
  const [classId, setClassId] = useState(studentInfo.class_id._id);

  let modal = closeModal;

  const cookie = new Cookies();

  const getClassData = async () => {
    const response = await fetch("http://localhost:8080/classes", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookie.get("token"),
      },
    });

    let res = await response.json();
    setData(res);
  };

  const addStudent = () => {
    fetch("http://localhost:8080/students/edit-student/" + studentInfo._id, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookie.get("token"),
      },
      body: JSON.stringify({
        student_id: studentId,
        fullname: fullname,
        date_of_birth: birthdate,
        gender: gender,
        class_id: classId,
        password: "123456",
      }),
    });

    setStudentId("");
    setFullName("");
    setGender(undefined);
    setClassId(undefined);
    setBirthdate("");
  };
  useEffect(() => {
    getClassData();
  }, []);
  return (
    <>
      {/* Button trigger modal */}

      {/* Modal */}
      <Modal
        className="modal-dialog-centered"
        isOpen={modal}
        toggle={() => closeModal(false)}
      >
        <div className="modal-header">
          <h1 className="modal-title" id="exampleModalLabel">
            C???p nh???t h???c sinh
          </h1>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => closeModal(false)}
          >
            <span aria-hidden={true}>??</span>
          </button>
        </div>
        <div className="modal-body">
          <Form>
            <FormGroup>
              <Label for="studentID">M?? h???c sinh</Label>
              <Input
                type="text"
                name="studentID"
                id="studentID"
                placeholder="M?? h???c sinh"
                defaultValue={studentInfo.student_id}
                onChange={(e) => setStudentId(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="fullName">H??? v?? t??n</Label>
              <Input
                type="text"
                name="fullName"
                id="fullName"
                placeholder="H??? t??n"
                defaultValue={studentInfo.fullname}
                onChange={(e) => setFullName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="birthdate">Ng??y sinh</Label>
              <Input
                type="date"
                name="birthdate"
                id="birthdate"
                placeholder="Ng??y sinh"
                defaultValue={formatDate(studentInfo.date_of_birth)}
                onChange={(e) => setBirthdate(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="gender">Gi???i t??nh</Label>
              <Input
                type="select"
                name="gender"
                id="gender"
                defaultValue={studentInfo.gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option>Ch???n gi???i t??nh</option>
                <option value="Nam">Nam</option>
                <option value="N???">N???</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="className">L???p</Label>
              <Input
                type="select"
                name="className"
                id="className"
                onChange={(e) => setClassId(e.target.value)}
              >
                <option>Ch???n l???p</option>
                {data.length > 0 ? (
                  data.map((e) => (
                    <option
                      value={e._id}
                      selected={e._id === studentInfo.class_id._id}
                    >
                      {e.class_name}
                    </option>
                  ))
                ) : (
                  <></>
                )}
              </Input>
            </FormGroup>
          </Form>
        </div>
        <div className="modal-footer">
          <Button
            color="primary"
            type="button"
            onClick={() => {
              addStudent();
              closeModal(false);
            }}
          >
            S???a
          </Button>
        </div>
      </Modal>
    </>
  );
};

//to format date
function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export default Modals;
