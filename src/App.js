import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import custom Navbar component
import Navbar from './Components/Navbar/Navbar';
import Landing_Page from './Components/Landing_Page/Landing_Page';
import Sign_Up from './Components/Sign_Up/Sign_Up';
import Login from './Components/Login/Login';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation';
import BookingConsultation from './Components/BookingConsultation';
import Notification from './Components/Notification/Notification';


// Function component for the main App
function App() {

    const [appointments, setAppointments] = useState([]);

  // Betöltéskor visszaolvassuk a foglalásokat local/sessionStorage-ből
  useEffect(() => {
    const storedUsername = sessionStorage.getItem('email');
    let allAppointments = [];

    if (storedUsername) {
      // összes kulcs localStorage-ban, ami appointment_... kezdetű
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(`appointment_${storedUsername}_`)) {
          const data = JSON.parse(localStorage.getItem(key));
          if (data) allAppointments.push(data);
        }
      }
    } else {
      // vendég foglalások
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key.startsWith(`guestAppointment_`)) {
          const data = JSON.parse(sessionStorage.getItem(key));
          if (data) allAppointments.push(data);
        }
      }
    }

    setAppointments(allAppointments);
  }, []);


  // Render the main App component
  return (
    <div className="App">
        {/* Set up BrowserRouter for routing */}
        <BrowserRouter>
          {/* Display the Navbar component */}
          <Navbar/>
          <Notification appointments={appointments}>
            <Routes>
                <Route path="/" element={<Landing_Page appointments={appointments} setAppointments={setAppointments}/>} />
                <Route path="/signup" element={<Sign_Up />} />
                <Route path="/login" element={<Login />} />
                <Route path="/booking-consultation" element={<BookingConsultation appointments={appointments} setAppointments={setAppointments} />} />
                <Route path="/instant-consultation" element={<InstantConsultation />} />
            </Routes>
          </Notification>
        </BrowserRouter>
    </div>
  );
}

// Export the App component as the default export
export default App;