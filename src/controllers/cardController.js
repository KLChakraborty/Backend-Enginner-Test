const cardModel = require('../models/cardModel')
const customerModel = require('../models/customerModel')
const validator = require('../validator/validator')
const uuid = require('uuid')

const createCard = async function (req, res) {
    try {
        if (!validator.requiredInput(req.body)) return res.status(400).send({ status: false, message: 'Input is required' })
        const { cardType, customerName, customerID, vision } = req.body

        if (!validator.validInput(customerID)) return res.status(400).send({ status: false, message: 'customerID should be valid and required' })
        if (!uuid.validate(customerID)) return res.status(400).send({ status: false, message: 'customerID not valid' })
        let presentCustomer = await customerModel.findOne({ customerID: customerID, status: "ACTIVE" })
        if (!presentCustomer) return res.status(404).send({ status: false, message: 'customerID not present' })

        if (!validator.validInput(customerName)) return res.status(400).send({ status: false, message: 'customerName should be valid and required' })
        if (!validator.validName(customerName)) return res.status(400).send({ status: false, message: 'customerName should be valid' })

        if (!validator.validInput(cardType)) return res.status(400).send({ status: false, message: 'cardType should be valid string' })
        if (!['REGULAR', 'SPECIAL'].includes(cardType)) return res.status(400).send({ status: false, message: 'cardtype should be REGULAR or SPECIAL' })

        if (!validator.validInput(vision)) return res.status(400).send({ status: false, message: 'vision should be valid and required' })
        // if(!validator.validVision(vision)) return res.status(400).send({ status: false, message: 'vision should be valid' })

        let findCard = await cardModel.find()
        let cardNumber = 'C00' + (findCard.length + 1)
        let obj = {
            cardType: cardType,
            customerName: customerName,
            customerID: customerID,
            vision: vision,
            cardNumber: cardNumber
        }
        let createCard = await cardModel.create(obj)
        return res.status(201).send({ status: true, data: createCard })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const getCard = async function (req, res) {
    try {
        let getCards = await cardModel.find()
        if (!getCards.length > 0) return res.status(404).send({ status: false, message: 'No cards found' })
        return res.status(200).send({ status: true, data: getCards })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { createCard, getCard }