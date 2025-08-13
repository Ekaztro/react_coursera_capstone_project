import React, { useState } from 'react'

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [selectedSlot, setSelectedSlot] = useState(null);
  
    const handleSlotSelection = (slot) => {
      setSelectedSlot(slot);
    };

    
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      const storedUsername = sessionStorage.getItem('email'); // ha van, bejelentkezett user

      const appointment = {
        doctorName,
        doctorSpeciality,
        name,
        phoneNumber,
        date: appointmentDate,
        time: appointmentTime
      };

      if (storedUsername) {
        // Bejelentkezett → tartós mentés, Notification látja
        localStorage.setItem(`appointment_${storedUsername}_${doctorName}`,JSON.stringify(appointment));
        onSubmit(appointment);
      } else {
        // Nincs bejelentkezés → csak ideiglenesen mentjük
      sessionStorage.setItem(`guestAppointment_${doctorName}`,JSON.stringify(appointment));
      }

      
      setName('');
      setPhoneNumber('');
      setAppointmentDate('');
      setAppointmentTime('');
    };

  
    return (
      <form onSubmit={handleFormSubmit} className="appointment-form">
        <h3>Book Appointment with Dr. {doctorName}</h3>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
        <label htmlFor="appointmentDate">Appointment Date:</label>
        <input
          type="date"
          id="appointmentDate"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="appointmentTime">Select Time Slot:</label>
        <select
          id="appointmentTime"
          value={appointmentTime}
          onChange={(e) => setAppointmentTime(e.target.value)}
          required
        >
          <option value="">-- Select a time --</option>
          <option value="09:00 AM">09:00 AM</option>
          <option value="10:30 AM">10:30 AM</option>
          <option value="12:00 PM">12:00 PM</option>
          <option value="03:00 PM">03:00 PM</option>
          <option value="05:00 PM">05:00 PM</option>
        </select>
      </div>
        <button type="submit">Book Now</button>
      </form>
    );
  };

export default AppointmentForm