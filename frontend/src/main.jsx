import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import ChatProvider from "./context/Chatprovider.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <ChatProvider>
    <App />
    <ToastContainer
      position="top-right" // Customize toast position
      autoClose={3000} // Close automatically in 3 seconds
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnHover
      draggable
    />
    </ChatProvider>
   
    </BrowserRouter>
   
    
   
  </StrictMode>
);
