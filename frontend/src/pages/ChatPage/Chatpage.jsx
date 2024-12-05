import { ChatState } from "../../context/Chatprovider";
import SideDrawer from "../../components/SideDrawer";
import MyChats from "../../components/MyChats";
import ChatBox from "../../components/ChatBox";

function Chatpage() {
  const { user } = ChatState();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white">
      {/* Header Section */}
      <header className="shadow-lg">
        {user && <SideDrawer />}
      </header>

      {/* Main Chat Section */}
      <main className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full px-4 lg:px-9 py-6 gap-6">
        {/* Left Panel - MyChats */}
        {user && (
          <div className="w-full lg:w-1/3 bg-white text-black rounded-xl shadow-lg p-4">
            <MyChats />
          </div>
        )}

        {/* Right Panel - ChatBox */}
        {user && (
          <div className="w-full lg:w-2/3 bg-white text-black rounded-xl shadow-lg p-4">
            <ChatBox />
          </div>
        )}
      </main>
    </div>
  );
}

export default Chatpage;
