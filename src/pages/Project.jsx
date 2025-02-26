import React, { useState, useEffect } from "react";
import { Footer, Navbar } from "../components";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Project.css";

const Project = () => {
  const state = useSelector((state) => state.handleCart);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  const deleteEmp = (empid) => {
    setData(data.filter((emp) => emp.empid !== empid));
  };

  const EmptyCart = () => {
    return (
      <div className="container table-container">
        <p className="text-center">No data available</p>
      </div>
    );
  };

  const Project = ({ state }) => {
    // Calculate the indices for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total pages
    const totalPages = Math.ceil(data.length / itemsPerPage);

    return (
      <>
        <div className="container py-1 content">
          <div className="text-end">
            <NavLink to="/Project/add" className="btn btn-outline-dark m-2">
              <i className="fa fa-user-plus mr-1"></i>Add
            </NavLink>
          </div>

          <div className="row my-2 table-container">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>EmpId</th>
                  <th>EmpName</th>
                  <th>EmpSalary</th>
                  <th>Dept</th>
                  <th  className="center-align">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((emp) => (
                    <tr key={emp.empid}>
                      <td>{emp.empid}</td>
                      <td>{emp.empname}</td>
                      <td>{emp.salary}</td>
                      <td>{emp.dept}</td>
                      <td ml={1} className="center-align ">
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

         
         
        </div>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="full-height-container">
        <div className="container my-1 py-1 content">
          <h3>Projects</h3>
          <Project state={state} />
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Project;
