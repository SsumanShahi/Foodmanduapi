const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const auth = require('../routes/auth');

const router = express.Router();

router.post('/signup',(req, res, next)=>{

User.findOne({username:req.body.username})
.then((user) =>{

    if (user != null){
        let err = new Error('Username already exits');
        err.status = 401;
        return next(err);

    }
            bcrypt.hash(req.body.password, 10, function(err,hash){
        if(err){
            throw new Error('Could not encrypt password ');
        }
        User.create({ 
            FirstName:req.body.firstName,
            LastName:req.body.lastName,
            Phonenumber:req.body.phoneNumber,
            username:req.body.username,
            password:hash,
            image:req.body.image
        }).then((user) =>{
            let token = jwt.sign({userId: user._id}, process.env.SECRET);
            res.json({status: "Signup Success!", token: token});
        })
    }).catch(next);
});
}); 




router.post('/login',(req, res, next)=>{
    User.findOne({username: req.body.username})
    .then((user) =>{
        if(user == null){
            let err = new Error('Username not found');
            err.status = 401;
            return next(err);
            }
            bcrypt.compare(req.body.password, user.password, function(err, status) {
            if (!status){
                let err = new Error('Password is not match');
                err.status = 401;
                return next(err);
            }
            let token = jwt.sign({userId: user._id}, process.env.SECRET);
            res.json({ status : 'Login Sucessfull', token : token});
            });
            }).catch(next);
});

router.get('/me', auth.verifyUser, (req, res, next)=>{
res.json({username: req.user.username, firstName: req.user.FirstName, lastName: req.user.LastName, phoneNumber: req.user.Phonenumber, image: req.user.image})
})

router.put('/me', auth.verifyUser, (req, res, next)=>{
User.findByIdAndUpdate(req.user._id,{$set: req.body},{new: true})
.then((user)=>{
    res.json({username: user.username, firstName: user.FirstName, lastName: user.LastName, phoneNumber: req.user.Phonenumber, image: req.user.image} )
        })
});
router.delete('/me', auth.verifyUser, auth.verifyAdmin, (req, res, next) =>{
    User.findByIdAndDelete(req.user._id)
    .then((user) =>{
        res.json({status:'User Deleted'});

    }).catch(next);
});

router.delete('/:userId', auth.verifyUser, auth.verifyAdmin,(req, res, next)=>{
user.find()
.then((users) => {
    res.json(users);
}).catch(next);
})


module.exports = router;