const customerModel = require('../models/customerModel')
const validator = require('../validator/validator')
const uuid = require('uuid')

const createCustomer = async function (req, res) {
    try {
        if (!validator.requiredInput(req.body)) return res.status(400).send({ status: false, message: 'Input is required' })
        const { firstName, lastName, mobileNumber, DOB, emailID, address } = req.body

        if (!validator.validInput(firstName)) return res.status(400).send({ status: false, message: 'firstName should be valid and required' })
        if (!validator.validName(firstName)) return res.status(400).send({ status: false, message: 'firstName should be valid' })

        if (!validator.validInput(lastName)) return res.status(400).send({ status: false, message: 'lastName should be valid and required' })
        if (!validator.validName(lastName)) return res.status(400).send({ status: false, message: 'lastName should be valid' })

        if (!validator.validInput(emailID)) return res.status(400).send({ status: false, message: 'Email should be valid and required' })
        if (!validator.validEmail(emailID)) return res.status(400).send({ status: false, message: 'Email should be valid' })

        if (!validator.validInput(mobileNumber)) return res.status(400).send({ status: false, message: 'mobileNumber should be valid and required' })
        if (!validator.validPhone(mobileNumber)) return res.status(400).send({ status: false, message: 'mobileNumber should be valid' })

        let presentUser = await customerModel.findOne({ $or: [{ emailID: emailID }, { mobileNumber: mobileNumber }] })
        if (presentUser) return res.status(400).send({ status: false, message: 'email or mobile should be unique' })

        if (!validator.validInput(address)) return res.status(400).send({ status: false, message: 'Address should be valid and required' })
        if (!validator.validAddress(address)) return res.status(400).send({ status: false, message: 'Address should be a string' })

        if (!validator.validInput(DOB)) return res.status(400).send({ status: false, message: 'DOB should be valid and required' })
        if (!validator.ValidDOB(DOB)) return res.status(400).send({ status: false, message: 'DOB should be in the format YYYY-MM-DD' })
        let customerId = uuid.v4()
        let obj = {
            firstName: firstName,
            lastName: lastName,
            mobileNumber: mobileNumber,
            DOB: DOB,
            emailID: emailID,
            address: address,
            customerID: customerId,
            status: "active"
        }
        let createCustomer = await customerModel.create(obj)
        return res.status(201).send({ status: true, data: createCustomer })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const getCustomer = async function (req, res) {
    try {
        let getCustomer = await customerModel.find({ status: "ACTIVE" })
        if (!getCustomer.length > 0) return res.status(404).send({ status: false, message: 'No customers found' })
        return res.status(200).send({ status: true, data: getCustomer })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


const deleteCustomer = async function (req, res) {
    try {
        let customerID = req.params.customerID
        if (!uuid.validate(customerID)) return res.status(400).send({ status: false, message: 'Invalid customer ID' })
        let presentCustomer = await customerModel.findOne({ customerID: customerID, status: "ACTIVE" })
        if (!presentCustomer) return res.status(404).send({ status: false, message: 'No customers found' })
        await customerModel.findOneAndUpdate({ customerID: presentCustomer.customerID }, { $set: { status: "INACTIVE" } })
        return res.status(200).send({ status: true, message: 'Deleted successfully' })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { createCustomer, getCustomer, deleteCustomer }