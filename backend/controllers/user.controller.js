const userModel = require('../model/user.model');
const userService = require('../services/user.services');
const { validationResult } = require('express-validator');




module.exports.registerUser = async (req, res,next) => {
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { fullname, email, password } = req.body;
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
      res.status(200).json({ token , user, message: 'User logged in successfully' });
    } catch (error) {
      console.log(error);
    }
  }; 