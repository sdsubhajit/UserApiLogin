const mongoose = require('mongoose')
const schema = mongoose.Schema

const userApiSchema = new schema ({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    isVarified : {
        type : Boolean,
        default : true
    },
})

const apiSchema = new mongoose.model('apiUser' , userApiSchema)

module.exports = apiSchema