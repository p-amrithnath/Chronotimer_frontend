import React, { useState } from "react";
import Select from "react-select";
import { Footer, Navbar } from "../../components";
import BackButton from "../../components/BackButton";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../axiosInstance";
import "./TeamForm.css";
import SecurityService from "../../services/SecurityService";

const skillOptions = [
  { value: "Java", label: "Java" },
  { value: "Spring Boot", label: "Spring Boot" },
  { value: "Microservices", label: "Microservices" },
  { value: "React", label: "React" },
  { value: "Node.js", label: "Node.js" },
];

const TeamForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const emp = location.state?.emp;

  const isEditMode = !!emp;

  const transformSkillset = (skills) => {
    return skills.map((skill) => ({ value: skill, label: skill }));
  };

  const [name, setName] = useState(emp?.name || "");
  const [email, setEmail] = useState(emp?.email || "");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState(emp?.roles || "");
  const [empDesg, setEmpDesg] = useState(emp?.empDesg || "");
  const [salary, setSalary] = useState(emp?.salary || "");
  const [doj, setDoj] = useState(emp?.doj || "");
  const [departmentName, setDepartmentName] = useState(
    emp?.departmentName || ""
  );
  const [empType, setEmpType] = useState(emp?.empType || "");
  const [yearsOfExperience, setYearsOfExperience] = useState(
    emp?.yearsOfExperience || ""
  );
  const [selectedSkills, setSelectedSkills] = useState(
    emp ? transformSkillset(emp.skillset) : []
  );

  const handleChange = (selectedOptions) => {
    setSelectedSkills(selectedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !email ||
      (!isEditMode && !password) || // Password required in add mode
      !roles ||
      !empDesg ||
      !salary ||
      !doj ||
      !departmentName ||
      !empType ||
      !yearsOfExperience ||
      selectedSkills.length === 0
    ) {
      toast.error("All fields are mandatory!");
      return;
    }

    const formData = {
      name,
      email,
      roles,
      empDesg,
      salary,
      doj,
      departmentName,
      empType,
      yearsOfExperience,
      skillset: selectedSkills.map((skill) => skill.value),
    };

    if (!isEditMode) {
      // Include password only when adding a new employee
      formData.password = password;
    }

    try {
      let response;
      if (isEditMode) {
        // Update existing employee
        response = await SecurityService.updateEmployee(emp.id, formData);
        toast.success("Updated successfully!");
      } else {
        // Add new employee
        response = await SecurityService.addEmployee(formData);
        if(response.data === 'Already Existing User is updated.')
        {
          toast.error("The user already exists!!!");
          return
        }
        toast.success("Added successfully!");
      }

      console.log("Data saved successfully:", response.data);
      navigate("/team");
    } catch (error) {
      console.error("There was an error saving the data!", error);
      toast.error("Failed to save data!");
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
                <h4 className="mb-1">
                  {isEditMode ? "Edit Member Details" : "Add New Member"}
                </h4>
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
                        htmlFor="firstName"
                        className="form-label required-field"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="col-sm-6 my-1">
                      <label
                        htmlFor="email"
                        className="form-label required-field"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    {!isEditMode && (
                      <div className="col-md-6 my-1">
                        <label
                          htmlFor="text"
                          className="form-label required-field"
                        >
                          Password
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    )}

                    <div className="col-md-6 my-1">
                      <label
                        htmlFor="roles"
                        className="form-label required-field"
                      >
                        Role
                      </label>
                      <select
                        className="form-select"
                        id="roles"
                        required
                        value={roles}
                        onChange={(e) => setRoles(e.target.value)}
                      >
                        <option value="">Choose...</option>
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                      </select>
                    </div>

                    <div className="col-md-6 my-1">
                      <label
                        htmlFor="empDesg"
                        className="form-label required-field"
                      >
                        Designation
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="empDesg"
                        required
                        value={empDesg}
                        onChange={(e) => setEmpDesg(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6 my-1">
                      <label
                        htmlFor="departmentName"
                        className="form-label required-field"
                      >
                        Department
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="departmentName"
                        required
                        value={departmentName}
                        onChange={(e) => setDepartmentName(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6 my-1">
                      <label
                        htmlFor="salary"
                        className="form-label required-field"
                      >
                        Salary
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="salary"
                        required
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6 my-1">
                      <label
                        htmlFor="yearsOfExperience"
                        className="form-label required-field"
                      >
                        Years of Experience
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="yearsOfExperience"
                        required
                        value={yearsOfExperience}
                        onChange={(e) =>
                          setYearsOfExperience(e.target.value)
                        }
                      />
                    </div>

                    <div className="col-md-6 my-1">
                      <label
                        htmlFor="empType"
                        className="form-label required-field"
                      >
                        Employment Type
                      </label>
                      <select
                        className="form-select"
                        id="empType"
                        required
                        value={empType}
                        onChange={(e) => setEmpType(e.target.value)}
                      >
                        <option value="">Choose...</option>
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                      </select>
                    </div>

                    <div className="col-md-6 my-1">
                      <label
                        htmlFor="doj"
                        className="form-label required-field"
                      >
                        Date of Joining
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="doj"
                        required
                        value={doj}
                        onChange={(e) => setDoj(e.target.value)}
                      />
                    </div>

                    <div className="col-md-12 my-1">
                      <label
                        htmlFor="skillset"
                        className="form-label required-field"
                      >
                        Skillset
                      </label>
                      <Select
                        id="skillset"
                        isMulti
                        options={skillOptions}
                        value={selectedSkills}
                        onChange={handleChange}
                        placeholder="Select skills..."
                      />
                    </div>
                  </div>

                  <hr className="my-4" />
                  <button className="w-100 btn btn-primary" type="submit">
                    {isEditMode ? "Update" : "Submit"}
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

export default TeamForm;
