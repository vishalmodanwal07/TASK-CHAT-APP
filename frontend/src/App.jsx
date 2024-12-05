// Import default styles

import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Homepage/Homepage";
import Chatpage from "./pages/ChatPage/Chatpage";


function App() {


  return (
    
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/chats" element={<Chatpage/>}/>
      </Routes>
   
  );
}

export default App;
