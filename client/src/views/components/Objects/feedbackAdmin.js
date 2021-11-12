import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
} from "reactstrap";
import Cookies from "universal-cookie";
import UpdateStudent from "../UpdateStudent";
import React, { useState, useEffect } from "react";
let cookies = new Cookies();

const deleteItem = (note) => {
  fetch(`http://localhost:8080/feedback/delete-feedback/${note}`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.get("token"),
    },
  });
  window.location.reload();
};

const Render = (data) => {
  const [show, setShow] = useState(false);
  let dateCreate = new Date(data.date_created);
  const role = cookies.get("role");
  return (
    <tr>
      <td>{data.note}</td>
      <td>{data.id_class ? data.id_class.class_name : ""}</td>
      <td>{data.id_teacher ? data.id_teacher.fullname : ""}</td>
      <td>{data.role_criteria == "0" ? "Chủ Nhiệm" : "Bộ Môn"}</td>
      <td>{data.id_subject ? data.id_subject.subject_name : ""}</td>

      <td>{dateCreate.toLocaleDateString()}</td>

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
            {data.disabled && role === "3" ? (
              <></>
            ) : (
              <DropdownItem
                href={"/admin/evaluate/detail/" + data.note.toString()}
                onClick={() => {
                  setShow(true);
                }}
              >
                <span className="text-green">Chi tiết</span>
              </DropdownItem>
            )}

            <DropdownItem href="#pablo" onClick={(e) => deleteItem(data.note)}>
              <span className="text-danger">Xóa</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
    </tr>
  );
};

export default Render;
