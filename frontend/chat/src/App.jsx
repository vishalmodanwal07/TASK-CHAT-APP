import { Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './components/Homepage';
import Chatpage from './components/Chatpage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/chats" element={<Chatpage />} />
      </Routes>
    </div>
  );
}

export default App;
