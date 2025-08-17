// Following code has been commented with appropriate comments for your reference.
import React, { useState } from 'react';
import "./ReviewForm.css";

// Function component for giving reviews
function ReviewForm() {
    const [showForm, setShowForm] = useState(false);
    const [submittedMessage, setSubmittedMessage] = useState(null);
    const [showWarning, setShowWarning] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      review: '',
      rating: 0
    });

  // Function to handle button click event
  const handleButtonClick = () => {
    setShowForm(true);
  };

  // Function to handle form input changes
  const handleChange = (e) => {
    // Update the form data based on user input
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.review && formData.rating > 0) {
      setSubmittedMessage(formData);
      setShowWarning(false);
      setShowForm(false);
    } else {
      setShowWarning(true);
    }
  };

  return (
    <div>
      <h2>Feedback Form</h2>

      {!showForm && !submittedMessage && (
        <button onClick={handleButtonClick}>Open Form</button>
      )}

      {showForm && !submittedMessage && (
        <form onSubmit={handleSubmit}>
          <h2>Give Your Feedback</h2>
          {showWarning && <p className="warning">Please fill out all fields.</p>}

          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="review">Review:</label>
            <textarea id="review" name="review" value={formData.review} onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="rating">Rating:</label>
            <select id="rating" name="rating" value={formData.rating} onChange={handleChange}>
              <option value="0" disabled>-- Select --</option>
              <option value="1">⭐</option>
              <option value="2">⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="5">⭐⭐⭐⭐⭐</option>
            </select>
          </div>

          <button type="submit">Submit</button>
        </form>
      )}

      {submittedMessage && (
        <div>
          <h3>Submitted Review:</h3>
          <p><strong>Name:</strong> {submittedMessage.name}</p>
          <p><strong>Review:</strong> {submittedMessage.review}</p>
          <p><strong>Rating:</strong> {"⭐".repeat(submittedMessage.rating)}</p>
        </div>
      )}
    </div>
  );
}

export default ReviewForm;
