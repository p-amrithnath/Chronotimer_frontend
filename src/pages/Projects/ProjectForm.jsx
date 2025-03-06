import React, { useState, useEffect } from "react";
import { Footer, Navbar } from "../../components";
import BackButton from "../../components/BackButton";
import { toast } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import "./ProjectForm.css";
import projectService from "../../services/ProjectService";
import SecurityService from "../../services/SecurityService";

const ProjectForm = () => {
  const location = useLocation();
  const project = location.state?.project;
  const [projName, setProjName] = useState(project?.projName || "");
  const [type, setType] = useState(project?.type || "");
  const [startDate, setStartDate] = useState(project?.startDate || "");
  const [closeDate, setCloseDate] = useState(project?.closeDate || "");
  const [tam, setTam] = useState(project?.tam || "");
  const [estimatedhrs, setEstimatedhrs] = useState(project?.estimatedhrs || "");
  const [description, setDescription] = useState(project?.description || "");
  const [id, setId] = useState(project?.id || null);
  const [data, setData] = useState([]);

  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !projName ||
      !type ||
      !startDate ||
      !closeDate ||
      !tam ||
      !estimatedhrs ||
      !description
    ) {
      toast.error("All fields are mandatory!");
      return;
    }

    const formData = {
      projName,
      type,
      startDate,
      closeDate,
      tam,
      estimatedhrs,
      description,
    };

    if (id) {
      formData.id = id; // Include the id for editing
    }

    try {
      let response;
      if (id) {
        response = await projectService.updateProject(formData); // Call update API if id is present
        console.log("Project updated successfully:", response.data);
        toast.success("Updated successfully!");
      } else {
        response = await projectService.saveProject(formData); // Call save API if id is not present
        console.log("Project added successfully:", response.data);
        toast.success("Added successfully!");
      }
      navigate("/Project");
    } catch (error) {
      console.error("There was an error saving the project!", error);
      toast.error("Failed to save project!");
    }
  };
  return (
    <>
      <Navbar />
      <div className="container py-1">
        <BackButton />
        <div className="container py-1 content">
          <div className="row my-4">
            <div className="col-md-5 col-lg-4 order-md-last"></div>
            <div className="card mb-4">
              <div className="card-header py-3">
                <h4 className="mb-1">Project Details</h4>
              </div>
              <div className="card-body">
                <form
                  className="needs-validation"
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <div className="row g-3">
                    <div className="col-sm-6 my-1">
                      <label
                        htmlFor="projName"
                        className="form-label required-field"
                      >
                        Project Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="projName"
                        placeholder=""
                        required
                        value={projName}
                        onChange={(e) => setProjName(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 my-1">
                      <label
                        htmlFor="type"
                        className="form-label required-field"
                      >
                        Type
                      </label>
                      <br />
                      <select
                        className="form-select"
                        id="type"
                        required
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                      >
                        <option value="">Choose...</option>
                        <option value="TNM">TNM</option>
                        <option value="Fixed">Fixed</option>
                        <option value="Dedicated">Dedicated</option>
                        <option value="Development">Development</option>
                      </select>
                    </div>
                    <div className="col-md-6 my-1">
                      <label
                        htmlFor="startDate"
                        className="form-label required-field"
                      >
                        Start Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="startDate"
                        placeholder=""
                        required
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 my-1">
                      <label
                        htmlFor="closeDate"
                        className="form-label required-field"
                      >
                        End Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="closeDate"
                        placeholder=""
                        required
                        value={closeDate}
                        onChange={(e) => setCloseDate(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 my-1">
                      <label
                        htmlFor="tam"
                        className="form-label required-field"
                      >
                        TAM
                      </label>
                      <br />
                      <select
                        className="form-select"
                        value={tam}
                        onChange={(e) => setTam(e.target.value)}
                      >
                        <option value="">Select</option>
                        {data.map((employee) => (
                          <option key={employee.id} value={employee.name}>
                            {employee.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6 my-1">
                      <label
                        htmlFor="estimatedhrs"
                        className="form-label required-field"
                      >
                        Estimated Hours
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="estimatedhrs"
                        placeholder=""
                        required
                        value={estimatedhrs}
                        onChange={(e) => setEstimatedhrs(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 my-1">
                      <label
                        htmlFor="description"
                        className="form-label required-field"
                      >
                        Description
                      </label>
                      <textarea
                        rows={5}
                        className="form-control"
                        id="description"
                        placeholder="Enter your message"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>
                  <hr className="my-4" />
                  <button className="w-100 btn btn-primary" type="submit">
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectForm;
