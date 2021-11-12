import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
// reactstrap components
import { Button, FormGroup, Form, Input, Modal, Label } from "reactstrap";
import Select from "react-select";

const Modals = () => {
  const cookies = new Cookies();
  const [state, setState] = useState(false);
  const [dataNoClass, setDataNoClass] = useState([]);
  const [studentId, setStudentId] = useState(null);
  const [fullname, setFullName] = useState(null);
  const [birthdate, setBirthdate] = useState();
  const [gender, setGender] = useState(null);
  let idclassCn = cookies.get("CN");

  const cookie = new Cookies();
  const role = cookie.get("role");

  const getStudentListNoClass = async () => {
    const response = await fetch(
      "http://localhost:8080/students/studentNoClass",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookie.get("token"),
        },
      }
    );

    let res = await response.json();
    let item = res;
    item = item.map((student) => {
      return { value: student.student_id, label: student.fullname };
    });
    setDataNoClass(item);
  };

  useEffect(() => {
    if (role === "3") {
      getStudentListNoClass();
    }
  }, []);

  const addStudent = () => {
    if (role == "3") {
      fetch("http://localhost:8080/students/addClassToStudent", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookie.get("token"),
        },
        body: JSON.stringify({
          student_id: studentId,
          class_id: idclassCn,
        }),
      });
      setTimeout(function () {
        window.location.reload();
      }, 2000);
    } else {
      fetch("http://localhost:8080/students/new-student", {
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
          password: "123456",
        }),
      });
    }
    setTimeout(function () {
      window.location.reload();
    }, 2000);
  };
  const isDisabled = () => {
    if (role === "3") {
      if (studentId) return false;
      return true;
    } else {
      if (studentId && fullname && birthdate && gender) return false;
      return true;
    }
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
        Thêm học sinh
      </Button>
      {/* Modal */}
      <Modal
        className="modal-dialog-centered"
        isOpen={state}
        toggle={() => setState(!state)}
      >
        <div className="modal-header">
          <h1 className="modal-title" id="exampleModalLabel">
            Thêm học sinh
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
            {role === "3" ? (
              <Select
                name="studentID"
                id="studentID"
                onChange={(e) => setStudentId(e.value)}
                options={dataNoClass}
              />
            ) : (
              <>
                <FormGroup>
                  <Label for="studentID">Mã học sinh</Label>
                  <Input
                    type="text"
                    placeholder="Mã học sinh"
                    onChange={(e) => {
                      setStudentId(e.target.value);
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
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="birthdate">Ngày sinh</Label>
                  <Input
                    type="date"
                    name="birthdate"
                    id="birthdate"
                    placeholder="Ngày sinh"
                    onChange={(e) => setBirthdate(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="gender">Giới tính</Label>
                  <Input
                    type="select"
                    name="gender"
                    id="gender"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option>Chọn giới tính</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </Input>
                </FormGroup>{" "}
              </>
            )}
          </Form>
        </div>
        <div className="modal-footer">
          <Button
            disabled={isDisabled()}
            color="primary"
            type="button"
            onClick={() => {
              addStudent();
              setState(!state);
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
