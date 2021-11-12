import {Container, Row, Col} from 'react-bootstrap'
import {ChatBox} from 'react-chatbox-component';
import 'react-chatbox-component/dist/style.css';
import './detailstyle.css'
import NavbarComponent from "../../screens/common/Navbar/Navbar";

const messages = [
    {
      "text": "Có gì nói nhanh bố mày đang bận!",
      "id": "1",
      "sender": {
        "name": "Admin",
        "uid": "user1",
        "avatar": "https://www.pngkey.com/png/full/115-1150420_avatar-png-pic-male-avatar-icon-png.png",
      },
    },
    {
        "text": "Xin chào em có một số ý kiến như sau",
        "id": "2",
        "sender": {
          "name": "Phạm Kha",
          "uid": "user2",
          "avatar": "https://image.flaticon.com/icons/png/512/147/147144.png",
        },
    },
    {
        "text": "Tiết học hôm qua có một số vấn đề",
        "id": "3",
        "sender": {
          "name": "Phạm Kha",
          "uid": "user2",
          "avatar": "https://image.flaticon.com/icons/png/512/147/147144.png",
        },
    },
    {
        "text": "Trong tiết học không chú ý giờ ý kiến cc",
        "id": "3",
        "sender": {
          "name": "Phòng đào tạo",
          "uid": "user1",
          "avatar": "https://www.pngkey.com/png/full/115-1150420_avatar-png-pic-male-avatar-icon-png.png",
        },
    },
]

const ChatBoxDetail = () => {
    document.title = 'Hộp Thư Liên Hệ'
    return (
        <div className="ChatBoxDetail w-100">
            <NavbarComponent/>
            <Col className="w-100">
                <Row className="justify-content-center p-3">
                    <h4 id="title">Hộp Thư Liên Hệ</h4>
                </Row>
                <Row>
                    <Col className="p-0">
                        <ChatBox
                            messages={messages}
                        />
                    </Col>
                </Row>
            </Col>
        </div>
    )
}

export default ChatBoxDetail