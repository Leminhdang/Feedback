import React, { useState, useEffect } from "react";
// reactstrap components
import { Button, FormGroup, Form, Input, Modal, Label } from "reactstrap";

const Modals = ({ token }) => {
  const [state, setState] = useState(false);
  const [subject, setSubject] = useState([]);
  const [isCN, setIsCN] = useState("");
  const [classData, setClassData] = useState([]);
  const [teacherId, setTeacherId] = useState("");
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [bd, setBD] = useState();
  const [subjectId, setSubjectId] = useState("");
  const [classCN, setClassCN] = useState("");

  const getSubject = async () => {
    const response = await fetch("http://localhost:8080/subjects", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    let res = await response.json();
    setSubject(res);
  };

  const getClassData = async () => {
    const response = await fetch("http://localhost:8080/classes", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    let res = await response.json();
    setClassData(res);
  };

  const addTeacher = async () => {
    fetch("http://localhost:8080/teachers/new-teacher", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        teacher_id: teacherId,
        password: "123456",
        email: email,
        fullname: fullname,
        gender: gender,
        subject_id: subjectId,
        birthdate: bd,
        formteacher: isCN ? classCN : null,
      }),
    });
    setTimeout(function () {
      window.location.reload();
    }, 2000);
  };

  useEffect(() => {
    getSubject();
    getClassData();
  }, []);
  return (
    <>
      {/* Button trigger modal */}
      <Button
        color="primary"
        type="button"
        className="float-right"
        onClick={() => setState(!state)}
      >
        Th??m gi??o vi??n
      </Button>
      {/* Modal */}
      <Modal
        className="modal-dialog-centered"
        isOpen={state}
        toggle={() => setState(!state)}
      >
        <div className="modal-header">
          <h1 className="modal-title" id="exampleModalLabel">
            Th??m gi??o vi??n
          </h1>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setState(!state)}
          >
            <span aria-hidden={true}>??</span>
          </button>
        </div>
        <div className="modal-body">
          <Form>
            <FormGroup>
              <Label for="teacherID">M?? gi??o vi??n</Label>
              <Input
                type="text"
                name="teacherID"
                id="teacherID"
                placeholder="M?? gi??o vi??n"
                onChange={(e) => {
                  setTeacherId(e.target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="fullName">H??? v?? t??n</Label>
              <Input
                type="text"
                name="fullName"
                id="fullName"
                placeholder="H??? t??n"
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="gender">Gi???i t??nh</Label>
              <Input
                type="select"
                name="gender"
                id="gender"
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              >
                <option value="">Ch???n gi???i t??nh</option>
                <option value="Nam">Nam</option>
                <option value="N???">N???</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="bd">Ng??y sinh</Label>
              <Input
                type="date"
                name="birthdate"
                id="birthdate"
                onChange={(e) => {
                  setBD(e.target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="position">Ch???c v???</Label>
              <Input
                type="select"
                name="position"
                id="position"
                onChange={(e) => setIsCN(e.target.value)}
              >
                <option value="">Gi??o vi??n b??? m??n</option>
                <option value="gvcn">Gi??o vi??n ch??? nhi???m</option>
              </Input>
            </FormGroup>
            {!isCN ? (
              <></>
            ) : (
              <FormGroup>
                <Label for="class">L???p ch??? nhi???m</Label>
                <Input
                  type="select"
                  name="class"
                  id="class"
                  onChange={(e) => {
                    setClassCN(e.target.value);
                  }}
                >
                  <option value="">Ch???n l???p</option>
                  {classData.length > 0 ? (
                    classData.map((e) => (
                      <option value={e._id}>{e.class_name}</option>
                    ))
                  ) : (
                    <></>
                  )}
                </Input>
              </FormGroup>
            )}
            <FormGroup>
              <Label for="subject">Chuy??n m??n</Label>
              <Input
                type="select"
                name="subject"
                id="subject"
                onChange={(e) => {
                  setSubjectId(e.target.value);
                }}
              >
                <option value="">Ch???n m??n</option>
                {subject.length > 0 ? (
                  subject.map((e) => (
                    <option value={e._id}>{e.subject_name}</option>
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
            disabled={
              !teacherId || !fullname || !email || !bd || !gender || !subjectId
            }
            type="button"
            onClick={() => {
              setState(!state);
              addTeacher();
            }}
          >
            Th??m
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Modals;
