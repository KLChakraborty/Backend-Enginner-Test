const mongoose = require('mongoose')

const cardSchema  = new mongoose.Schema({
cardNumber: {
    type: String,
    required: true
},
cardType: {
    type: String,
    required: true,
    enum: ['REGULAR', 'SPECIAL']
},
customerName: {
    type: String,
    required: true
},
status: {
    type: String,
    default: active
},
vision: {
    type: String,
    required: true
},
customerID: {
    type: String,
    required: true,
    ref: 'customer'
}
}, {timestamps: true})

module.exports = mongoose.model('card', cardSchema)