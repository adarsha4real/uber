const userModel = require('../model/user.model');
const userService = require('../services/user.services');
const { validationResult } = require('express-validator');
const jwt=require('jsonwebtoken')
const blacklistTokenModel =require('../model/blacklistToken.model');
const captainModel = require('../model/captain.model');




module.exports.registerUser = async (req, res,next) => {
   const errors =await validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if( await userModel.findOne({email:req.body.email})){
      return res.status(400).json({ message: 'Email already exists' });
    }
    try {
      
      const hashedpassword= await userModel.hashpassword(password);


      const user = await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname ,
        email,
        password:hashedpassword,
      });
      const token = user.generateAuthToken();



      res.status(201).json({ token , user, message: 'User registered successfully' });
    } catch (error) {
    console.log(error);

}}


module.exports.loginUser = async (req, res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email }).select('+password');  
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      const token = user.generateAuthToken();
      res.cookie('token',token, )
      res.status(200).json({ token , user, message: 'User logged in successfully' });
    } catch (error) {
      console.log(error);
    }
  }; 
  module.exports.getUserProfile = async (req, res,next) => {
  
    res.status(200).json({user:req.user});
  };
  module.exports.logoutUser = async(req,res,next)=>{
    res.clearCookie('token');

    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blacklistTokenModel.create({token})
    res.status(200).json({message:"logged out"})
  }