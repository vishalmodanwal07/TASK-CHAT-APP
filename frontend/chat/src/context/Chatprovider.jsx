import  { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate for react-router-dom v6+

const ChatContext = createContext();

// eslint-disable-next-line react/prop-types
const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();

  const navigate = useNavigate(); // Updated from useHistory to useNavigate

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    
    setUser(userInfo);

    if (!userInfo) {
      navigate("/"); // Updated to use navigate
    }
  }, [navigate]); // Properly added navigate as a dependency

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
