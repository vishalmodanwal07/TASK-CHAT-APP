import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Signup from "../pages/Signup"; // Ensure correct path
import Login from "../pages/Login"; // Ensure correct path
import "./Homepage.css"; // Ensure the CSS file is included

const Homepage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login"); // Default is Login tab

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) navigate("/chats"); // Redirect if user exists
  }, [navigate]);

  return (
    <div className="homepage-container">
      <div className="header">
        <h1 className="title">Talk-A-Tive</h1>
      </div>
      <div className="tabs-container">
        <div className="tabs">
          {/* Tabs for switching between Login and Signup */}
          <button
            className={`tab ${activeTab === "login" ? "active" : ""}`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`tab ${activeTab === "signup" ? "active" : ""}`}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>
        </div>
        <div className="tab-content">
          {/* Render Login or Signup based on activeTab */}
          {activeTab === "login" && (
            <div className="tab-panel">
              <Login />
            </div>
          )}
          {activeTab === "signup" && (
            <div className="tab-panel">
              <Signup />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
