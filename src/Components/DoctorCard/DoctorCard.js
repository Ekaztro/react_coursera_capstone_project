import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCard.css';
import AppointmentForm from './../AppointmentForm/AppointmentForm'
import { v4 as uuidv4 } from 'uuid';


const DoctorCard = ({ name, speciality, experience, ratings, profilePic, appointments, setAppointments }) => {
    const [showModal, setShowModal] = useState(false);
  
    // Megnézzük, hogy ehhez a dokihoz van-e foglalás
    const doctorAppointment = appointments.find(appt => appt.doctorName === name);
  
    const handleBooking = () => {
      setShowModal(true);
    };
  
    const handleCancel = (appointmentId) => {
      // Globális appointments state-ből töröljük
      const updated = appointments.filter(appt => appt.id !== appointmentId);
      setAppointments(updated);
  
      const storedUsername = sessionStorage.getItem('email');
      if (storedUsername) {
        localStorage.removeItem(`appointment_${storedUsername}_${name}`);
      } else {
        sessionStorage.removeItem(`guestAppointment_${name}`);
      }
    };
  
    const handleFormSubmit = (appointmentData) => {
      const newAppointment = {
        id: uuidv4(),
        doctorName: name,
        ...appointmentData,
      };
  
      setAppointments(prev => [...prev, newAppointment]);
  
      const storedUsername = sessionStorage.getItem('email');
      if (storedUsername) {
        localStorage.setItem(`appointment_${storedUsername}_${name}`, JSON.stringify(newAppointment));
      } else {
        sessionStorage.setItem(`guestAppointment_${name}`, JSON.stringify(newAppointment));
      }
  
      setShowModal(false);
    };

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16"> <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/> </svg>
        </div>
        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">{experience} years experience</div>
          <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
        </div>
        
        {/*<div>
            <button className='book-appointment-btn' onClick={handleBooking}>      
                <div>Book Appointment</div>
                <div>No Booking Fee</div>
            </button>
        </div>*/}
    </div>


      <div className="doctor-card-options-container">
       <Popup
          style={{ backgroundColor: '#FFFFFF' }}
          trigger={
            <button
            className={`book-appointment-btn ${doctorAppointment ? 'cancel-appointment' : ''}`}
            onClick={doctorAppointment ? () => handleCancel(doctorAppointment.id) : handleBooking}
          >
            {doctorAppointment ? <div>Cancel Appointment</div> : <div>Book Appointment</div>}
            <div>No Booking Fee</div>
          </button>
          }
          modal
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          {(close) => (
            <div className="doctorbg" style={{ height: '100vh', overflow: 'scroll' }}>
              <div>
                <div className="doctor-card-profile-image-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16"> <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/> </svg>
                </div>
                <div className="doctor-card-details">
                  <div className="doctor-card-detail-name">{name}</div>
                  <div className="doctor-card-detail-speciality">{speciality}</div>
                  <div className="doctor-card-detail-experience">{experience} years experience</div>
                  <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
                </div>
              </div>

              {doctorAppointment ? (
                <>
                  <h3 style={{ textAlign: 'center' }}>Appointment Booked!</h3>
                  <div className="bookedInfo" key={doctorAppointment.id}>
                    <p>Name: {doctorAppointment.name}</p>
                    <p>Phone Number: {doctorAppointment.phoneNumber}</p>
                    <button onClick={() => handleCancel(doctorAppointment.id)}>Cancel Appointment</button>
                  </div>
                </>
              ) : (
                <AppointmentForm doctorName={name} doctorSpeciality={speciality} onSubmit={handleFormSubmit} />
              )}
            </div>
          )}
        </Popup> 
        </div> 
    </div>
  );
};

export default DoctorCard;