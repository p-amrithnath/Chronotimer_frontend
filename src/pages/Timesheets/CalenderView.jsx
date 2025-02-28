// import React, { useEffect, useState } from "react";
// import { Footer, Navbar } from "../../components";
// import Calendar from "../../components/Calender"; 
// import { NavLink, useNavigate } from "react-router-dom";
// import SecurityService from "../../services/SecurityService";

// const CalenderView = () => {
//   const [employeeId, setEmployeeId] = useState(localStorage.getItem('userId')); // Initialize with localStorage value or empty string
//   const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
//   const [selectedDate, setSelectedDate] = useState(null);
//   const navigate = useNavigate();
//   const [data, setData] = useState([]);

//   const fetchEmployees = async () => {
//     try {
//       const employees = await SecurityService.getAllEmployees();
//       console.log("Employees:", employees);
//       setData(employees);
//     } catch (error) {
//       console.error('Error fetching employees:', error);
//     }
//   };

//   useEffect(() => {
//     if (employeeId) {
//       fetchEmployees();
//     }
//   }, [employeeId]);

//   const handleDateClick = (date) => {
//     setSelectedDate(date);
//     console.log('Selected date:', date);
//     const empIdToUse = selectedEmployeeId || employeeId;
//     navigate(`/timesheets?employeeid=${empIdToUse}&date=${date}`);
//   };

//   const handleChange = (event) => {
//     const selectedId = event.target.value;
//     setEmployeeId(selectedId);
//     setSelectedEmployeeId(selectedId);
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="full-height-container">
//         <div className="container my-1 py-1 content">
//           <h3>Timesheets</h3><br />
//           <div className="d-flex justify-content-between align-items-center my-1">
//             <div className="col-md-5">
//               <select
//                 className="form-select"
//                 id="employeeId"
//                 required
//                 value={employeeId}
//                 onChange={handleChange}
//                 onClick={fetchEmployees} // Trigger API call on dropdown click
//               >
//                 <option value=''>Select</option>
//                 {data.map((employee) => (
//                   <option key={employee.id} value={employee.id}>
//                     {employee.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <NavLink to="" className="btn btn-outline-dark m-1">
//                 <i className="fa fa-user-plus mr-1"></i>Apply
//               </NavLink>
//             </div>
//           </div>

//           <div className="container py-1 content">
//             <div className="row my-3 table-container">
//               <Calendar onDateClick={handleDateClick} employeeId={employeeId} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CalenderView;

import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "../../components";
import Calendar from "../../components/Calender"; 
import { useNavigate, useLocation } from "react-router-dom";
import SecurityService from "../../services/SecurityService";

const CalenderView = () => {
  const [employeeId, setEmployeeId] = useState(''); // Selected employee ID
  const [data, setData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

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
