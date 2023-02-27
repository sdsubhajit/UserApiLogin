const mongoose = require('mongoose')
const schema = mongoose.Schema

const adminSchema = new schema ({
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

const schemaData = new mongoose.model('admin' , adminSchema)

module.exports = schemaData