import React, { useState } from "react";
import Select from "react-select";
import { Footer, Navbar } from "../../components";
import BackButton from "../../components/BackButton";

const skillOptions = [
  { value: "Java", label: "Java" },
  { value: "Spring Boot", label: "Spring Boot" },
  { value: "Microservices", label: "Microservices" },
  { value: "React", label: "React" },
  { value: "Node.js", label: "Node.js" },
  // Add more skill options as needed
];

const TeamForm = () => {
  const [view, setView] = useState(true);
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

  const handleChange = (selectedOptions) => {
    setSelectedSkills(selectedOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name,
      email,
      password,
      roles,
      empDesg,
      salary,
      doj,
      departmentName,
      empType,
      yearsOfExperience,
      skillset: selectedSkills.map(skill => skill.value)
    };
    console.log(formData);
  };

  return (
    <>
    <Navbar />

       <div className="container  py-1">
         <BackButton/>
      <div className="container py-1 content">
        <div className="row my-4">
          <div className="col-md-5 col-lg-4 order-md-last"></div>       
          <div className="card mb-4">
            <div className="card-header py-3">
              <h4 className="mb-1">Member Details</h4>
            </div>
            <div className="card-body">
              <form className="needs-validation" noValidate onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-sm-6 my-1">
                    <label htmlFor="firstName" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      placeholder=""
                      required
                      readOnly={!view}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <div className="invalid-feedback">
                      Valid name is required.
                    </div>
                  </div>

                  <div className="col-sm-6 my-1">
                    <label htmlFor="lastName" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      placeholder=""
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="cc-name" className="form-label">
                      Designation
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cc-name"
                      placeholder=""
                      required
                      value={empDesg}
                      onChange={(e) => setEmpDesg(e.target.value)}
                    />
                    <div className="invalid-feedback">
                      Designation is required.
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="cc-number" className="form-label">
                      Department
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cc-number"
                      placeholder=""
                      required
                      value={departmentName}
                      onChange={(e) => setDepartmentName(e.target.value)}
                    />
                    <div className="invalid-feedback">
                      Department is required.
                    </div>
                  </div>

                  <div className="col-md-6 my-1">
                    <label htmlFor="country" className="form-label">
                      Role
                    </label>
                    <br />
                    <select
                      className="form-select"
                      id="country"
                      required
                      value={roles}
                      onChange={(e) => setRoles(e.target.value)}
                    >
                      <option value="">Choose...</option>
                      <option value="USER">USER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                    <div className="invalid-feedback">
                      Please select a valid role.
                    </div>
                  </div>
                  <div className="col-md-6 my-1">
                    <label htmlFor="zip" className="form-label">
                      Year Of Experience
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="zip"
                      placeholder=""
                      required
                      value={yearsOfExperience}
                      onChange={(e) => setYearsOfExperience(e.target.value)}
                    />
                    <div className="invalid-feedback">Years of experience required.</div>
                  </div>
                  <div className="col-md-6 my-1">
                    <label htmlFor="country" className="form-label">
                      Employment Type
                    </label>
                    <br />
                    <select
                      className="form-select"
                      id="country"
                      required
                      value={empType}
                      onChange={(e) => setEmpType(e.target.value)}
                    >
                      <option value="">Choose...</option>
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                    </select>
                    <div className="invalid-feedback">
                      Please select a valid employment type.
                    </div>
                  </div>
                  <div className="col-md-6 my-1">
                    <label htmlFor="cc-expiration" className="form-label">
                      Date of Joining
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="cc-expiration"
                      placeholder=""
                      required
                      value={doj}
                      onChange={(e) => setDoj(e.target.value)}
                    />
                    <div className="invalid-feedback">
                      Date of joining required.
                    </div>
                  </div>
                  <div className="col-md-6 my-1">
                    <label htmlFor="zip" className="form-label">
                      Password
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="zip"
                      placeholder=""
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="invalid-feedback">Password required.</div>
                  </div>
                  <div className="col-md-6 my-1">
                    <label htmlFor="zip" className="form-label">
                      Salary
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="zip"
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
                      onChange={handleChange}
                      classNamePrefix="select"
                      placeholder="Select skills..."
                      required
                    />
                    <div className="invalid-feedback">
                      Please select at least one skill.
                    </div>
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
      <Footer />
    </>
  );
};

export default TeamForm;