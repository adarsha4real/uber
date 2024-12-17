const captainModel = require('../model/captain.model');
const router = require('../routes/captain.routes');
const captainService = require('../services/captain.services');
const { validationResult } = require('express-validator');
blacklistTokenModel=require('../model/blacklistToken.model')

module.exports.registerCaptain = async (req, res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if(await captainModel.findOne({email:req.body.email})){
      return res.status(400).json({ message: 'Email already exists' });
    }

    try {
      const { fullname, email, password, vehicle } = req.body;
      const isEmailExist = await captainModel.findOne({ email });
      if (isEmailExist) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      const hashedpassword = await captainModel.hashpassword(password);
      const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password:hashedpassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

      const token = captain.generateAuthToken();
      res.status(201).json({ token, captain, message: 'Captain registered successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


  module.exports.loginCaptain = async (req, res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;
      const captain = await captainModel.findOne({ email }).select('+password');
      if (!captain) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      const isPasswordValid = await captain.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      const token = captain.generateAuthToken();
      res.cookie('token',token)
      res.status(200).json({ token, captain, message: 'Login successful' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  module.exports.logoutCaptain = async (req, res,next) => {
    try {
      const token = await req.cookies.token;
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      await blacklistTokenModel.create({token:token})
      res.clearCookie('token');
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  module.exports.getCaptainProfile = async (req, res,next) => {
    try {
      const captain = await captainModel.findById(req.captain._id);
      if (!captain) {
        return res.status(404).json({ message: 'Captain not found' });
      }
      res.status(200).json({ captain });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
