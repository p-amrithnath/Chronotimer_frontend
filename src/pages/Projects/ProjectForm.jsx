import React, { useState } from "react";
import { Footer, Navbar } from "../../components";
import BackButton from "../../components/BackButton";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./ProjectForm.css";

const ProjectForm = () => {
  const [projName, setProjName] = useState("");
  const [type, setType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [closeDate, setCloseDate] = useState("");
  const [tam, setTam] = useState("");
  const [estimatedhrs, setEstimatedhrs] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
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
      toast.error("All fields are mandatory");
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
    console.log(formData);
    toast.success("Added Successfully");
    navigate("/Project");
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
                      <div className="invalid-feedback">
                        Valid project name is required.
                      </div>
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
                      </select>
                      <div className="invalid-feedback">
                        Please select a valid type.
                      </div>
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
                      <div className="invalid-feedback">
                        Start date required.
                      </div>
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
                      <div className="invalid-feedback">End date required.</div>
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
                        id="tam"
                        required
                        value={tam}
                        onChange={(e) => setTam(e.target.value)}
                      >
                        <option value="">Choose...</option>
                        <option value="John Doe">John Doe</option>
                        <option value="Jane Smith">Jane Smith</option>
                      </select>
                      <div className="invalid-feedback">
                        Please select a valid TAM.
                      </div>
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
                      <div className="invalid-feedback">
                        Estimated hours required.
                      </div>
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
                      <div className="invalid-feedback">
                        Description required.
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
      <ToastContainer />
    </>
  );
};

export default ProjectForm;
