const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true,
    },
    DOB: {
        type: Date,
        required: true
    },
    emailID: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    address: {
        type: String,
        required: true
    },
    customerID: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        required: true,
        uppercase: true
    }
}, { timestamps: true })

module.exports = mongoose.model('customer', userSchema)