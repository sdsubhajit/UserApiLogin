const jwt = require('jsonwebtoken')

exports.adminjwt=(req,res,next)=>{
    if(req.cookies && req.cookies.adminToken){
        jwt.verify(req.cookies.adminToken, "helloworld@2406" , (err,data)=>{
            req.user = data
            next()
        })
    }else{
        next()
    }
}