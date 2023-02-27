const apiUser = require('../model/userApi')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const adduser = async(req,res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = await new apiUser({
            name : req.body.name,
            email : req.body.email,
            password : hashedPassword,
        })
        const result = await user.save()
        res.status(201).json({success:true , msg:'Data Added Successfilly' , data:result})
    }
    catch(ex){
        console.log(ex);
        res.status(404).json({success:false , msg:'Data Not Saved'})
    }
}

const getuser = async(req,res)=>{
    try{
        const allUser = await apiUser.find()
        res.status(200).json({success:true, msg:'Data Get Successfully' , data:allUser})
    }
    catch(ex){
        console.log(ex);
        res.status(404).json({success:false , msg:'Data Not Get'})
    }
}

const loginuser =(req,res,next)=>{
    apiUser.findOne({
        email:req.body.email
    }, (err, data)=>{
        if(data){
            const hashPassword = data.password
            if(bcrypt.compareSync(req.body.password, hashPassword)){
                const token = jwt.sign({
                    id : data._id,
                    name : data.name
                },"apiuser123" ,{expiresIn: '5m'})
                res.cookie("apiToken", token);
                if (req.body.rememberme) {
                    res.cookie('email', req.body.email)
                    res.cookie('password', req.body.password)
                }
                res.status(200).json({
                    status: 'success',
                    result: data,
                    message: "Login...."
                })
            }else{
                res.status(404).json({
                    result: err,
                    message: "Invalid Password"
                });
            }
        }else{
            res.status(404).json({
                result: err,
                message: "Invalid Email"
            });
        }
        next()
    })
}

module.exports={
    adduser,
    getuser,
    loginuser
}