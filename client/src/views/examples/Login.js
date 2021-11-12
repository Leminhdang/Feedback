import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

const Login = () => {
  const [id_student, setIdStudent] = useState("");
  const [password_student, setPasswordStudent] = useState("");
  const [token, setToken] = useState("");
  const cookies = new Cookies();

  function changeValueUsername(e) {
    setIdStudent(e.target.value);
  }
  function changeValuePassword(e) {
    setPasswordStudent(e.target.value);
  }

  const data = { id_student: id_student, password_student: password_student };

  const ham = async () => {
    const response = await fetch(
      "http://localhost:8080/students/loginStudent",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    let res = await response.json();
    if (res.status) {
      cookies.set("id_student", id_student, { path: "/" });
      setToken(id_student);
    }
    // if (res.status) {
    //   <Redirect from="/auth/login" to="/user/index" />;
    // } else {
    //   console.log("hhhhhhh");
    // }
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Đăng nhập bằng tài khoản nhà trường cung cấp</small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Mã học sinh"
                    type="text"
                    value={id_student}
                    onChange={changeValueUsername}
                    autoComplete="new-email"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Mật khẩu"
                    type="password"
                    value={password_student}
                    autoComplete="new-password"
                    onChange={changeValuePassword}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button
                  className="my-4"
                  color="primary"
                  type="button"
                  onClick={ham}
                >
                  Đăng nhập
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Quên mật khẩu?</small>
            </a>
          </Col>
        </Row>
      </Col>
      {token ? (
        <Redirect from="/auth/login" to="/user/index" />
      ) : (
        <Redirect from="/auth/*" to="/auth/login" />
      )}
    </>
  );
};

export default Login;
