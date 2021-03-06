import React, { useState, useEffect } from "react";
// react component that copies the given text inside your clipboard
// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Container,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Table,
  Row,
  Dropdown,
} from "reactstrap";
// core components
import Header from "../../components/Headers/Header.js";
import AddTieuChi from "../components/AddTieuChi";
import AddFeedBack from "../components/AddFeedBack";
import TieuChiObj from "../components/Objects/tieuchi";
import FeedBackObj from "../components/Objects/feedbackAdmin";
import Cookies from "universal-cookie";

const Icons = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [value, setValue] = useState(0);
  const cookies = new Cookies();
  const role = cookies.get("role");
  // const [data, setData] = useState([]);

  const [criteriaData, setCriteridData] = useState([]);
  const [feedBackData, setFeedbackData] = useState([]);

  const getTieuChiData = async () => {
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

  const getFeedBack = async () => {
    if (role === "3") {
      const response = await fetch(
        "http://localhost:8080/feedback/feedbackByTeacher",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.get("token"),
          },
          body: JSON.stringify({
            id_teacher: cookies.get("idCreator"),
          }),
        }
      );
      let res = await response.json();
      let arr = new Map();
      let tmpArr = [];
      res.forEach((e) => {
        if (!arr.has(e.note)) {
          arr.set(e.note, e);
        }
      });
      console.log(arr);
      arr.forEach((v, k) => {
        tmpArr.push(v);
      });

      if (tmpArr.length > 0) {
        setFeedbackData(tmpArr);
      }
    } else {
      const response = await fetch("http://localhost:8080/feedback", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.get("token"),
        },
      });
      let res = await response.json();
      // setFeedbackData(res);
      let arr = new Map();
      let tmpArr = [];
      res.forEach((e) => {
        if (!arr.has(e.note)) {
          arr.set(e.note, e);
        }
      });
      console.log(arr);
      arr.forEach((v, k) => {
        tmpArr.push(v);
      });

      if (tmpArr.length > 0) {
        setFeedbackData(tmpArr);
      }
    }
  };
  useEffect(() => {
    getTieuChiData();
    getFeedBack();
  }, []);
  console.log(">>>", feedBackData);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        {cookies.get("role") != "3" && (
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Ti??u Ch??</h3>
                  <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret>
                      {value === 1
                        ? "Ch??? nhi???m"
                        : value === 2
                        ? "B??? m??n"
                        : "B??? l???c"}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={() => setValue(1)}>
                        Ch??? nhi???m
                      </DropdownItem>
                      <DropdownItem onClick={() => setValue(2)}>
                        B??? m??n
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>

                  <AddTieuChi />
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">T??n</th>
                      <th scope="col">Lo???i</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {criteriaData.length > 0 ? (
                      criteriaData.map((c) => <TieuChiObj {...c} />)
                    ) : (
                      <></>
                    )}
                  </tbody>
                </Table>
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
        )}

        <Row>
          <div className="col mt-5">
            <Card className="shadow">
              <CardHeader className="border-0 bg-success">
                <h3 className="mb-0">Phi???u ????nh gi??</h3>
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                  <DropdownToggle caret>
                    {value === 1
                      ? "L???p"
                      : value === 2
                      ? "M??n"
                      : value === 3
                      ? "Gi??o vi??n"
                      : "B??? l???c"}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => setValue(1)}>L???p</DropdownItem>
                    <DropdownItem onClick={() => setValue(2)}>M??n</DropdownItem>
                    <DropdownItem onClick={() => setValue(3)}>
                      Gi??o vi??n
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <AddFeedBack />
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">M?? Phi???u</th>
                    <th scope="col">L???p</th>
                    <th scope="col">Gi??o vi??n</th>
                    <th scope="col">B??? ti??u ch??</th>
                    <th scope="col">M??n h???c</th>
                    <th scope="col">Ng??y t???o</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {feedBackData.length > 0 ? (
                    feedBackData.map((e) => <FeedBackObj {...e} />)
                  ) : (
                    <></>
                  )}
                </tbody>
              </Table>
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

export default Icons;
