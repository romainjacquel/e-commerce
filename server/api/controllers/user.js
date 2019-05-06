const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jwt-simple')
const User = require('../models/user')
const lodash = require('lodash')


function getTokenForUser(user){
    const timeStamp = new Date().getTime();
        return jwt.encode({
        sub : user.id,
        iat : timeStamp 
    }, "secret")
}

exports.user_signup = (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    
    User.findOne({email:email}, function(err,existingUser){
        if(err){
            return next(err)
        }
        if(existingUser){
            console.log('error email utilisé')
            return res.status(422).send({error : "Email utilisé"});
        }
        if(lodash.isEmpty(email) || lodash.isEmpty(password)){
            console.log("Eror mdp ou email vide")
            return res.status(422).send({error:"Email ou mot de passe vide"})
        }else{
            const user = new User({
                _id : new mongoose.Types.ObjectId(),
                email:email,
                password:password
            })
            user.save(function(err){
                if(err){
                    return next(err);
                }
                res.json({token : getTokenForUser(user), id : user._id});
            })
        }
    }).catch()
}

exports.user_login = (req,res,next)=>{
    User.find({email : req.body.email}).exec().then(user=>{
        if(user.length < 1){
            console.log('user<1',user)
            console.log(req.body)
            return res.status(401).json({
                message : "Auth failed"
            })
        }

        bcrypt.compare(req.body.password, user[0].password, (err,result)=>{
            if(err){
                return res.status(401).json({
                    message : "Auth failed"
                })
            }
            if(result){
                console.log(req.body)
               const token = jwt.sign({
                    email : user[0].password,
                    userId : user[0]._id
                },
                "secret",
                {
                    expiresIn : "1h"
                }
                )
                return res.status(200).json({
                    message: "Auth succesfully",
                    token : token
                })
            }
            return res.status(401).json({
                message : "Auth failed"
            })
        })

    }).catch(err=>{
        console.log(err)
        res.status(500).json({error:err})
    })
}

exports.user_delete = (req,res,next)=>{
    const id = req.params.userId
    User.deleteOne({_id : id}).exec().then(user=>{
        res.status(200).json({
            message : "User deleted"
        })
    }).catch(err =>{
        console.log(err)
        res.status(500).json({
            error : err
        })
    })
}