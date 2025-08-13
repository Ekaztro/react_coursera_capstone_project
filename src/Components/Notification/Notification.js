// Following code has been commented with appropriate comments for your reference.
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css';

// Function component Notification to display user notifications
const Notification = ({ children, appointments }) => {
    const [showNotification, setShowNotification] = useState(true);

    const isLoggedIn = Boolean(sessionStorage.getItem('email'));


  // Return JSX elements to display Navbar, children components, and appointment details if user is logged in
  return (
    <div>
      {/* Render Navbar component */}
      <Navbar ></Navbar>
      {/* Render children components */}
      {children}
      {/* Display appointment details if user is logged in and appointmentData is available */}
      {isLoggedIn && appointments.length > 0 && showNotification && (
        <div className="notification">
          {appointments.map((appt, index) => (
            <div className="appointment-card" key={index}>
                <div className="appointment-card__content">
                    <h3 className="appointment-card__title">Appointment Details</h3>
                    <p><strong>Doctor:</strong> {appt.doctorName}</p>
                    <p><strong>Speciality:</strong> {appt.doctorSpeciality}</p>
                    <p><strong>Patient:</strong> {appt.name}</p>
                    <p><strong>Phone:</strong> {appt.phoneNumber}</p>
                    <p><strong>Date:</strong> {appt.date}</p>
                    <p><strong>Time:</strong> {appt.time}</p>
                </div>
            </div>
          ))}
        </div>
      )}</div>
  );
};

// Export Notification component for use in other parts of the application
export default Notification;