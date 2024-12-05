/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChatState } from "../context/Chatprovider";
import UserListItem from "./UserListItem";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, chats, setChats, setSelectedChat, notification, setNotification } = ChatState();

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast.warn("Please enter something in search", { position: "top-left", autoClose: 5000 });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to load the search results!", { position: "bottom-left", autoClose: 5000 });
      setLoading(false);
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post('/api/chat', { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      setDrawerOpen(false);
    } catch (error) {
      toast.error("Error fetching the chat!", { position: "bottom-left", autoClose: 5000 });
      setLoadingChat(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.id === "drawer-overlay") {
      setDrawerOpen(false);
    }
  };

  return (
    <div className="w-full bg-white flex justify-between items-center px-6 py-4 shadow-md">
      {/* Search Button */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="text-3xl text-black font-medium hover:bg-white hover:text-purple-600 px-4 py-2 rounded-lg transition duration-200"
      >
        Search User
      </button>

      {/* Title */}
      <h1 className="text-5xl font-bold h-20 flex justify-center items-center text-blue-500">CHAT-ACTIVE</h1>

      {/* Notifications and User Menu */}
      <div className="flex items-center space-x-6">
        {/* Notifications */}
        <div className="relative group">
          <button className="hover:text-purple-500 text-black text-3xl">
            Notifications ({notification.length})
          </button>
          <div className=" text-3xl  font-medium absolute mt-2 right-0 bg-white text-black rounded-lg shadow-lg w-72 p-4 hidden group-hover:block">
            {notification.length > 0 ? (
              notification.map((notif) => (
                <div
                  key={notif._id}
                  className="p-2 text-black hover:bg-gray-100 cursor-pointer rounded-md"
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New message in ${notif.chat.chatName}`
                    : `New message from ${notif.chat.users[0].name}`}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No new messages</p>
            )}
          </div>
        </div>

        {/* User Menu */}
        <div className="relative group">
          <button className="hover:text-purple-500 text-black text-3xl">{user.name}</button>
          <div className="absolute mt-2 right-0 bg-white text-black rounded-lg shadow-lg w-40 p-2 hidden group-hover:block">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md"
              onClick={logoutHandler}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Drawer */}
      {drawerOpen && (
        <div
          id="drawer-overlay"
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-10 flex"
          onClick={handleOverlayClick}
        >
          <div className="w-80 bg-white text-black p-6 h-full overflow-y-auto shadow-xl relative">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={() => setDrawerOpen(false)}
            >
              &#x2715;
            </button>

            <h2 className="text-lg font-semibold mb-4">Search Users</h2>
            <div className="flex space-x-2 mb-4">
              <input
                type="text"
                placeholder="Search by name or email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                onClick={handleSearch}
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-200"
              >
                Go
              </button>
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
          </div>
        </div>
      )}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default SideDrawer;
