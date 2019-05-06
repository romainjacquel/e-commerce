const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    email : {type:String, required :true, unique : true, match : /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
    password : {type: String, required:true}
}) 

userSchema.pre("save",function(next){
    console.log('function pre')
    const user = this;
    bcrypt.genSalt(10, function(err,salt){
        if(err){
            return next(err)
        }
        bcrypt.hash(user.password,salt,null,function(err,hash){
            if(err){
               return next(err)
            }
            user.password = hash;
            next();
        })
    })
})

module.exports = mongoose.model('User', userSchema)