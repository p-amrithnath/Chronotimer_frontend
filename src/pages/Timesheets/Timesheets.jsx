import React, { useState, useEffect } from "react";
import { Footer, Navbar } from "../../components";
import { NavLink ,useLocation} from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Timesheets.css";
import RemarksPopup from "../../components/RemarksPopup";
import TimeEntryPopup from "../../components/EditTimeentryPopup";
import BackButton from "../../components/BackButton";

const Timesheets = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [showTimeEntry, setShowTimeEntry] = useState(false);
  const [timeEntries, setTimeEntries] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const employeeId = queryParams.get('employeeid');
  const date = queryParams.get('date');

  useEffect(() => {
    // Fetch data or set initial data here
    setData([
      { empid: 1, empname: "John Doe", salary: 50000, dept: "IT" },
      { empid: 2, empname: "Jane Smith", salary: 60000, dept: "HR" },
      { empid: 1, empname: "John Doe", salary: 50000, dept: "IT" },
      { empid: 2, empname: "Jane Smith", salary: 60000, dept: "HR" },
      { empid: 1, empname: "John Doe", salary: 50000, dept: "IT" },
      { empid: 2, empname: "Jane Smith", salary: 60000, dept: "HR" },
      // Add more data as needed
    ]);
  }, []);

  const [remarksData, setRemarksData] = useState([
    { id: 1, remark: "Completed task A", date: "2025-02-20" },
    { id: 2, remark: "Meeting with team", date: "2025-02-21" },
    { id: 3, remark: "Reviewed project B", date: "2025-02-22" },
    // Add more data as needed
  ]);

  const deleteEmp = (empid) => {
    setData(data.filter((emp) => emp.empid !== empid));
  };

  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleShowTimeEntry = () => setShowTimeEntry(true);
  const handleCloseTimeEntry = () => setShowTimeEntry(false);
  const handleSaveTimeEntry = (entry) => {
    setTimeEntries([...timeEntries, entry]);
    console.log("Time entry saved:", entry);
  };


  const TimesheetTable = () => {
    return (
      <>
        <div className="container py-1 content">

<div className="d-flex justify-content-between align-items-center">
  <div >
    Employee Name: <strong>{employeeId}</strong>
    <span className="m-5" >Date: <strong>{date}</strong></span>
  </div>
  <div>
    <Button variant="outline-dark" className="m-2" onClick={handleShowTimeEntry}>
      <i className="fa fa-user-plus mr-1"></i>Add
    </Button>
    <Button variant="outline-dark" className="m-2" onClick={handleShow}>
      <i className="fa fa-comment mr-1"></i>Remarks
    </Button>
  </div>
</div>

          <div className="row my-2 table-container">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>EmpId</th>
                  <th>EmpName</th>
                  <th>EmpSalary</th>
                  <th>Dept</th>
                  <th className="center-align">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((emp) => (
                    <tr key={emp.empid}>
                      <td>{emp.empid}</td>
                      <td>{emp.empname}</td>
                      <td>{emp.salary}</td>
                      <td>{emp.dept}</td>
                      <td ml={1} className="center-align">
                        <i
                          className="fas fa-trash-alt text-danger me-4"
                          onClick={() => deleteEmp(emp.empid)}
                          style={{ cursor: "pointer" }}
                        ></i>
                        <i
                          className="fas fa-edit text-warning"
                          style={{ cursor: "pointer" }}
                        ></i>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="text-end">
            <NavLink to="/calender" className="btn btn-outline-dark m-2">
              <i className="fa fa-paper-plane mr-1"></i>Submit
            </NavLink>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="full-height-container">
        <div className="container my-1 py-1 content">
        <BackButton />
          <h3>Timesheet</h3>
          <TimesheetTable/>
        </div>
        {/* <Footer /> */}
      </div>

      {/* <Modal show={show} onHide={handleClose}> */}
        <RemarksPopup show={show} setShow={setShow} remarksData={remarksData} />
      {/* </Modal> */}

      {/* <Modal show={showTimeEntry} onHide={handleCloseTimeEntry}> */}
        <TimeEntryPopup show={showTimeEntry} setShow={setShowTimeEntry} onSave={handleSaveTimeEntry} />
      {/* </Modal> */}
    </>
  );
};

export default Timesheets;