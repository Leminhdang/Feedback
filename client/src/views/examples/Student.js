import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
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
} from "reactstrap";
// core components
import Header from "../../components/Headers/Header.js";
import ItemName from "../components/DropdownName";
import AddStudent from "../components/AddStudent";
import StudentObj from "../components/Objects/student";

const Profile = () => {
  const [arr, setArr] = useState([]);
  const cookies = new Cookies();
  let token = cookies.get("token");
  let role = cookies.get("role");
  let idclassCn = cookies.get("CN");

  const getData = async () => {
    console.log("CN", idclassCn);
    if (role == "3" && idclassCn) {
      const response = await fetch(
        "http://localhost:8080/students/studentByClass",
        {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            id_class: idclassCn,
          }),
        }
      );
      let res = await response.json();
      if (res) {
        setArr(res);
      }
    }
    if (role != "3") {
      const response = await fetch("http://localhost:8080/students", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      let res = await response.json();
      if (res) {
        setArr(res);
      }
    }
    if (role == "3" && !idclassCn) {
      setArr([]);
    }
  };
  useEffect(() => {
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
              <CardHeader className="border-0 bg-success">
                {/* <h3 className="mb-0">Giáo Viên</h3> */}
                <ItemName />
                <AddStudent />
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">
                      <h4>Mã Học Sinh</h4>
                    </th>
                    <th scope="col">
                      <h4>Họ Tên</h4>
                    </th>
                    <th scope="col">
                      <h4>Ngày Sinh</h4>
                    </th>
                    <th scope="col">
                      <h4>Giới Tính</h4>
                    </th>
                    <th scope="col">
                      <h4>Lớp</h4>
                    </th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {arr.length > 0 ? (
                    arr.map((e) => <StudentObj {...e} />)
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

export default Profile;
