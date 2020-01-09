const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({

    FirstName:{
        type:String,
        required: true
    },
    LastName:{
        type:String,
        required:true
    },
    Phonenumber:{
        type:String,
        unique:true,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true,
        minlength:6,
        maxlength:12
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    admin:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

module.exports = mongoose.model('User',userSchema);