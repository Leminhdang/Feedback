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
import AddTeacher from "../components/AddTeacher";
import TeacherObj from "../components/Objects/teacher";

const Profile = () => {
  const cookies = new Cookies();
  const [data, setData] = useState([]);

  const getTeacherData = async () => {
    const response = await fetch("http://localhost:8080/teachers", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.get("token"),
      },
    });
    let res = await response.json();
    setData(res);
    
  };

  useEffect(() => {
    getTeacherData();
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
                <AddTeacher token={cookies.get("token")} />
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">
                      <h4>Mã Giáo Viên</h4>
                    </th>
                    <th scope="col">
                      <h4>Họ Tên</h4>
                    </th>
                    <th scope="col">
                      <h4>Giới Tính</h4>
                    </th>
                    <th scope="col">
                      <h4>Chuyên Môn</h4>
                    </th>
                    <th scope="col">
                      <h4>Chức Vụ</h4>
                    </th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    data.map((e) => <TeacherObj {...e} />)
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
