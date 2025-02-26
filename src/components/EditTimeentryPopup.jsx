import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';

const TimeEntryPopup = ({ show, setShow, onSave }) => {
  const [projectName, setProjectName] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("PENDING");

  const resetFields = () => {
    setProjectName("");
    setFromTime("");
    setToTime("");
    setDescription("");
    setCategory("");
    setStatus("PENDING");
  };

  const handleClose = () => {
    resetFields();
    setShow(false);
  };

  const handleSave = (e) => {
    e.preventDefault(); // Prevent form submission

    // Check if all fields are filled
    if (!projectName || !fromTime || !toTime || !description || !category || !status) {
      toast.error("All fields are mandatory");
      return;
    }

    // Check if start time is before end time
    if (fromTime >= toTime) {
      toast.error("Start time must be before end time");
      return;
    }

    const hours = calculateHours(fromTime, toTime);
    const entry = {
      employeeId: 0,
      projectId: 0,
      category,
      taskDescription: description,
      date: new Date().toISOString().split("T")[0],
      startTime: `2025-01-27T${fromTime}:00`,
      endTime: `2025-01-27T${toTime}:00`,
      status,
      submit: false,
      hours,
    };
    onSave(entry);
    resetFields();
    setShow(false);
  };

  const calculateHours = (from, to) => {
    const fromDate = new Date(`1970-01-01T${from}:00`);
    const toDate = new Date(`1970-01-01T${to}:00`);
    const diff = (toDate - fromDate) / (1000 * 60 * 60);
    return diff > 0 ? diff.toFixed(2) : 0;
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Time Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSave}>
            <Form.Group controlId="formProjectName">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose...</option>
                <option>Development</option>
                <option>QA</option>
                <option>BA</option>
                <option>DevOps</option>
                <option>Research</option>
                <option>Meeting</option>
                <option>Others</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formFromTime">
              <Form.Label>From</Form.Label>
              <Form.Control
                type="time"
                value={fromTime}
                onChange={(e) => setFromTime(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formToTime">
              <Form.Label>To</Form.Label>
              <Form.Control
                type="time"
                value={toTime}
                onChange={(e) => setToTime(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>COMPLETED</option>
                <option>PENDING</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
            </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default TimeEntryPopup;