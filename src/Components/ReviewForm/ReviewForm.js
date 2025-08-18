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

  const hasReview = (appointment) =>
    submittedReviews.some(
      (rev) =>
        rev.appointment.doctorName === appointment.doctorName &&
        rev.appointment.speciality === appointment.speciality
    );

  return (
    <div>
      <h2>Your Appointments</h2>
      <table border="1" cellPadding="8">
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
              <td>{appt.speciality}</td>
              <td>
                <button onClick={() => handleAddReviewClick(appt)}>
                  Add Review
                </button>
              </td>
              <td>{hasReview(appt) ? "✅ Yes" : "❌ No"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Review form csak ha választott appointment van */}
      {selectedAppointment && (
        <div style={{ marginTop: "20px" }}>
          <h3>Give Review for {selectedAppointment.doctorName}</h3>
          <p>
            <strong>Speciality:</strong> {selectedAppointment.speciality}
          </p>

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

            <button type="submit">Submit</button>
            <button type="button" onClick={() => setSelectedAppointment(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Beküldött reviewk listázása */}
      {submittedReviews.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h2>Submitted Reviews</h2>
          {submittedReviews.map((rev, idx) => (
            <div key={idx} className="review-card">
              <h4>{rev.appointment.doctorName}</h4>
              <p>
                <strong>Speciality:</strong> {rev.appointment.speciality}
              </p>
              <p>
                <strong>Name:</strong> {rev.name}
              </p>
              <p>
                <strong>Review:</strong> {rev.review}
              </p>
              <p>
                <strong>Rating:</strong> {"⭐".repeat(rev.rating)}
              </p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReviewForm;

