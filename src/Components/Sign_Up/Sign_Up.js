import React, { useState } from 'react';
import './Sign_Up.css';

function Sign_Up() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    const { name, phone, email, password } = formData;

    if (!name.trim()) {
      alert('Name is required.');
      return false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      alert('Phone number must be exactly 10 digits.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email.');
      return false;
    }

    if (!password.trim()) {
      alert('Password is required.');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Form submitted successfully!');
      // Ide jöhetne a backend hívás
    }
  };

  return (
    <div className="container" style={{ marginTop: '5%' }}>
      <div className="signup-grid">
        <div className="signup-text">
          <h1>Sign Up</h1>
        </div>
        <div className="signup-text1" style={{ textAlign: 'left' }}>
          Already a member? <span><a href="/login" style={{ color: '#2190FF' }}>Login</a></span>
        </div>
        <div className="signup-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input name="name" id="name" required className="form-control" placeholder="Enter your name" onChange={handleChange} />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input type="tel" name="phone" id="phone" required className="form-control" placeholder="Enter your phone number" onChange={handleChange} />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" required className="form-control" placeholder="Enter your email" onChange={handleChange} />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input name="password" id="password" required className="form-control" placeholder="Enter your password" onChange={handleChange} />
            </div>

            <div className="btn-group">
              <button type="submit" className="btn btn-primary mb-2 mr-1">Submit</button>
              <button type="reset" className="btn btn-danger mb-2">Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Sign_Up;
