import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = () => setShow(!show);

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast.warn("Please fill all the fields!", {
        position: "bottom",
        autoClose: 5000,
        closeOnClick: true,
      });
      setLoading(false);
      return;
    }

    if (password !== confirmpassword) {
      toast.warn("Passwords do not match!", {
        position: "bottom",
        autoClose: 5000,
        closeOnClick: true,
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        { name, email, password },
        config
      );
      toast.success("Registration Successful!", {
        position: "bottom",
        autoClose: 5000,
        closeOnClick: true,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred!", {
        position: "bottom",
        autoClose: 5000,
        closeOnClick: true,
      });
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white shadow-2xl rounded-xl p-10 max-w-4xl w-full space-y-8 transform scale-100 hover:scale-105 transition-transform duration-300 ">
        {/* Name and Welcome Message */}
        <div className="text-center">
          
          <p className="text-lg text-gray-600 mt-2">Welcome! Create your account below to get started.</p>
        </div>

        {/* Input Fields */}
        <div className="space-y-6">
          <div className="relative">
            <label className="block text-lg font-semibold text-gray-800">Name</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-md"
            />
            {name && (
              <button
                type="button"
                className="absolute top-10 right-3 text-gray-500 hover:text-gray-700"
                onClick={() => setName("")}
              >
                &#x2715;
              </button>
            )}
          </div>
          <div className="relative">
            <label className="block text-lg font-semibold text-gray-800">Email Address</label>
            <input
              type="email"
              placeholder="Enter Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-md"
            />
            {email && (
              <button
                type="button"
                className="absolute top-10 right-3 text-gray-500 hover:text-gray-700"
                onClick={() => setEmail("")}
              >
                &#x2715;
              </button>
            )}
          </div>
          <div className="relative">
            <label className="block text-lg font-semibold text-gray-800">Password</label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-md"
              />
              {password && (
                <button
                  type="button"
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setPassword("")}
                >
                  &#x2715;
                </button>
              )}
              <button
                type="button"
                onClick={handleClick}
                className="absolute inset-y-0 m-2 right-3 flex items-center px-4 text-gray-500"
              >
                {show ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="relative">
            <label className="block text-lg font-semibold text-gray-800">Confirm Password</label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmpassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-md"
              />
              {confirmpassword && (
                <button
                  type="button"
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setConfirmpassword("")}
                >
                  &#x2715;
                </button>
              )}
              <button
                type="button"
                onClick={handleClick}
                className="absolute inset-y-0 right-3 m-2 flex items-center px-4 text-gray-500"
              >
                {show ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button
            onClick={submitHandler}
            className={`w-full flex justify-center py-4 px-6 border border-transparent rounded-lg shadow-lg text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition-transform ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
            }`}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
