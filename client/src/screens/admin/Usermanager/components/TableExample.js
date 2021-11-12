import React from "react";

import { Table, Button } from "react-bootstrap";
export default function TableExample(props) {
  return (
    <Table responsive="sm" striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Ma hoc sinh</th>
          <th>Ten hoc sinh</th>
          <th>Lop</th>
          <th>Ten phu huynh</th>
          <th>Cai dat</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>
            <Button variant="warning" size="sm">
              Sua
            </Button>{" "}
            <Button variant="danger" size="sm">
              Xoa
            </Button>{" "}
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>
            <Button variant="warning" size="sm">
              Sua
            </Button>{" "}
            <Button variant="danger" size="sm">
              Xoa
            </Button>{" "}
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>
            <Button variant="warning" size="sm">
              Sua
            </Button>{" "}
            <Button variant="danger" size="sm">
              Xoa
            </Button>{" "}
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
