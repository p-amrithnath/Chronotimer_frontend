import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Footer, Navbar } from "../../components";
import BackButton from "../../components/BackButton";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import "./Profile.css";
import LoginService from "../../services/SecurityService";

const skillOptions = [
  { value: "Java", label: "Java" },
  { value: "Spring Boot", label: "Spring Boot" },
  { value: "Microservices", label: "Microservices" },
  { value: "React", label: "React" },
  { value: "Node.js", label: "Node.js" },
];

const TeamForm = () => {
  const [emp, setEmp] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState("");
  const [empDesg, setEmpDesg] = useState("");
  const [salary, setSalary] = useState("");
  const [doj, setDoj] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [empType, setEmpType] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (userId) {
          const employeeData = await LoginService.getEmployeeById(userId);
          console.log("Employee:", employeeData);
          setEmp(employeeData);
          setName(employeeData.name);
          setEmail(employeeData.email);
          setPassword(employeeData.password);
          setRoles(employeeData.roles);
          setEmpDesg(employeeData.empDesg);
          setSalary(employeeData.salary);
          setDoj(employeeData.doj);
          setDepartmentName(employeeData.departmentName);
          setEmpType(employeeData.empType);
          setYearsOfExperience(employeeData.yearsOfExperience);
          setSelectedSkills(transformSkillset(employeeData.skillset));
        } else {
          console.log("UserID is not in local storage");
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData();
  }, []);

  const transformSkillset = (skills) => {
    return skills.map((skill) => ({ value: skill, label: skill }));
  };


  return (
    <>
      <Navbar />

      <div className="container  py-1">
        <BackButton />
        <div className="container py-1 content">
          <div className="row my-4">
            <div className="col-md-5 col-lg-4 order-md-last"></div>
            <div className="card mb-4">
              <div className="card-header py-3">
                <h4 className="mb-1">Profile</h4>
              </div>
              <div className="card-body">
                <form
                  className="needs-validation"
                  noValidate
                >
                  <div className="row g-3">
                    <div className="col-sm-6 my-1">
                      <label htmlFor="firstName" className="form-label ">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        readOnly={true}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="col-sm-6 my-1">
                      <label htmlFor="lastName" className="form-label ">
                        Email
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        readOnly={true}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="cc-name" className="form-label ">
                        Designation
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cc-name"
                        readOnly={true}
                        value={empDesg}
                        onChange={(e) => setEmpDesg(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="cc-number" className="form-label">
                        Department
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cc-number"
                        readOnly={true}
                        value={departmentName}
                        onChange={(e) => setDepartmentName(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 my-1">
                      <label htmlFor="country" className="form-label">
                        Role
                      </label>
                      <br />
                      <input
                        type="text"
                        className="form-control"
                        id="cc-number"
                        readOnly={true}
                        value={roles}
                      />
                    </div>

                    <div className="col-md-6 my-1">
                      <label htmlFor="zip" className="form-label ">
                        Year Of Experience
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="zip"
                        readOnly={true}
                        value={yearsOfExperience}
                        onChange={(e) => setYearsOfExperience(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6 my-1">
                      <label htmlFor="country" className="form-label">
                        Employment Type
                      </label>
                      <br />
                      <input
                        type="text"
                        className="form-control"
                        id="country"
                        readOnly={true}
                        value={empType}
                        onChange={(e) => setYearsOfExperience(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6 my-1">
                      <label htmlFor="cc-expiration" className="form-label">
                        Date of Joining
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="cc-expiration"
                        readOnly={true}
                        placeholder=""
                        required
                        value={doj}
                        onChange={(e) => setDoj(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 my-1">
                      <label htmlFor="zip" className="form-label">
                        Salary
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="zip"
                        readOnly={true}
                        placeholder=""
                        required
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                      />
                      <div className="invalid-feedback">Salary required.</div>
                    </div>
                    <div className="col-md-6 my-1">
                      <label htmlFor="skillset" className="form-label">
                        Skillset
                      </label>
                      <Select
                        id="skillset"
                        isMulti
                        options={skillOptions}
                        value={selectedSkills}
                        isDisabled={true} // Use isDisabled instead of disabled
                        classNamePrefix="select"
                        placeholder="Select skills..."
                        required
                      />
                    </div>
                  </div>
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
