import React, {useState, useEffect} from "react";

// reactstrap components
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";

function DropdownFilter() {
  const [value, setValue] = useState(1);

  useEffect(() => {
  }, [value]) 
  return (
    <>
      <UncontrolledDropdown>
        <DropdownToggle
          caret
          color="secondary"
          id="dropdownMenuButton"
          type="button"
        >
          {value === 1 ? "Lớp" : (value === 2 ? "Môn" : "Giáo Viên")}
        </DropdownToggle>

        <DropdownMenu aria-labelledby="dropdownMenuButton">
          <DropdownItem onClick={() => setValue(1)}>Lớp</DropdownItem>
          <DropdownItem onClick={() => setValue(2)}>Môn</DropdownItem>
          <DropdownItem onClick={() => setValue(3)}>Giáo Viên</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  );
}

export default DropdownFilter;