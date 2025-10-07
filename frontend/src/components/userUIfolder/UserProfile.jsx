import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login");

        const response = await axios.get(
          "http://localhost:4000/api/auth/profile",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setUser(response.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  if (!user) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      {/* 🔙 Back to Dashboard Button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Profile</h2>
        <button 
          className="btn btn-success" 
          onClick={() => navigate("/Home")}
        >
          🏠 Back to Dashboard
        </button>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-header bg-success text-white">
          <h5 className="mb-0">Profile Details</h5>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-3 fw-bold">Full Name:</div>
            <div className="col-md-9">{user.name || "Not provided"}</div>
          </div>
          <div className="row mb-3">
            <div className="col-md-3 fw-bold">Email:</div>
            <div className="col-md-9">{user.email || "Not provided"}</div>
          </div>
          <div className="row mb-3">
            <div className="col-md-3 fw-bold">City:</div>
            <div className="col-md-9">{user.city || "Not provided"}</div>
          </div>
          <div className="row mb-3">
            <div className="col-md-3 fw-bold">Region / State:</div>
            <div className="col-md-9">{user.region || "Not provided"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

