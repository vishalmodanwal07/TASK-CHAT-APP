import { useState } from "react";
import { motion } from "framer-motion";
import Login from "../Authpage/Login"; // Assuming Login component exists
import Signup from "../Authpage/Signup"; // Assuming Signup component exists

function Homepage() {
  const [activeTab, setActiveTab] = useState("login");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex justify-center items-center min-h-screen overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 p-6">
      <motion.div
        className="bg-white rounded-3xl shadow-lg w-full max-w-5xl p-10 m-10 md:p-10 lg:p-12 overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{
          minHeight: "75vh", // Card height
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header Section */}
        <header className="text-center mb-8">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-4"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            CHAT-ACTIVE
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl font-medium text-gray-500"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Connect and communicate effortlessly
          </motion.p>
        </header>

        {/* Tab Buttons */}
        <motion.div
          className="flex justify-center w-full max-w-xs mx-auto mb-8 space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <button
            onClick={() => handleTabChange("login")}
            className={`w-1/2 py-2 md:py-3 text-sm md:text-lg font-semibold rounded-lg ${
              activeTab === "login"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 text-blue-600"
            } transform hover:scale-105 transition-all duration-300 focus:outline-none`}
          >
            Login
          </button>
          <button
            onClick={() => handleTabChange("signup")}
            className={`w-1/2 py-2 md:py-3 text-sm md:text-lg font-semibold rounded-lg ${
              activeTab === "signup"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 text-blue-600"
            } transform hover:scale-105 transition-all duration-300 focus:outline-none`}
          >
            Sign Up
          </button>
        </motion.div>

        {/* Form Section */}
        <motion.div
          className="flex-grow flex items-center justify-center"
          key={activeTab}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === "login" && <Login />}
          {activeTab === "signup" && <Signup />}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Homepage;
