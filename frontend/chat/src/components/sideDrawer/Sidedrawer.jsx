import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ChatState } from "../../context/Chatprovider";
import { getSender } from "../../config/ChatLogics";
import UserListItem from "../userAvatar/UserListItem";
import ChatLoading from "../ChatLoading";
import ProfileModal from "./ProfileModal";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import './SideDrawer.css';

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const handleSearch = async () => {
    if (!search) {
      alert("Please enter something in search");
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      alert("Error Occurred! Failed to Load the Search Results");
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
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
    } catch (error) {
      alert("Error fetching the chat");
    }
  };

  return (
    <div className="side-drawer">
      <div className="header">
        <button className="search-btn" onClick={() => document.getElementById("searchDrawer").classList.add("open")}>
          <i className="fas fa-search"></i>
          <span>Search User</span>
        </button>
        <h1 className="title">Talk-A-Tive</h1>
        <div className="user-menu">
          <div className="notification-bell">
            <NotificationBadge
              count={notification.length}
              effect={Effect.SCALE}
            />
            <i className="fas fa-bell"></i>
          </div>
          <div className="avatar-menu">
            <button className="avatar-btn">
              <img src={user.pic} alt={user.name} className="avatar-img" />
            </button>
            <div className="dropdown">
              <ProfileModal user={user}>
                <div className="dropdown-item">My Profile</div>
              </ProfileModal>
              <div className="dropdown-divider"></div>
              <div className="dropdown-item" onClick={logoutHandler}>Logout</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Drawer */}
      <div id="searchDrawer" className="search-drawer">
        <div className="search-drawer-header">
          <h3>Search Users</h3>
          <button onClick={() => document.getElementById("searchDrawer").classList.remove("open")}>Close</button>
        </div>
        <div className="search-drawer-body">
          <div className="search-input">
            <input
              type="text"
              placeholder="Search by name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={handleSearch}>Go</button>
          </div>
          {loading ? (
            <ChatLoading />
          ) : (
            searchResult?.map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => accessChat(user._id)}
              />
            ))
          )}
          {loadingChat && <div className="spinner">Loading...</div>}
        </div>
      </div>
    </div>
  );
}

export default SideDrawer;
