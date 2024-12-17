const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const captainController = require('../controllers/captain.controller');
const authmiddleware = require('../middleware/auth.middleware');

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
router.post('/login',[
    body('email').isEmail().withMessage('Invalid email format'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    ],
        captainController.loginCaptain
)
router.get('/profile',authmiddleware.authCaptain,captainController.getCaptainProfile)
router.get('/logout',authmiddleware.authCaptain,captainController.logoutCaptain)





module.exports = router 
