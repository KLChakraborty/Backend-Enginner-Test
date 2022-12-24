const cardModel = require('../models/cardModel')
const customerModel = require('../models/customerModel')
const uuid = require('uuid')

const createCard = async function(req, res){
try{
const { cardType, customerName, vision, customerID } = req.body
if(!uuid.validate(customerID))  return res.status(400).send({status: false, message: 'customerID not valid'})
let presentCustomer = await customerModel.findOne({customerID: customerID, status: ACTIVE})
if(!presentCustomer)  return res.status(400).send({status: false, message: 'customerID not present'})
if(!['REGULAR', 'SPECIAL'].includes(cardType)) return res.status(400).send({status: false, message: 'cardtype should REGULAR or SPECIAL'})

}catch(error){
    return res.status(500).send({status: false, message: error.message})
}
}

const getCard = async function(req, res){
    try{
    let getCards = await cardModel.find()
    if(getCard.length == 0)  return res.status(404).send({status: false, message: 'No cards found'})
    return res.status(200).send({status: true, data: getCards})
    }catch(error){
        return res.status(500).send({status: false, message: error.message})
    }
    }

    module.exports = { createCard, getCard }