import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getSender } from "../config/Chatlogic";
import "react-toastify/dist/ReactToastify.css";
import { ChatState } from "../context/Chatprovider";
import GroupChatModal from "./GroupChatModal";

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);

      // Show success toast
      toast.success("Chats loaded successfully!", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      // Show error toast
      toast.error("Failed to load chats!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      },error);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, []);

  return (
    <div
      className={`${
        selectedChat ? "hidden md:flex" : "flex"
      } flex-col items-center p-4  bg-white w-full h-screen rounded-lg shadow-lg border`}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between w-full pb-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">My Chats</h2>
        <GroupChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
        <button className="bg-teal-500 text-white px-4 py-1 rounded-lg text-sm hover:bg-teal-600"
         onClick={() => setIsModalOpen(true)}>
          New Group Chat
        </button>
      
      </div>

      {/* Chats Section */}
      <div className="flex flex-col mt-4 bg-gray-100 w-full h-full rounded-lg overflow-hidden">
        {chats ? (
          <div className="overflow-y-auto space-y-2 p-3">
            {chats.map((chat) => (
              <div
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                className={`cursor-pointer px-4 py-2 rounded-lg transition-all duration-200 ${
                  selectedChat === chat
                    ? "bg-teal-500 text-white shadow-md"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                <p className="truncate">
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyChats;
