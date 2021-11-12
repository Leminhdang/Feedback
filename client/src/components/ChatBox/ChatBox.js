import {Container, Row, Col, ListGroup, Table} from 'react-bootstrap'
import NavbarComponent from "../Navbar/Navbar";

const ChatBoxScreen = () => {
    document.title = 'Hộp Thư Liên Hệ'
    return (
        <Container className="ChatBox p-0" fluid>
            <NavbarComponent/>
            <Col className="w-100">
                <Row className="justify-content-center p-3">
                    <h4>Hộp Thư Liên Hệ</h4>
                </Row>
                <Row>
                    <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Gửi từ</th>
                                <th>Nội dung</th>
                                <th>Ngày gửi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><a href="/chatbox/detail"><b>Phạm Kha</b></a></td>
                                <td><b>đóng góp ý kiến về giáo viên Nguyễn Văn A...</b></td>
                                <td>29/06/2021</td>
                            </tr>
                            <tr>
                                <td><a href="/chatbox/detail">Hoàng Văn Huỳnh</a></td>
                                <td>thông tin về thái độ của giáo viên...</td>
                                <td>27/06/2021</td>
                            </tr>
                            <tr>
                                <td><a href="/chatbox/detail">Ngô Quốc Tùng</a></td>
                                <td>phản hồi</td>
                                <td>27/06/2021</td>
                            </tr>
                            <tr>
                                <td><a href="/chatbox/detail">Nguyễn Thị Linh Chi</a></td>
                                <td>Ý kiến</td>
                                <td>27/06/2021</td>
                            </tr>
                        </tbody>
                        </Table>
                    </Col>
                </Row>
            </Col>
        </Container>
    )
}

export default ChatBoxScreen