import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
} from "reactstrap";
import Cookies from "universal-cookie";
import UpdateStudent from "../UpdateStudent";
import React, { useState, useEffect } from "react";

const deleteItem = (id) => {
  let cookie = new Cookies();
  fetch(`http://localhost:8080/students/delete-student/${id}`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookie.get("token"),
    },
  });
  window.location.reload();
};

const Render = (data) => {
  const [show, setShow] = useState(false);
  let birthdate = new Date(data.date_of_birth);
  return (
    <tr>
      <td>{data.student_id}</td>
      <td>{data.fullname}</td>
      <td>{birthdate.toLocaleDateString()}</td>
      <td>{data.gender}</td>
      <td>{data.class_id ? data.class_id.class_name : ""}</td>
      <td className="text-right">
        <UncontrolledDropdown>
          <DropdownToggle
            className="btn-icon-only text-light"
            href="#pablo"
            role="button"
            size="sm"
            color=""
            onClick={(e) => e.preventDefault()}
          >
            <i className="fas fa-ellipsis-v" />
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-arrow" right>
            <DropdownItem href="#pablo" onClick={() => setShow(true)}>
              <span className="text-green">Cập nhật</span>
              {show && (
                <UpdateStudent studentInfo={data} closeModal={setShow} />
              )}
            </DropdownItem>

            <DropdownItem href="#pablo" onClick={(e) => deleteItem(data._id)}>
              <span className="text-danger">Xóa</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
    </tr>
  );
};

export default Render;
