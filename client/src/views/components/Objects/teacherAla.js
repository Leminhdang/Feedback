import Cookies from "universal-cookie";
import React, { useState, useEffect } from "react";
const cookies = new Cookies();

const Teacher = (data) => {
  const [show, setShow] = useState(false);
  const [dat, setDat] = useState([]);
  let diemTB = 0;
  let index = 0;
  let tot = 0;

  useEffect(() => {
    const getData = async () => {
        const response = await fetch("http://localhost:8080/feedback/feedbackByTeacher", {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({"id_teacher": data._id})
        });
        let res = await response.json();
        if (res) {
            setDat(res);
        }
    };
  
    return getData();
  }, [])
  
  dat.forEach(e => {
    e.list_criteria.forEach(i => {
      if(i.diem){
        diemTB = parseInt(i.diem) + parseInt(diemTB);
        if(i.diem > 5){
          tot++;
        }
        index++;
      }
    })
  })

  diemTB = diemTB / index;
  
  return (
    <tr>
        <th scope="row">{data.fullname}</th>
        <td>{index}</td>
        <td>{tot}</td>
        <td>
            {diemTB.toFixed(1)}
        </td>
    </tr>
  );
};

export default Teacher;
