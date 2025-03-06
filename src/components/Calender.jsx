import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // Import the interaction plugin
import TimesheetsService from "../services/TimesheetsService";

const Calendar = ({ onDateClick, employeeId }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [localEmployeeId, setLocalEmployeeId] = useState(
    employeeId || localStorage.getItem("userId")
  ); // Default employee ID from local storage
  const [events, setEvents] = useState([]);

  const fetchMonthlyHours = async (month, year, empId) => {
    try {
      const monthlyHours = await TimesheetsService.getmonthlyTimesheet(
        month,
        year,
        empId
      );
      setEvents(monthlyHours);
      console.log("Monthly Hours:", monthlyHours);
    } catch (error) {
      console.error("Error fetching Monthly Hours:", error);
    }
  };

  useEffect(() => {
    const month = currentDate.getMonth() + 1; // getMonth() returns 0-11
    const year = currentDate.getFullYear();
    const empId = employeeId || localEmployeeId;
    fetchMonthlyHours(month, year, empId);
  }, [currentDate, employeeId, localEmployeeId]);

  const getStatusColor = (status) => {
    switch (status) {
      case "APPROVED":
        return "lightgreen";
      case "REJECTED":
        return "lightpink";
      case "PENDING":
        return "lightyellow";
      case "PARTIAL":
        return "lightblue";
      default:
        return "";
    }
  };

  const isFutureDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date > today; // Change from >= to >
  };

  const filteredEvents = events.filter(
    (event) => !isFutureDate(new Date(event.date))
  );

  const formattedEvents = filteredEvents.map((event) => ({
    title: `Hours: ${event.approvedHrs}`,
    start: event.date,
    backgroundColor: getStatusColor(event.status),
    borderColor: getStatusColor(event.status),
  }));

  const handleDateChange = (date) => {
    console.log("Specific date:", date);
    setCurrentDate(date);
  };

  const renderEventContent = (eventInfo) => {
    return (
      <div style={{ textAlign: "center", color: "black", fontWeight: "bold" }}>
        {eventInfo.event.title}
      </div>
    );
  };

  const dayCellClassNames = (date) => {
    return isFutureDate(date.date) ? "fc-disabled" : "fc-active";
  };

  return (
    <>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]} // Add interactionPlugin to plugins array
        initialView="dayGridMonth"
        events={formattedEvents}
        eventContent={renderEventContent}
        datesSet={(dateInfo) => {
          const startDate = new Date(dateInfo.start);
          const endDate = new Date(dateInfo.end);
          const middleDate = new Date(
            (startDate.getTime() + endDate.getTime()) / 2
          );
          handleDateChange(middleDate);
        }}
        dayCellClassNames={dayCellClassNames}
        dateClick={(info) => {
          if (!isFutureDate(info.date)) {
            onDateClick(info.dateStr);
          }
        }}
      />
      <style>
        {`
          .fc-disabled {
            pointer-events: none;
            opacity: 0.5;
          }
           
          .fc-active {
  
              }

          .fc-active:hover {
             background-color: lightyellow; 
            }
        `}
      </style>
    </>
  );
};

export default Calendar;
