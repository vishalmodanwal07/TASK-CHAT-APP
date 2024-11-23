const asyncHandler = require("express-async-handler");
const User = require("../models/userModel"); 
const registerUser =asyncHandler(async(req , res)=>{
    if (!Name|| !email || !password) {
        res.status(400);
        throw new Error("Please Enter all the Feilds");
      }
    
      const userExists = await User.findOne({ email });
    
      if (userExists) {
        res.status(400);
        throw new Error("User already exists");
      }
     
      const user = await User.create({
        Name,
        email,
        password
      });

      if (user) {
        res.status(201).json({
          _id: user._id,
          Name: user.Name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        });
      } else {
        res.status(400);
        throw new Error("User not found");
      }    
});

// auth

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        Name: user.Name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }

});








module.exports = { registerUser, authUser};