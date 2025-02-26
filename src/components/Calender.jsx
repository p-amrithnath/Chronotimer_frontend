import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // Import the interaction plugin

const Calendar = ({ onDateClick, employeeId }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [localEmployeeId, setLocalEmployeeId] = useState(localStorage.getItem('employeeId') || '12345'); // Default employee ID from local storage

  useEffect(() => {
    setLocalEmployeeId(employeeId); // Update local employee ID when prop changes
  }, [employeeId]);

  // Hardcoded data
  const events = [
    { date: '2025-02-27', hours: 8, status: 'APPROVED' },
    { date: '2025-02-02', hours: 6, status: 'REJECTED' },
    { date: '2025-02-03', hours: 7, status: 'PENDING' },
    { date: '2025-02-04', hours: 5, status: 'PENDING_FUTURE' },
    // Add more events as needed
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'APPROVED':
        return 'lightgreen';
      case 'REJECTED':
        return 'lightcoral';
      case 'PENDING':
        return 'lightpink';
      case 'PENDING_FUTURE':
        return 'lightyellow';
      default:
        return '';
    }
  };

  const isFutureDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date > today; // Change from >= to >
  };

  const filteredEvents = events.filter(event => !isFutureDate(new Date(event.date)));

  const formattedEvents = filteredEvents.map(event => ({
    title: `Hours: ${event.hours}`,
    start: event.date,
    backgroundColor: getStatusColor(event.status),
    borderColor: getStatusColor(event.status)
  }));

  const handleDateChange = (date) => {
    setCurrentDate(date);
  };

  const renderEventContent = (eventInfo) => {
    return (
      <div style={{ textAlign: 'center',color: 'black',fontWeight: 'bold' }}>
        {eventInfo.event.title}
      </div>
    );
  };

  const dayCellClassNames = (date) => {
    return isFutureDate(date.date) ? 'fc-disabled' : '';
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]} // Add interactionPlugin to plugins array
        initialView="dayGridMonth"
        events={formattedEvents}
        eventContent={renderEventContent}
        datesSet={(dateInfo) => handleDateChange(new Date(dateInfo.start))}
        dayCellClassNames={dayCellClassNames}
        dateClick={(info) => {
          if (!isFutureDate(info.date)) {
            onDateClick(info.dateStr);
          }
        }}
      />
      <div>
        <p>Current Employee ID: {localEmployeeId}</p>
      </div>
      <style>
        {`
          .fc-disabled {
            pointer-events: none;
            opacity: 0.5;
          }
          .fc-daygrid-day.fc-disabled .fc-daygrid-day-top {
            display: none;
          }
          .fc-daygrid-day.fc-disabled .fc-daygrid-day-events {
            display: none;
          }
        `}
      </style>
    </>
  );
};

export default Calendar;