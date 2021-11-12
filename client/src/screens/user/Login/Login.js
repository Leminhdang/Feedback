import React, { Componentn, useState } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import img from "../../user/Login/backg.png";
import "./Login.css";
function UserLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert("Đăng nhập thành công.");
  }

  return (
    <Container className="container">
      <Row className="row">
        <Col>
          <Image className={img} src={img} rounded/>
        </Col>
        <Col>
          <div className="Login">
            <h1>ĐĂNG NHẬP</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group size="lg" controlId="username">
                <Form.Label>Mã học sinh</Form.Label>
                <Form.Control
                  autoFocus
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="password">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Lưu mật khẩu" />
              </Form.Group>
              <Button block size="lg" type="submit" disabled={!validateForm()}>
                Login
              </Button>
              <br></br>
              <h2>Hello {username}</h2>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default UserLogin;
