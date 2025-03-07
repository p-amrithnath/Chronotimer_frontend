import React, { useState, useEffect } from "react";
import {Navbar } from "../../components";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Project.css";
import projectService from "../../services/ProjectService"; // Corrected import
import { format} from 'date-fns';

const ProjectPage = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleEdit = (project) => {
    navigate('/project/edit', { state: { project } });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projects = await projectService.getAllProjects();
        setData(projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchData();
  }, []);

  const deleteProject = async (projectId) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete ?");
      if(confirm){
      await projectService.deleteProject(projectId);
      setData(data.filter((project) => project.id !== projectId));
      }
    } catch (error) {
      console.error(`Error deleting project with ID ${projectId}:`, error);
    }
  };

  const ProjectList = () => {
    return (
      <div className="container py-1 content">
        <div className="text-end">
            <button
              className="btn btn-outline-dark m-2"
              onClick={() => navigate("/Project/add")}
            >
              <i className="fa fa-user-plus mr-1"></i>Add
            </button>
          </div>

        <div className="row my-2 table-container">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Project Id</th>
                <th>Project Name</th>
                <th>Type</th>
                <th>Start Date</th>
                <th>Estimated Hours</th>
                <th className="center-align">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((project) => (
                  <tr key={project.id}>
                    <td>{project.id}</td>
                    <td>{project.projName}</td>
                    <td>{project.type}</td>
                    <td>{format(project.startDate, 'dd-MM-yyyy')}</td>
                    <td>{project.estimatedhrs}</td>
                    <td className="center-align">
                      <i
                        className="fas fa-trash-alt text-danger me-4"
                        onClick={() => deleteProject(project.id)}
                        style={{ cursor: "pointer" }}
                      ></i>
                      <i
                        className="fas fa-edit text-warning"
                        onClick={() => handleEdit(project)}
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
    );
  };

  return (
    <>
      <Navbar />
      <div className="full-height-container">
        <div className="container my-1 py-1 content">
          <h3>Projects</h3>
          <ProjectList />
        </div>
      </div>
    </>
  );
};

export default ProjectPage;