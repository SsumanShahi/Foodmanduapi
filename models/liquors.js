const mongoose = require('mongoose');
const LiquorSchema = new mongoose.Schema({

    LTitle:{
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

module.exports = mongoose.model('Liquor',LiquorSchema);
