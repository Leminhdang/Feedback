import React, {useState, useEffect} from "react";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const Header = () => {
  const [classData, setClassData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [criteriaData, setCriteriaData] = useState([]);

  const cloneData = async () => {
    const resClass = await fetch("http://localhost:8080/classes", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
    });

    let res1 = await resClass.json();
    setClassData(res1);

    const resStudent = await fetch("http://localhost:8080/students", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
    });

    let res2 = await resStudent.json();
    setStudentData(res2);

    const resTeacher = await fetch("http://localhost:8080/teachers", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
    });

    let res3 = await resTeacher.json();
    setTeacherData(res3);

    const resCriteria = await fetch("http://localhost:8080/criteria", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
    });

    let res4 = await resCriteria.json();
    setCriteriaData(res4);
  }

  useEffect(() => {
    return cloneData();
  }, [])

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Giáo Viên
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {teacherData.length}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Học Sinh
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                        {studentData.length}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-graduation-cap" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Lớp
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {classData.length}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-green text-white rounded-circle shadow">
                          <i className="fas fa-list" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Phiếu Đánh Giá
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {criteriaData.length}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-file-invoice" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
