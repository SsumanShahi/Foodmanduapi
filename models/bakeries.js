const mongoose = require('mongoose');
const BakerySchema = new mongoose.Schema({

    BTitle:{
        type:String,
        required = true
    },
    Address:{
        type:String,
        required = true
    },
    Type:{
        type:String,
        required= true
    },
    DeliveryHour:{
        type:String,
        required= true
    },
    image:{
        type:String,
        required:false
    }
},{timestamps:true})

module.exports = mongoose.model('Bakery',BakerySchema);
