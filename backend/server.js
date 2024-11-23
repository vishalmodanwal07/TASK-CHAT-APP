const dotenv = require("dotenv");
dotenv.config();
const express =require("express");
const { chats } = require("./data/data");
const userRoutes =require("./routes/userRoutes.js");
const cors = require('cors');
const connectDB = require("./config/db.js");
const app = express();
connectDB();


app.use(cors());


app.get("/" , (req, res)=>{
    res.send("api is runing successfully");
});

app.get("/api/chat" , (req, res)=>{
    res.send(chats)
});

app.get("/api/chat/:id" , (req , res)=>{
    // console.log(req.params.id)
    const singleChat = chats.find((c)=>c._id === req.params.id);
    res.send(singleChat);
});

app.use("/api/user" ,userRoutes)
const PORT = process.env.PORT || 5000
app.listen(5000 , console.log(`server started on PORT ${PORT}` ))