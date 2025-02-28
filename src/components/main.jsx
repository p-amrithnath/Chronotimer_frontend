import React from "react";
import "./main.css";

const Main = ({ employeeName }) => {
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good Morning";
    } else if (currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  return (
    <>
      <div className="card-img-overlay d-flex align-items-center justify-content-center overlay-background">
        <div className="card-img-overlay d-flex align-items-center justify-content-center">
          <div className="container text-center text-container">
          <h5 className="card-title fs-1 text fw-bold" style={{ fontFamily: 'Georgia, serif', letterSpacing: '2px' }}>{getGreeting()}, {employeeName || localStorage.getItem('name')}</h5>
            <p className="card-text fs-5 d-none d-sm-block" style={{fontStyle: 'italic', fontFamily: 'Times New Roman, serif',fontWeight: 'bold'}}>
              Let's track your work.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
