const jwt = require('jsonwebtoken')

exports.apijwt=(req,res,next)=>{
    if(req.cookies && req.cookies.apiToken){
        jwt.verify(req.cookies.apiToken, "apiuser123" , (err,data)=>{
            req.user = data
            next()
        })
    }else{
        next()
    }
}