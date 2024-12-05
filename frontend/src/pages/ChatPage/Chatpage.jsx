import axios from "axios";
import { useEffect, useState } from "react";

function Chatpage() {
    const [chats, setChats] = useState([]);

    const fetchChats = async () => {
        try {
            const response = await axios.get("/api/chats");
            console.log(response.data); // Log actual data
            setChats(response.data); // Set the actual data
        } catch (error) {
            console.error("Error fetching chats:", error);
        }
    };

    useEffect(() => {
        fetchChats();
    }, []);

    return (
        <div>
            {
                chats.map((chat) => (
                    <div key={chat._id}>{chat.chatName}</div>
                ))
            }
        </div>
    );
}

export default Chatpage;
