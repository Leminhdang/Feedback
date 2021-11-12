import Cookies from "universal-cookie";
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
} from "reactstrap";
import UpdateTeacher from "../UpdateTeacher";
import React, { useState, useEffect } from "react";
const cookies = new Cookies();

const deleteItem = (id) => {
  fetch(`http://localhost:8080/teachers/delete-teacher/${id}`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.get("token"),
    },
  });
  window.location.reload();
};

const Teacher = (data) => {
  const [show, setShow] = useState(false);

  return (
    <tr>
      <td>{data.teacher_id}</td>
      <td>{data.fullname}</td>

      <td>{data.gender}</td>
      <td>{data.subject_id ? data.subject_id.subject_name : "Không có"}</td>
      <td>{data.formteacher ? "Giáo viên chủ nhiệm" : "Giáo viên bộ môn"}</td>

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
                <UpdateTeacher teacherInfo={data} closeModal={setShow} />
              )}
            </DropdownItem>

            <DropdownItem href="#pablo" onClick={() => deleteItem(data._id)}>
              <span className="text-danger">Xóa</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
    </tr>
  );
};

export default Teacher;
