const express = require('express')
const router = express.Router()

const customerController = require('../controllers/customerController')
const cardController = require('../controllers/cardController')

router.post('/createCustomer', customerController.createCustomer)

router.get('/getCustomer', customerController.getCustomer)

router.delete('/deleteCustomer/:customerID', customerController.deleteCustomer)

router.post('/createCard', cardController.createCard)

router.get('/getCard', cardController.getCard)

router.all('/*', function(req, res){
    return res.status(400).send({status: false, message: 'Path not found'})
})

module.exports = router
