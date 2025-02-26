import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import Calendar from "../components/Calender"; 
import { NavLink,useNavigate } from "react-router-dom";

const CalenderView = () => {
  const [employeeId, setEmployeeId] = useState(localStorage.getItem('employeeId') || '12345'); // Define the state for tam
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  const handleDateClick = (date) => {
    setSelectedDate(date);
    console.log('Selected date:', date);
    navigate(`/timesheets?employeeid=${employeeId}&date=${date}`);
  };
  return (
    <>
      <Navbar />
      <div className="full-height-container">
        <div className="container my-1 py-1 content">
          <h3>Timesheets</h3><br />
          <div className="d-flex justify-content-between align-items-center my-1">
            <div className="col-md-5">
              <select
                className="form-select"
                id="employeeId" // Provide a valid id
                required
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
              >
                <option value="">Employee Name</option>
                <option value="John Doe">John Doe</option>
                <option value="Jane Smith">Jane Smith</option>
              </select>
            </div>
            <div>
              <NavLink to="" className="btn btn-outline-dark m-1">
                <i className="fa fa-user-plus mr-1"></i>Apply
              </NavLink>
            </div>
          </div>

          <div className="container py-1 content">
            <div className="row my-3 table-container">
            <Calendar onDateClick={handleDateClick} employeeId={employeeId}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalenderView;