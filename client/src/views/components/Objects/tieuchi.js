import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Button,
  Media,
} from "reactstrap";
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";

const cookie = new Cookies();

const deleteItem = (id) => {
  fetch(`http://localhost:8080/criteria/delete-criteria/${id}`, {
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
  console.log(data);
  const [show, setShow] = useState(false);
  return (
    <tr>
      <th scope="row">
        <Media className="align-items-center">
          <span className="mb-0 text-sm">{data.criteria_name}</span>
        </Media>
      </th>
      <td>{data.role == "0" ? "Chủ nhiệm" : "Bộ môn"}</td>
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
            <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
              <span className="text-success">Cập nhật</span>
            </DropdownItem>
            <DropdownItem
              href="#pablo"
              onClick={(e) => {
                deleteItem(data._id);
              }}
            >
              <span className="text-danger">Xóa</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
    </tr>
  );
};

export default Render;
