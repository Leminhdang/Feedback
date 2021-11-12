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
        Thêm giáo viên
      </Button>
      {/* Modal */}
      <Modal
        className="modal-dialog-centered"
        isOpen={state}
        toggle={() => setState(!state)}
      >
        <div className="modal-header">
          <h1 className="modal-title" id="exampleModalLabel">
            Thêm giáo viên
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
              <Label for="teacherID">Mã giáo viên</Label>
              <Input
                type="text"
                name="teacherID"
                id="teacherID"
                placeholder="Mã giáo viên"
                onChange={(e) => {
                  setTeacherId(e.target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="fullName">Họ và tên</Label>
              <Input
                type="text"
                name="fullName"
                id="fullName"
                placeholder="Họ tên"
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
              <Label for="gender">Giới tính</Label>
              <Input
                type="select"
                name="gender"
                id="gender"
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              >
                <option value="">Chọn giới tính</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="bd">Ngày sinh</Label>
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
              <Label for="position">Chức vụ</Label>
              <Input
                type="select"
                name="position"
                id="position"
                onChange={(e) => setIsCN(e.target.value)}
              >
                <option value="">Giáo viên bộ môn</option>
                <option value="gvcn">Giáo viên chủ nhiệm</option>
              </Input>
            </FormGroup>
            {!isCN ? (
              <></>
            ) : (
              <FormGroup>
                <Label for="class">Lớp chủ nhiệm</Label>
                <Input
                  type="select"
                  name="class"
                  id="class"
                  onChange={(e) => {
                    setClassCN(e.target.value);
                  }}
                >
                  <option value="">Chọn lớp</option>
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
              <Label for="subject">Chuyên môn</Label>
              <Input
                type="select"
                name="subject"
                id="subject"
                onChange={(e) => {
                  setSubjectId(e.target.value);
                }}
              >
                <option value="">Chọn môn</option>
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
            Thêm
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Modals;
