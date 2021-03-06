import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
// reactstrap components
import { Button, FormGroup, Form, Input, Modal, Label } from "reactstrap";

const Modals = () => {
  const [state, setState] = useState(false);
  const [className, setClassName] = useState("");
  var cookies = new Cookies();
  const [role, setRole] = useState(cookies.get("role"));
  //new
  const [noteId, setNoteId] = useState("");
  // const [creatorData, setCreatorData] = useState([]);
  const [teacherId, setTeacherId] = useState();
  const [teacherData, setTeacherData] = useState([]);
  const [classId, setClassId] = useState();
  const [classData, setClassData] = useState([]);
  const [dateCreated, setdateCreated] = useState();
  const [subjectId, setSubjectId] = useState(null);
  const [subjectData, setSubjectData] = useState([]);
  const [criteriaId, setCriteriaId] = useState(1);
  const [criteridData, setCriteridData] = useState([]);

  const [id, setId] = useState();

  const getClassData = async () => {
    const response = await fetch("http://localhost:8080/classes", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.get("token"),
      },
    });

    let res = await response.json();
    setClassData(res);
  };

  const getTeacherData = async () => {
    const response = await fetch("http://localhost:8080/teachers", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.get("token"),
      },
    });

    let res = await response.json();
    setTeacherData(res);
  };
  const getSubjectData = async () => {
    const response = await fetch("http://localhost:8080/subjects", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.get("token"),
      },
    });
    let res = await response.json();
    setSubjectData(res);
  };

  const getCriteriaData = async () => {
    const response = await fetch("http://localhost:8080/criteria", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.get("token"),
      },
    });

    let res = await response.json();
    setCriteridData(res);
  };

  useEffect(() => {
    getClassData();
    getSubjectData();
    getTeacherData();
    getCriteriaData();
  }, []);

  const Admin = () => {
    if (teacherData.length > 0) {
      return teacherData.map((e) => (
        <option value={e._id}>{e.fullname}</option>
      ));
    } else {
      return <></>;
    }
  };

  const Teacher = () => {
    return (
      <option value={cookies.get("idCreator")}>
        {cookies.get("fullname")}
      </option>
    );
  };

  let check;
  if (cookies.get("role") != "3") {
    check = <Admin />;
  } else {
    check = <Teacher />;
  }

  // console.log("fullnameeeeee", cookies.get("fullname"));

  const AddFeedBack = async () => {
    fetch("http://localhost:8080/feedback/new-feedback", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.get("token"),
      },
      body: JSON.stringify({
        id_creator: cookies.get("idCreator"),
        id_class: classId,
        id_teacher: teacherId,
        date_created: dateCreated,
        id_subject: subjectId,
        role: criteriaId,
        note: noteId,
      }),
    });

    setNoteId("");
    setTeacherId(undefined);
    setClassId(undefined);
    setdateCreated("");
    setSubjectId(undefined);
    setCriteriaId(null);
    setTimeout(function () {
      window.location.reload();
    }, 2000);
  };
  // console.log("body");
  return (
    <>
      {/* Button trigger modal */}
      <Button
        color="white"
        type="button"
        className="float-right"
        onClick={() => setState(!state)}
      >
        Th??m ????nh gi??
      </Button>

      {/* Modal */}
      <Modal
        className="modal-dialog-centered"
        isOpen={state}
        toggle={() => setState(!state)}
      >
        <div className="modal-header">
          <h1 className="modal-title" id="exampleModalLabel">
            Phi???u ????nh gi??
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
              <Label for="classId">L???p</Label>
              <Input
                type="select"
                name="classId"
                id="classId"
                onChange={(e) => setClassId(e.target.value)}
              >
                <option>Ch???n l???p</option>
                {classData.length > 0 ? (
                  classData.map((e) => (
                    <option value={e._id}>{e.class_name}</option>
                  ))
                ) : (
                  <></>
                )}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="className">Gi??o vi??n</Label>
              <Input
                type="select"
                name="teacherId"
                id="teacherId"
                onChange={(e) => setTeacherId(e.target.value)}
              >
                <option>Ch???n gi??o vi??n</option>
                {check}
              </Input>
            </FormGroup>
            {cookies.get("CN") || role === "1" ? (
              <FormGroup>
                <Label for="criteriaId">B??? ti??u ch??</Label>
                <Input
                  type="select"
                  name="criteriaId"
                  id="criteriaId"
                  onChange={(e) => setCriteriaId(e.target.value)}
                >
                  <option>Ch???n b??? ti??u ch??</option>
                  <option value={0}>Ch??? Nhi???m</option>
                  <option value={1}>B??? M??n</option>
                </Input>
              </FormGroup>
            ) : (
              <FormGroup>
                <Label for="criteriaId">B??? ti??u ch??</Label>
                <Input
                  type="select"
                  name="criteriaId"
                  id="criteriaId"
                  onChange={(e) => setCriteriaId(e.target.value)}
                >
                  <option value={1}>B??? M??n</option>
                  <option value={0}>Ch??? Nhi???m</option>
                </Input>
              </FormGroup>
            )}

            {criteriaId == 1 ? (
              <FormGroup>
                <Label for="subjectId">M??n h???c</Label>
                <Input
                  type="select"
                  name="subjectId"
                  id="subjectId"
                  onChange={(e) => {
                    if (criteriaId == 1) {
                      setSubjectId(e.target.value);
                    } else {
                      setSubjectId(null);
                    }
                  }}
                >
                  <option>Ch???n m??n h???c</option>
                  {subjectData.length > 0 ? (
                    subjectData.map((e) => (
                      <option value={e._id}>{e.subject_name}</option>
                    ))
                  ) : (
                    <></>
                  )}
                </Input>
              </FormGroup>
            ) : (
              <></>
            )}

            {/* } */}
            <FormGroup>
              <Label for="dateCreated">Hi???u l???c</Label>
              <Input
                type="date"
                name="dateCreated"
                id="dateCreated"
                placeholder="Hi???u l???c"
                onChange={(e) => setdateCreated(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="noteId">T??n ????nh gi??</Label>
              <Input
                type="text"
                name="noteId"
                id="noteId"
                placeholder="T??n phi???u"
                onChange={(e) => {
                  setNoteId(e.target.value);
                }}
              />
            </FormGroup>
          </Form>
        </div>
        <div className="modal-footer">
          <Button
            color="primary"
            type="button"
            onClick={() => {
              setState(!state);
              AddFeedBack();
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
