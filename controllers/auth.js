const User=require("../models/user");
const { check,validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
exports.signup=(req,res)=>{


    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(422).json({
            error:errors.array()[0].msg
        });
    }
    const user=new User(req.body);
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                err:"NOT able to save user in DB"
            });
        }
        res.json({
            message:"you signup sucessfullly",
            name:user.name,
            lastName:user.lastName,
            email:user.email,
            id:user._id
        });

    });
    
};
exports.signin=(req,res)=>
{
    const{email,password}=req.body;
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(422).json({
            error:errors.array()[0].msg
        });
    }
    User.findOne({email},(err,user)=>
    {
        if(err||!user)
        {
            res.status(400).json
            (
                {
                    error:"user email does not exists"
                }
            )
        }
        if(!user.authenticate(password))
        {
        return res.status(401).json
        ({
            error:"password does not match"
        });
    }
        const {_id,name,_email,role}=user;
        // create token
       const token=jwt.sign({_id:user._id},process.env.SECRET);
       // put token in cookie
       res.cookie("token",token,{expire:new Date()+9999 });
       // send responce to front end
       return res.status(200).json(
       {
            msg:"You have logged in sucessfully",
           id:_id,
           email:_email,
           name:name,
           role:role,
           token:token
       });
    });
  
};
exports.signout=(req,res)=>{
    res.clearcookie("token")
    res.json({
        message:"user signout"
    });
};
// protected routes
exports.issignedIn=expressJwt({
    secret:process.env.SECRET,
    userProperty:"auth"
});
//custom middleware
exports.isAuthenticated=(req,res,next)=>
{
    let cheker=req.profile && req.auth && req.profile._id==req.auth._id;
    if(!cheker)
    {
        return res.status(403).json({
            error:"Authentication Denied"
        })
    }
    next();
}

exports.isAdmin=(req,res,next)=>
{
    if(req.profile.role==0)
    {
        return res.status(403).json({
            error:"you are not admin,access denied"
        })
    }
    next();
}