const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const path = require('path')


const app = express()
const port = process.env.PORT || 2000
const database = "mongodb+srv://sdsubhajit24:w0hUsqRkmdYlbmRf@cluster0.uyhkjgq.mongodb.net/admin_panel"


app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(flash())
app.use(cookieParser())
app.use(session({
    cookie : {maxAge:70000},
    secret : 'subhajit',
    resave : false,
    saveUninitialized : false
}))
app.set('view engine' , 'ejs')
app.set('views' , 'views')

const apiUserRoute = require('./route/userApiRoute')
app.use(apiUserRoute)
const userRoute = require('./route/userRoute')
app.use(userRoute)
const adminAuther = require('./middleware/adminJWT')
app.use(adminAuther.adminjwt)
const adminRouth = require('./route/adminRoute')
app.use(adminRouth)


mongoose.connect(database, ({useNewUrlParser:true , useUnifiedTopology:true}))
.then(result=>{
    app.listen(port, ()=>{
        console.log(`server running at http://localhost:${port}`);
        console.log(`database is connected`);
    })
}).catch(err=>{
    console.log(err);
})