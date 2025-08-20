import React, { useState } from "react";
import "./ReviewForm.css";

function ReviewForm({ appointments }) {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [formData, setFormData] = useState({ name: "", review: "", rating: 0 });
  const [showWarning, setShowWarning] = useState(false);
  const [submittedReviews, setSubmittedReviews] = useState([]);

  const handleAddReviewClick = (appointment) => {
    setSelectedAppointment(appointment);
    setFormData({ name: "", review: "", rating: 0 });
    setShowWarning(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.review && formData.rating > 0) {
      const newReview = {
        ...formData,
        appointment: selectedAppointment,
      };
      setSubmittedReviews([...submittedReviews, newReview]);
      setSelectedAppointment(null);
    } else {
      setShowWarning(true);
    }
  };

  const getReviewForAppointment = (appointment) => {
    return submittedReviews.find(
      (rev) =>
        rev.appointment.doctorName === appointment.doctorName &&
        rev.appointment.doctorSpeciality === appointment.doctorSpeciality
    );
  };
  

  const hasReview = (appointment) =>
    submittedReviews.some(
      (rev) =>
        rev.appointment.doctorName === appointment.doctorName &&
        rev.appointment.doctorSpeciality === appointment.doctorSpeciality
    );

  return (
    <div>
      <h2>Your Appointments</h2>
      <div className="table-container">
        <table>
            <thead>
                <tr>
                    <th>Serial Number</th>
                    <th>Doctor Name</th>
                    <th>Doctor Speciality</th>
                    <th>Provide Feedback</th>
                    <th>Review Given</th>
                </tr>
            </thead>
            <tbody>
                {appointments.map((appt, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{appt.doctorName}</td>
                    <td>{appt.doctorSpeciality}</td>
                    <td>
                        {hasReview(appt) ? (
                          <button className="disabled-btn" disabled>
                            Already Reviewed
                          </button>
                        ) : (
                          <button onClick={() => handleAddReviewClick(appt)}>
                            Click Here
                          </button>
                        )}
                    </td>
                    <td>
                        {getReviewForAppointment(appt) ? (
                          <div className="review-card">
                            <p><strong>Name:</strong> {getReviewForAppointment(appt).name}</p>
                            <p><strong>Review:</strong> {getReviewForAppointment(appt).review}</p>
                            <p><strong>Rating:</strong> {"⭐".repeat(getReviewForAppointment(appt).rating)}</p>
                          </div>
                        ) : (
                            "❌ No"
                        )}
                    </td>
                  </tr>
                ))}
            </tbody>
        </table>
      </div>

      {/* Review form csak ha választott appointment van */}
      {selectedAppointment && (
        <div className="modal-overlay">
            <div className="modal">
                <h3>Give Review for {selectedAppointment.doctorName}</h3>
                <form onSubmit={handleSubmit}>
                    {showWarning && (
                      <p className="warning">Please fill out all fields.</p>
                    )}

                    <div>
                      <label htmlFor="name">Your Name:</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label htmlFor="review">Review:</label>
                      <textarea
                        id="review"
                        name="review"
                        value={formData.review}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label htmlFor="rating">Rating:</label>
                      <select
                        id="rating"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                      >
                        <option value="0" disabled>
                          -- Select --
                        </option>
                        <option value="1">⭐</option>
                        <option value="2">⭐⭐</option>
                        <option value="3">⭐⭐⭐</option>
                        <option value="4">⭐⭐⭐⭐</option>
                        <option value="5">⭐⭐⭐⭐⭐</option>
                      </select>
                    </div>

                    <div className="modal-buttons">
                      <button type="submit">Submit</button>
                      <button
                        type="button"
                        onClick={() => setSelectedAppointment(null)}
                        className="cancel-btn"
                      >
                        Cancel
                      </button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
}

export default ReviewForm;

