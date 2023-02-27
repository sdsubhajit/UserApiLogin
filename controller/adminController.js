const adminModel = require('../model/admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const register=(req,res)=>{
    res.render('register', {
        data : req.user
    })
}

const registerCreate=(req,res)=>{
    adminModel({
        name:req.body.name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10))
    }).save((err,data)=>{
        if(!err){
            res.redirect('/login')
            console.log(data);
        }else{
            console.log(err);
        }
    })
}


const login=(req,res)=>{
    logindata = {}
    logindata.email = (req.cookies.email) ? req.cookies.email : undefined
    logindata.password = (req.cookies.password) ? req.cookies.password : undefined
    res.render('login',{
        data : logindata, 
    })
}

const loginCreate=(req,res)=>{
    adminModel.findOne({
        email: req.body.email
    },(err,data)=>{
        if(data){
            console.log(data);
            const haspassword = data.password
            if(bcrypt.compareSync(req.body.password, haspassword)){
                const token = jwt.sign({
                    id: data._id,
                    name: data.name
                }, "helloworld@2406" ,{expiresIn:'10h'})
                res.cookie('adminToken' , token)
                if(req.body.rememberme) {
                    res.cookie('email' , req.body.email)
                    res.cookie('password' , req.body.password)
                }
                console.log(data);
                res.redirect('/dashboard')
            }else{
                res.redirect('/login')
            }
        }else{
            res.redirect('/login')
        }
    })
}

const dashboard=(req,res)=>{
    res.render('dashboard',{
        data:req.user,
    }) 
}

const adminAuther=(req,res,next)=>{
    if(req.user){
        console.log(req.user);
        next()
    }else{
        console.log(req.user);
        res.redirect('login')
    }
}


const logout = (req, res) => {
    res.clearCookie('userToken')
    res.redirect('/login')
}


module.exports = { 
    register,
    registerCreate,
    login,
    loginCreate,
    dashboard,
    adminAuther,
    logout
}