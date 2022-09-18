const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    address: {
        type : String,
        required : true
    },
    position: {
        type : String,
        required : true
    },
    status: {
        type : Boolean,
        required : true,
        default : true
    }
})

module.exports = mongoose.model('Employee',employeeSchema)