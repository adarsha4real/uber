const userModel=require("../model/user.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const captainModel=require("../model/captain.model")
const blacklistTokenModel=require('../model/blacklistToken.model')

module.exports.authuser = async (req, res, next) => {
   
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const isBlacklisted = await userModel.findOne({token:token})
    if(isBlacklisted){
      return res.send(401).json({
        message:"Unauthorized"
      })
    }
    try {
    const decoded =  jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    req.user = user;
    return next();
    
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized .' });
  }
}; 
module.exports.authCaptain = async (req, res, next) => {

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const isBlacklisted = await blacklistTokenModel.findOne({token:token})
    if(isBlacklisted){
      return res.send(401).json({
        message:"Unauthorized"
      })
    }
    try {
    const decoded =  jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);
    req.captain = captain;
    return next();

  } catch (error) {
    res.status(401).json({ message: 'Unauthorized .' });
  }
};