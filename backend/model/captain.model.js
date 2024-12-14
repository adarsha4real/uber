const mongoose = require('mongoose')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const captainSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[2,'firstname should be atleast 2 character'],

        },
        lastname:{
            type:String,
            minlength:[2,'firstname should be atleast 2 character']


        },

    },
    email :{
        type:String,
        required:true,
        minlength:[10,'enter valid email'],
        unique:true,
        lowercase:true
    },
    password:{
        type: String,
        select:false,
        minlength:[6,'password must be 6 character long'],
        required:true,

    },
    socketId:{
            type:String
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },
    vehicle:{
        color:{
            type:String,
             required:true,
             minlength:[2,'must be a valid colorname'],

        },
         plate:{
            type:String,
             required:true,
             minlength:[4,'must be a valid numberplate'],
             
        },
        capacity:{
            type:Number,
                required:true,
                minlength:[1,'capacity mst be atleast 1 '],

        },
        vehicleType:{
            type:String,
                required:true,
                enum:['car','bike','auto'],
                minlength:[2,'vehicle name must be of atlest 4 character '],

        },

    },
    location:{
        lat:{
            type:Number
        },
        lon:{
            type:Number
        }
    },

});
captainSchema.methods.generateAuthToken= function(){
    const token =jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
    return token
}


captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password,this.password);
    
}


captainSchema.statics.hashpassword=async function (password) {
    
    return await bcrypt.hash(password, 10); 
}

const captainModel = mongoose.model('captain',captainSchema);
module.exports = captainModel  
