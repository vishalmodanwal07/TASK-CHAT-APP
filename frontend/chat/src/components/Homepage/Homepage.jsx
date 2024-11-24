import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Signup from "../../pages/Signup"; // Ensure correct path
import Login from "../../pages/Login"; // Ensure correct path
import "./Homepage.css"; // Include the CSS file

const Homepage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login"); // Default is Login tab

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) navigate("/chats"); // Redirect if user exists
  }, [navigate]);

  return (
    <div className="homepage-container">
      <div className="homepage-card">
        <h1 className="title">Welcome to Talk-A-Tive</h1>
        <p className="subtitle">Connect and communicate effortlessly</p>
        <div className="tabs-container">
          <div className="tabs">
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
            {activeTab === "login" && <Login />}
            {activeTab === "signup" && <Signup />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
