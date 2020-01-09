const mongoose = require('mongoose');
const OrganicSchema = new mongoose.Schema({

    OTitle:{
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

module.exports = mongoose.model('Organic',OrganicSchema);
