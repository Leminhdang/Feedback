import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import FeedbackObject from "../components/Objects/feadback";
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
import "./home.css";

const Profile = () => {
  const cookies = new Cookies();

  let id_feedback = cookies.get("id_feedback");
  const [data, setData] = useState({});

  var submitData = () => {
    const arr = [];

    for (var i = 0; i < data[0].list_criteria.length; i++) {
      var radios = document.getElementsByName(i);
      var tentieuchi = document.getElementById(i).innerText;
      for (var j = 0, length = radios.length; j <= length; j++) {
        if (radios[j].checked) {
          const ojb = {};
          ojb.tieuchi = tentieuchi.toString();
          ojb.diem = radios[j].value;
          arr.push(ojb);
          break;
        }
      }
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_feedback: id_feedback,
        list_criteria: arr,
      }),
    };
    fetch("http://localhost:8080/feedback/submitFeedback", requestOptions)
      .then((response) => console.log(response.json()))
      .then((data) => console.log(data));
    setTimeout(function () {
      window.location.href = "index";
    }, 2000);
  };

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "http://localhost:8080/feedback/feedbackById/",
        {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id_feedback }),
        }
      );
      let res = await response.json();
      if (res) {
        setData(res);
      }
    };
    getData();
  }, []);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          {/* teacher */}
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 bg-white text-center"></CardHeader>
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
                  {data.length > 0 ? (
                    data.map((e) =>
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
                                name={index}
                                id="radio1"
                              />
                            </FormGroup>
                          </td>
                          <td>
                            <FormGroup check>
                              <Input
                                type="radio"
                                value="5"
                                name={index}
                                id="radio2"
                              />
                            </FormGroup>
                          </td>
                          <td>
                            <FormGroup check>
                              <Input
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
              <CardFooter className="py-4">
                <div className="text-center">
                  <Button
                    color="primary"
                    type="button"
                    onClick={() => submitData()}
                  >
                    Hoàn Thành
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
