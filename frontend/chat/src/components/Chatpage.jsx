import axios from "axios"
import { useState , useEffect } from "react"

function Chatpage(){
   const [chats , setChats] = useState([])
    
  const fetchChats = async()=>{
    const {data} = await axios.get('http://localhost:5000/api/chat')
   setChats(data)
  }

useEffect(()=>{
    fetchChats();
}, [])
 

  return (
    <div>
    {chats.map((chat)=>(
        <div key={chat._id}>{chat.chatName}</div>
    ))}
    </div>
  )
}

export default Chatpage
