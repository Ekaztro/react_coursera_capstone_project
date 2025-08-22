import React from "react";
import "./ReportsLayout.css";

function ReportsLayout({ appointments = [] }) {

  const handleViewReport = () => {
    // Megnyitja a PDF-et új fülön
    window.open("/patient_report.pdf", "_blank");
  };

  return (
    <div>
      <h2>Your Reports</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Doctor Name</th>
              <th>Doctor Speciality</th>
              <th>View Report</th>
              <th>Download Report</th>
            </tr>
          </thead>
          <tbody>
            {(appointments || []).map((appt, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{appt.doctorName}</td>
                <td>{appt.doctorSpeciality}</td>
                <td>
                    <button onClick={handleViewReport}>View Report</button>
                </td>
                <td>
                    <a href="/patient_report.pdf" download className="download-btn">
                      Download Report
                    </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReportsLayout;
