import React, { useState, useEffect } from "react";
import { Navbar } from "../../components";
import { useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Timesheets.css";
import toast from "react-hot-toast";
import RemarksPopup from "../../components/RemarksPopup";
import TimeEntryPopup from "../../components/EditTimeentryPopup";
import BackButton from "../../components/BackButton";
import TimeentryService from "../../services/TimeentryService";

const Timesheets = () => {
  // Initialize state with default structures
  const [data, setData] = useState({
    timeentries: [],
    remarks: [],
    timesheets: {},
  });
  const [show, setShow] = useState(false);
  const [showTimeEntry, setShowTimeEntry] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [selectedEntries, setSelectedEntries] = useState([]);
  const [remarksData, setRemarksData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const employeeId = queryParams.get("employeeid");
  const date = queryParams.get("date");

  useEffect(() => {
    if (employeeId && date) {
      fetchTimesheetData(employeeId, date);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeId, date, refresh]);

  const fetchTimesheetData = async (employeeId, date) => {
    try {
      const response = await TimeentryService.findByDateAndEmployeeId(
        employeeId,
        date
      );
      console.log("Fetched data:", response);

      // Ensure response has expected structure
      setData({
        timeentries: response.timeentries || [],
        remarks: response.remarks || [],
        timesheets: response.timesheets || {},
      });
      setRemarksData(response.remarks || []);
    } catch (error) {
      console.error("Error fetching timesheet data:", error);
    }
  };

  const deleteEmp = async (id) => {
    try {
      await TimeentryService.deleteTimeEntry(id);
      setData((prevData) => ({
        ...prevData,
        timeentries: prevData.timeentries.filter((entry) => entry.id !== id),
      }));
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error deleting time entry:", error);
    }
  };

  const submitTimeEntries = async () => {
    try {
      await TimeentryService.submitTimeentries(employeeId, date);
      setRefresh(!refresh);
      alert("Time entries submitted successfully!");
    } catch (error) {
      console.error("Error submitting time entries:", error);
      alert("Failed to submit time entries.");
    }
  };

  const handleApproveReject = async (status) => {
    if (selectedEntries.length === 0) {
      toast.error("No entries are selected");
      return;
    }

    const message = prompt(`Enter a remark for ${status}:`);

    if (message) {
      try {
        const request = {
          timeentryIds: selectedEntries,
          status: status,
          timesheetId: data.timesheets.id,
          message: message,
          createdAt: new Date().toISOString(),
          createdBy: localStorage.getItem("userId"),
        };
        console.log("Request for approve/reject:", request);
        await TimeentryService.approveReject(request);
        alert(`Time entries ${status} successfully!`);
        // Refresh data after action
        setRefresh(!refresh);
      } catch (error) {
        console.error(`Error ${status} time entries:`, error);
        alert(`Failed to ${status} time entries.`);
      }
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedEntries((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((entryId) => entryId !== id)
        : [...prevSelected, id]
    );
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleShowTimeEntry = (entry = null) => {
    setCurrentEntry(entry);
    setShowTimeEntry(true);
  };

  const handleCloseTimeEntry = () => {
    setCurrentEntry(null);
    setShowTimeEntry(false);
  };

  const handleSaveTimeEntry = async (entry) => {
    try {
      if (entry.id) {
        // Update existing entry
        const updatedEntry = await TimeentryService.updateTimeEntry(
          entry.id,
          entry
        );
        setData((prevData) => ({
          ...prevData,
          timeentries: prevData.timeentries.map((e) =>
            e.id === entry.id ? updatedEntry : e
          ),
        }));
      } else {
        // Add new entry
        entry.employeeId = employeeId;
        entry.date = date; // Ensure the date is set

        console.log("New entry:", entry);
        const newEntry = await TimeentryService.createTimesheet(entry);
        setData((prevData) => ({
          ...prevData,
          timeentries: [...prevData.timeentries, newEntry],
        }));
      }
      setRefresh(!refresh); // Toggle the refresh state to re-trigger useEffect
      handleCloseTimeEntry();
    } catch (error) {
      console.error("Error saving time entry:", error);
    }
  };

  const TimesheetTable = () => {
    return (
      <>
        <div className="container py-1 content">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              Employee Name: <strong>{employeeId}</strong>
              <span className="m-5">
                Date: <strong>{date}</strong>
              </span>
            </div>
            <div>
              <Button
                variant="outline-dark"
                className="m-2"
                onClick={() => handleShowTimeEntry()}
              >
                <i className="fa fa-user-plus mr-1"></i>Add
              </Button>
              {remarksData.length > 0 && (
                <Button
                  variant="outline-dark"
                  className="m-2"
                  onClick={handleShow}
                >
                  <i className="fa fa-comment mr-1"></i>Remarks
                </Button>
              )}
            </div>
          </div>

          <div className="row my-2 table-container">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Project Id</th>
                  <th>Category</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Hours</th>
                  <th>Task Description</th>
                  <th>Status</th>
                  <th className="center-align">Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(data.timeentries) &&
                data.timeentries.length > 0 ? (
                  data.timeentries.map((timeentry) => {
                    if (!timeentry) return null; // Skip if undefined
                    return (
                      <tr key={timeentry.id}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedEntries.includes(timeentry.id)}
                            onChange={() => handleCheckboxChange(timeentry.id)}
                          />
                        </td>
                        <td>{timeentry.projectId}</td>
                        <td>{timeentry.category}</td>
                        <td>{timeentry.startTime}</td>
                        <td>{timeentry.endTime}</td>
                        <td>{timeentry.hours}</td>
                        <td>{timeentry.taskDescription}</td>
                        <td>
                          {timeentry.submit ? "Submitted" : "Pending"}
                        </td>
                        <td ml={1} className="center-align">
                          {timeentry.submit ? null : (
                            <>
                              <i
                                className="fas fa-trash-alt text-danger me-4"
                                onClick={() => deleteEmp(timeentry.id)}
                                style={{ cursor: "pointer" }}
                              ></i>
                              <i
                                className="fas fa-edit text-warning"
                                onClick={() => handleShowTimeEntry(timeentry)}
                                style={{ cursor: "pointer" }}
                              ></i>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={9} className="text-center">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="text-end">
            <Button
              onClick={() => handleApproveReject("approved")}
              variant="outline-dark"
              className="m-2"
            >
              <i className="fa fa-check mr-1"></i>Approve
            </Button>
            <Button
              onClick={() => handleApproveReject("rejected")}
              variant="outline-dark"
              className="m-2"
            >
              <i className="fa fa-times mr-1"></i>Reject
            </Button>
            <Button
              onClick={submitTimeEntries}
              variant="outline-dark"
              className="m-2"
            >
              <i className="fa fa-paper-plane mr-1"></i>Submit
            </Button>
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
          <BackButton />
          <h3>Timesheet</h3>
          <TimesheetTable />
        </div>
      </div>

      <RemarksPopup
        show={show}
        setShow={setShow}
        remarksData={remarksData}
      />

      <TimeEntryPopup
        show={showTimeEntry}
        setShow={setShowTimeEntry}
        onSave={handleSaveTimeEntry}
        entry={currentEntry}
        timeEntryDate={date}
      />
    </>
  );
};

export default Timesheets;


