const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.verifyUser = (req,res, next)=>{
    let authheader = req.headers.authorization;

    if(!authheader){  
        let err = new Error('No Authentication information');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
        }
       // let authInfo = new Buffer.from(authheader.split(" ")[1],"base64").toString().split(':');

       let token = authheader.split(" ")[1];
       let data;


       try{
        data = jwt.verify(token, process.env.SECRET)
        } catch(err){
            return next(err);
        }

User.findById(data.userId)
.then((user) =>{
req.user = user;
next();
}).catch(next);
}
 module.exports.verifyAdmin = (req,res,next) => {

    if(!req.user){
        let err = new Error('Unathorized');
        err.status = 401;
        return next(err);
    }
    else if(req.user.admin !== true){
        let err = new Error ('You are not admin!');
        err.status = 403;
        return next(err);
    }
    next();
 }