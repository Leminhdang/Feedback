import React, { useState, useEffect } from "react";
// react component that copies the given text inside your clipboard
// reactstrap components
import {
  Container,
  Table,
  Row,
  Button
} from "reactstrap";

import Cookies from "universal-cookie";
import {useParams} from "react-router-dom";

const Detail = () => {
  let cookies = new Cookies();
  let {id} = useParams();
  const [_id, set_Id] = useState(id);
  const [feedbacks, setFeedbackData] = useState([]);
  let resultArray = [];
  let flag = true;

  const getFeedBack = async () => {
    const response = await fetch("http://localhost:8080/feedback", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.get("token"),
      },
    });

    let res = await response.json();
    setFeedbackData(res);
  };

  useEffect(() => {
    const subcribe = () => {
      set_Id(id);
      getFeedBack();
    }

    return subcribe();
  }, []);

  const updateDisable = () => {
    fetch("http://localhost:8080/feedback/updateDisable", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.get("token"),
      },
      body: JSON.stringify({note: _id})
    });
    
    window.location.reload();
  }

  if(feedbacks.length > 0){
    resultArray = feedbacks.filter(e => e.note == _id);
  }

  document.title = "Chi tiết";
  return (
    <>
      <Container className="p-3" fluid>
          <Row className="text-center">
            <h3>Thống kê chi tiết về phiếu: {_id}</h3>

            <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Mã học sinh</th>
                      {resultArray[0] != undefined ? (
                        resultArray[0].list_criteria.map((c) => <th scope="col">{"T.Chí `" + c.tieuchi + "`"}</th>)
                      ) : (
                        <></>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {resultArray.length > 0 ? (
                      resultArray.map((c) => <tr>
                         <th scope="col">{c.id_student}</th>
                         {resultArray[0].list_criteria.length > 0 ? (
                            resultArray[0].list_criteria.map((e) => <th scope="col" className={e.diem < 3.5 ? "text-danger" : (e.diem < 5 ? "text-warning" : (e.diem < 7.5 ? "text-primary" : "text-success"))}>{e.diem}</th>)
                          ) : (
                            <></>
                          )}
                      </tr>)
                    ) : (
                      <></>
                    )}
                  </tbody>
            </Table>
          </Row>
          <hr/>
          {feedbacks[feedbacks.length - 1] != undefined ? (cookies.get("role") != 3 && feedbacks[feedbacks.length - 1].disabled ? <Button className="btn btn-default" onClick={updateDisable}>Gửi kết quả chi tiết về giáo viên</Button> : <></>) : <></>}
          
      </Container>
    </>
  );
};

export default Detail;
