const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const captainController = require('../controllers/captain.controller');

router.post('/register',[
        body('email').isEmail().withMessage('Invalid email format'),
        body('fullname.firstname').isLength({min:2}).withMessage('firstname must be atleast 2 character'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long'),
        body('vehicle.color').notEmpty().withMessage('color is needed'),
        body('vehicle.capacity').notEmpty().withMessage('capacity number is required'),
        body('vehicle.vehicleType')
            
            .notEmpty()
            .withMessage('vehicle type is required')
        ],
            captainController.registerCaptain
    
)





module.exports = router 
