import { useState } from "react";
import "./Homepage.css";

function Homepage() {
  const [isLogin, setIsLogin] = useState(true);

  // State for Login form fields
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // State for Signup form fields
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle input changes dynamically
  const handleInputChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === "login") {
      setLoginData((prev) => ({ ...prev, [name]: value }));
    } else if (formType === "signup") {
      setSignupData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit handlers for login and signup
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", loginData);
    // Add your login logic here
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", signupData);
    // Add your signup logic here
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Toggle Buttons */}
        <div className="auth-toggle">
          <button
            className={`toggle-btn ${isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`toggle-btn ${!isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </button>
        </div>

        {/* Conditional Rendering of Forms */}
        <div className="form-wrapper">
          {isLogin ? (
            <div className="form-container">
              <h2>Login</h2>
              <form onSubmit={handleLoginSubmit}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="auth-input"
                  value={loginData.email}
                  onChange={(e) => handleInputChange(e, "login")}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="auth-input"
                  value={loginData.password}
                  onChange={(e) => handleInputChange(e, "login")}
                  required
                />
                <button type="submit" className="auth-btn">
                  Login
                </button>
                <button type="button" className="guest-btn">
                  Get Guest User Credentials
                </button>
              </form>
            </div>
          ) : (
            <div className="form-container">
              <h2>Signup</h2>
              <form onSubmit={handleSignupSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="auth-input"
                  value={signupData.name}
                  onChange={(e) => handleInputChange(e, "signup")}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="auth-input"
                  value={signupData.email}
                  onChange={(e) => handleInputChange(e, "signup")}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="auth-input"
                  value={signupData.password}
                  onChange={(e) => handleInputChange(e, "signup")}
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="auth-input"
                  value={signupData.confirmPassword}
                  onChange={(e) => handleInputChange(e, "signup")}
                  required
                />
                <button type="submit" className="auth-btn">
                  Signup
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
