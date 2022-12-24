const customerModel = require('../models/customerModel')
const uuid = require('uuid')

const createCustomer = async function (req, res) {
    try {
        const { firstName, lastName, mobileNumber, DOB, emailID, address } = req.body
        let customerId = uuid.v4()
        if(!emailID.match(/^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/)) return res.status(400).send({ status: false, message: 'Email should be valid' })
        if(!mobileNumber.match(/^[6-9]\d{9}$/)) return res.status(400).send({ status: false, message: 'mobileNumber should be valid' })
        let presentUser = await customerModel.findOne({$or: [{emailID: emailID}, {mobileNumber: mobileNumber}]})
        if(presentUser) return res.status(400).send({ status: false, message: 'email or mobile should be unique' })
        if(!address.match(/^[#.0-9a-zA-Z\s,-]+$/)) return res.status(400).send({ status: false, message: 'address should be a string' })
        if(!DOB.match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)) return res.status(400).send({ status: false, message: 'DOB should be in the format YYYY-MM-DD' })
        let obj = {
            firstName: firstName,
            lastName: lastName,
            mobileNumber: mobileNumber,
            DOB: DOB,
            emailID: emailID,
            address: address,
            customerID: customerId,
            status: active
        }
        let createCustomer = await customerModel.create(obj)
        return res.status(201).send({ status: true, data: createCustomer })
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}

const getCustomer = async function (req, res) {
    try {
        let getCustomer = await customerModel.find({ status: ACTIVE })
        return res.status(200).send({ status: true, data: getCustomer })
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}


const deleteCustomer = async function (req, res) {
    try {
        let customerID = req.params.customerID
        if (!uuid.validate(customerID)) return res.status(400).send({ status: false, message: 'Invalid customer ID' })
        let deleteCustomer = await customerModel.findOneAndUpdate({ customerID: customerID }, { $set: { status: INACTIVE } })
        if (!deleteCustomer) return res.status(404).send({ status: false, message: 'No such customer' })
        return res.status(200).send({ status: true, message: 'Deleted successfully' })
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}

module.exports = { createCustomer, getCustomer, deleteCustomer}