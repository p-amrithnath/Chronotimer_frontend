import React, { useState, useEffect } from "react";
import { Footer, Navbar } from "../../components";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Team.css";
import axios from "axios";
import SecurityService from "../../services/SecurityService";

const Team = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await SecurityService.getAllEmployees();
        console.log(response);
        setData(response);
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };

    fetchData();
  }, []);

  const deleteEmp = async (id) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete ?");
      if (confirm) {
        await SecurityService.deleteEmployee(id);
        setData(data.filter((emp) => emp.id !== id));
      }
    } catch (error) {
      console.error("There was an error deleting the data!", error);
    }
  };

  const handleEdit = (emp) => {
    navigate("/team/edit", { state: { emp } });
  };

  const TeamTable = () => {
    return (
      <>
        <div className="container py-1 content">
          <div className="text-end">
            <button
              className="btn btn-outline-dark m-2"
              onClick={() => navigate("/team/add")}
            >
              <i className="fa fa-user-plus mr-1"></i>Add
            </button>
          </div>

          <div className="row my-2 table-container">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Employee Name</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th className="center-align">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((emp) => (
                    <tr key={emp.id}>
                      <td>{emp.id}</td>
                      <td>{emp.name}</td>
                      <td>{emp.roles}</td>
                      <td>{emp.departmentName}</td>
                      <td ml={1} className="center-align">
                        <i
                          className="fas fa-trash-alt text-danger me-4"
                          onClick={() => deleteEmp(emp.id)}
                          style={{ cursor: "pointer" }}
                        ></i>
                        <i
                          className="fas fa-edit text-warning"
                          onClick={() => handleEdit(emp)}
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
          <h3>Team</h3>
          <TeamTable />
        </div>
      </div>
    </>
  );
};

export default Team;
