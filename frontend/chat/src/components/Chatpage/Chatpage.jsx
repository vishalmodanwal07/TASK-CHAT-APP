import  { useState } from "react";
import Chatbox from "../chatbox/Chatbox";
import Mychats from "../mychats/Mychats";
import Sidedrawer from "../sideDrawer/Sidedrawer";
import { ChatState } from "../../context/Chatprovider";
import "./Chatpage.css"; // Import the CSS file for styling

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div className="chatpage">
      {user && <Sidedrawer />}
      <div className="chatpage-container">
        {user && <Mychats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </div>
    </div>
  );
};

export default Chatpage;
