import { FormGroup, Input } from "reactstrap";
import React, { useState, useEffect } from "react";

const Render = (data) => {
  const [show, setShow] = useState(false);
  return (
    <>
      {data.list_criteria.map((item, index) => (
        <tr>
          <td>{index + 1}</td>
          <td style={{ textAlign: "left" }}>{item.tieuchi}</td>

          <td>
            <FormGroup check>
              <Input type="radio" value="2.5" name={index} id="radio1" />
            </FormGroup>
          </td>
          <td>
            <FormGroup check>
              <Input type="radio" value="5" name={index} id="radio2" />
            </FormGroup>
          </td>
          <td>
            <FormGroup check>
              <Input type="radio" value="7.5" name={index} id="radio3" />
            </FormGroup>
          </td>
          <td>
            <FormGroup check>
              <Input type="radio" value="10" name={index} id="radio4" />
            </FormGroup>
          </td>
        </tr>
      ))}
    </>
  );
};
export default Render;
