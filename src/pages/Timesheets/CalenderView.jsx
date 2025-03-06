import React, { useEffect, useState } from "react";
import {Navbar } from "../../components";
import Calendar from "../../components/Calender"; 
import { useNavigate, useLocation } from "react-router-dom";
import SecurityService from "../../services/SecurityService";

const CalenderView = () => {
  const [employeeId, setEmployeeId] = useState(''); // Selected employee ID
  const [data, setData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const currentUserRole = localStorage.getItem("role");
  useEffect(() => {
    // Check if employee ID is passed via query parameters
    const queryParams = new URLSearchParams(location.search);
    const initialEmployeeId = queryParams.get("employeeid") || localStorage.getItem("userId");
    setEmployeeId(initialEmployeeId);
  }, [location.search]);

  const fetchEmployees = async () => {
    try {
      const employees = await SecurityService.getAllEmployees();
      setData(employees);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDateClick = (date) => {
    navigate(`/timesheets?employeeid=${employeeId}&date=${date}`);
  };

  const handleDropdownChange = (event) => {
    const selectedId = event.target.value;
    setEmployeeId(selectedId);
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("employeeid", selectedId);
    navigate(`?${queryParams.toString()}`);
  };

  return (
    <>
      <Navbar />
      <div className="full-height-container">
        <div className="container my-1 py-1 content">
          <h3>Timesheets</h3>
          <div className="d-flex justify-content-between align-items-center my-3">
          {currentUserRole === "ADMIN" && (
            <div className="col-md-5">
              <select
                className="form-select"
                value={employeeId}
                onChange={handleDropdownChange}
              >
                <option value="">Select</option>
                {data.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          </div>

          <div className="container py-1 content">
            <Calendar onDateClick={handleDateClick} employeeId={employeeId} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CalenderView;


