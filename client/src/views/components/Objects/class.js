import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Button,
} from "reactstrap";
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import UpdateClass from "../UpdateClass";

const cookie = new Cookies();
// deo xai
const deleteItem = (id) => {
  fetch(`http://localhost:8080/classes/delete-class/${id}`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookie.get("token"),
    },
  });
  window.location.reload();
};

const Render = (data, { index }) => {
  const [show, setShow] = useState(false);
  return (
    <tr key={data._id}>
      <td>{index + 1}</td>
      <td>{data.class_name}</td>
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
              {show && <UpdateClass classInfo={data} closeModal={setShow} />}
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
