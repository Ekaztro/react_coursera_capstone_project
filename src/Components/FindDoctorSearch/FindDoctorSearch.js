import React, { useState, useRef, useEffect } from 'react';
import './FindDoctorSearch.css';
import { useNavigate } from 'react-router-dom';

const initSpeciality = [
  'Dentist',
  'Gynecologist/obstetrician',
  'General Physician',
  'Dermatologist',
  'Ear-nose-throat (ent) Specialist',
  'Homeopath',
  'Ayurveda',
];

const FindDoctorSearch = ({ onSearch }) => {
  const [doctorResultHidden, setDoctorResultHidden] = useState(true);
  const [searchDoctor, setSearchDoctor] = useState('');
  const [specialities] = useState(initSpeciality);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const handleDoctorSelect = (speciality) => {
    setSearchDoctor(speciality);
    setDoctorResultHidden(true);

    // 🔁 Ha a szülő (pl. InstantConsultation) adott onSearch-et, akkor hívjuk meg
    if (typeof onSearch === 'function') {
      onSearch(speciality);
    }

    // 🔀 Navigálás új URL-re, de nem töltjük újra az oldalt
    navigate(`/booking-consultation?speciality=${speciality}`);
  };

  // 👂 Figyeljük, ha a felhasználó a keresőn kívül kattint
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setDoctorResultHidden(true);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="finddoctor">
      <center>
        <h1>Find a doctor and Consult instantly</h1>
        <div>
          <i
            style={{ color: '#000000', fontSize: '20rem' }}
            className="fa fa-user-md"
          ></i>
        </div>
        <div
          className="home-search-container"
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <div className="doctor-search-box" ref={containerRef}>
            <input
              type="text"
              className="search-doctor-input-box"
              placeholder="Search doctors, clinics, hospitals, etc."
              onFocus={() => setDoctorResultHidden(false)}
              value={searchDoctor}
              onChange={(e) => setSearchDoctor(e.target.value)}
            />
            <div className="findiconimg">
              <img
                className="findIcon"
                src={process.env.PUBLIC_URL + '/images/search.svg'}
                alt=""
              />
            </div>
            <div className="search-doctor-input-results" hidden={doctorResultHidden}>
              {specialities
                .filter((speciality) =>
                  speciality.toLowerCase().includes(searchDoctor.toLowerCase())
                )
                .map((speciality) => (
                  <div
                    className="search-doctor-result-item"
                    key={speciality}
                    onMouseDown={() => handleDoctorSelect(speciality)}
                  >
                    <span>
                      <img
                        src={process.env.PUBLIC_URL + '/images/search.svg'}
                        alt=""
                        style={{ height: '10px', width: '10px' }}
                      />
                    </span>
                    <span>{speciality}</span>
                    <span>SPECIALITY</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </center>
    </div>
  );
};

export default FindDoctorSearch;