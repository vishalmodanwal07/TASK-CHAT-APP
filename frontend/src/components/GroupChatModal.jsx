import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { ChatState } from "../context/Chatprovider";
import UserBadgeItem from "./UserBadgeItem";
import UserListItem from "./UserListItem";

const GroupChatModal = ({ isOpen, onClose }) => {
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, chats, setChats } = ChatState();

  // Handle adding users to the group
  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast.error("User already added.");
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  // Handle user search
  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) return;

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${query}`, config);
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch search results." ,error);
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!groupChatName || selectedUsers.length === 0) {
      toast.error("Please provide a group name and select users.");
      return;
    }
  
    if (!user?.token) {
      toast.error("User token is missing. Please log in again.");
      return;
    }
  
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
  
      const userIds = selectedUsers.map((u) => u._id);
  
      console.log("Users being sent to server:", userIds);
  
      const { data } = await axios.post(
        "/api/chat/group",
        {
          name: groupChatName,
          users: JSON.stringify(userIds), // Ensure it's stringified for server's expectation
        },
        config
      );
  
      console.log("Response from server:", data);
  
      setChats([data, ...chats]);
      toast.success("Group chat created successfully!");
      onClose();
    } catch (error) {
      console.error("Error during handleSubmit:", error.response?.data || error.message);
      toast.error("Failed to create the group chat.");
    }
  };
  
  

  const handleDeleteUser = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  if (!isOpen) return null; // If modal is not open, return nothing

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg w-full max-w-lg">
        {/* Modal Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Create Group Chat</h2>
          <button
            className="text-gray-500 hover:text-black"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4">
          <div className="mb-3">
            <input
              type="text"
              placeholder="Enter Group Chat Name"
              className="w-full border px-3 py-2 rounded"
              value={groupChatName}
              onChange={(e) => setGroupChatName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Search users to add"
              className="w-full border px-3 py-2 rounded"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap mb-3">
            {selectedUsers.map((user) => (
              <UserBadgeItem
                key={user._id}
                user={user}
                handleFunction={() => handleDeleteUser(user)}
              />
            ))}
          </div>

          {loading ? (
            <div>Loading...</div>
          ) : (
            searchResult.slice(0, 5).map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => handleGroup(user)}
              />
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupChatModal;
