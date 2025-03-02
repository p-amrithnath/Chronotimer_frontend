import React from "react";
import { Button, Modal, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from 'moment';

const RemarksPopup = ({ show, setShow, remarksData }) => {
  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Remarks</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Remark</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {remarksData.map((item) => (
              <tr key={item.id}>
                <td>{item.message}</td>
                <td>{moment(item.createdAt).format('Do MMMM YYYY, HH:mm')}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemarksPopup;