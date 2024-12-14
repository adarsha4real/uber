const captainModel = require('../model/captain.model');
const captainService = require('../services/captain.services');
const { validationResult } = require('express-validator');

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
