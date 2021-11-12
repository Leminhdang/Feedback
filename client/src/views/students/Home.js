import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { Modal } from "react-bootstrap";
// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Container,
  Table,
  Row,
  Col,
  FormGroup,
  Input,
  Button,
} from "reactstrap";
// core components
import Header from "../../components/Headers/UserHeader";
import ItemName from "../components/DropdownName";

const Profile = () => {
  const cookies = new Cookies();
  const [data, setData] = useState([]);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check, setCheck] = useState(false);
  const [show, setShow] = useState(false);
  const [feedbackID, setFeedbackID] = useState("");
  const [detail, setDetail] = useState([]);
  let id = cookies.get("id_student");

  const gotoFeedback = (_id) => {
    cookies.set("id_feedback", _id);
    window.location.href = " feedback";
  };

  useEffect(() => {
    const getDetail = async () => {
      const response = await fetch(
        "http://localhost:8080/feedback/feedbackById/",
        {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: feedbackID }),
        }
      );
      let res = await response.json();
      if (res) {
        setDetail(res);
      }
    };
    const getData = async () => {
      const response = await fetch(
        "http://localhost:8080/feedback/feedbackByStudent/",
        {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id_student: id }),
        }
      );
      let res = await response.json();
      if (res) {
        setData(res);
      }
    };
    getData();
    getDetail();
  }, [feedbackID]);
  console.log(">>>>", detail);
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          {/* teacher */}
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 bg-white">
                {/* <h3 className="mb-0">Giáo Viên</h3> */}
                <ItemName />
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">
                      <h4>STT</h4>
                    </th>
                    <th scope="col">
                      <h4>Môn Học</h4>
                    </th>
                    <th scope="col">
                      <h4>Giáo Viên</h4>
                    </th>
                    <th scope="col">
                      <h4>Trạng Thái</h4>
                    </th>
                    <th scope="col">
                      <h4>Chuyên Môn</h4>
                    </th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {data.map((e, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{e.id_subject ? e.id_subject.subject_name : " "}</td>
                      <td>{e.id_teacher ? e.id_teacher.fullname : " "}</td>
                      <td>
                        {e.status ? (
                          <a href="#" className="text-green">
                            <span class="badge badge-dot mr-4">
                              <i class="bg-green"></i>
                              <span
                                class="status"
                                onClick={() => {
                                  setFeedbackID(e._id);
                                  setShow(true);
                                }}
                              >
                                Hoàn thành
                              </span>
                            </span>
                          </a>
                        ) : (
                          <a href="#" className="text-green">
                            <span
                              class="badge badge-dot mr-4"
                              onClick={() => gotoFeedback(e._id)}
                            >
                              <i class="bg-red"></i>
                              <span style={{ color: "red" }} class="status">
                                Chưa hoàn thành
                              </span>
                            </span>
                          </a>
                        )}
                      </td>
                      <td>
                        {e.role_criteria === "1"
                          ? "Giáo Viên Bộ Môn"
                          : "Giáo Viên Chủ Nhiệm"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="example-custom-modal-styling-title">
                    Chi tiết
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Table striped bordered hover responsive="sm">
                    <thead className="thead">
                      {/* className="thead-light" */}
                      <th>
                        <h4>STT</h4>
                      </th>
                      <th>
                        <h4>Nội dung ý kiến</h4>
                      </th>
                      <th>
                        <h5>1</h5>
                      </th>
                      <th>
                        <h5>2</h5>
                      </th>
                      <th>
                        <h5>3</h5>
                      </th>
                      <th>
                        <h5>4</h5>
                      </th>
                    </thead>
                    <tbody className="tbody">
                      {detail.length > 0 ? (
                        detail.map((e) =>
                          e.list_criteria.map((item, index) => (
                            <tr>
                              <td>{index + 1}</td>
                              <td id={index} style={{ textAlign: "left" }}>
                                {item.tieuchi}
                              </td>

                              <td>
                                <FormGroup check>
                                  <Input
                                    type="radio"
                                    value="2.5"
                                    disabled={true}
                                    defaultChecked={item.diem == "2.5"}
                                    name={index}
                                    id="radio1"
                                  />
                                </FormGroup>
                              </td>
                              <td>
                                <FormGroup check>
                                  <Input
                                    type="radio"
                                    disabled={true}
                                    value="5"
                                    defaultChecked={item.diem == "5"}
                                    name={index}
                                    id="radio2"
                                  />
                                </FormGroup>
                              </td>
                              <td>
                                <FormGroup check>
                                  <Input
                                    disabled={true}
                                    defaultChecked={item.diem == "7.5"}
                                    type="radio"
                                    value="7.5"
                                    name={index}
                                    id="radio3"
                                  />
                                </FormGroup>
                              </td>
                              <td>
                                <FormGroup check>
                                  <Input
                                    type="radio"
                                    disabled={true}
                                    defaultChecked={item.diem == "10"}
                                    value="10"
                                    name={index}
                                    id="radio4"
                                  />
                                </FormGroup>
                              </td>
                            </tr>
                          ))
                        )
                      ) : (
                        <></>
                      )}
                    </tbody>
                  </Table>
                </Modal.Body>
              </Modal>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
