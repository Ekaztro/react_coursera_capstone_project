import React, { useState, useEffect } from "react";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import "./ProfileCard.css";

function ProfileCard() {
  const [profile, setProfile] = useState({ name: "", email: "", phone: "" });
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(profile);
  const navigate = useNavigate();

  // Betöltés az API-ból
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const authToken = sessionStorage.getItem("auth-token");
        const email = sessionStorage.getItem("email");
        if (!authToken || !email) {
          navigate("/login");
          return;
        }

        const response = await fetch(`${API_URL}/api/auth/user`, {
          headers: {
            "Authorization": `Bearer ${authToken}`,
            "Email": email,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch profile");

        const user = await response.json();
        setProfile(user);
        setFormData(user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const authToken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");
      if (!authToken || !email) {
        navigate("/login");
        return;
      }

      const response = await fetch(`${API_URL}/api/auth/user`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "Content-Type": "application/json",
          "Email": email,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      setProfile(formData);
      setEditing(false);

      // Frissítjük a sessionStorage-t is
      sessionStorage.setItem("name", formData.name);
      sessionStorage.setItem("phone", formData.phone);

      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Error updating profile");
    }
  };

  return (
    <div className="profile-container">
      {!editing ? (
        <div className="profile-details">
          <h2>Profile Details</h2>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <button onClick={() => setEditing(true)}>Edit Profile</button>
        </div>
      ) : (
        <form onSubmit={handleSave}>
          <h1>Edit Profile</h1>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
            />
          </label>
          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Save</button>
        </form>
      )}
    </div>
  );
}

export default ProfileCard;
