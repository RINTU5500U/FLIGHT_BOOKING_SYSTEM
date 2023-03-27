const {userModel, updateUserModel, loginValidation, flightValidation, updateFlightValidation, retrieveFlightsValidation} = require('../utilities/validator')

module.exports = {
    userValidation: (req, res, next) => {
        const { error } = userModel.validate(req.body)
        if (error) {
            return res.status(400).send({ status: false, message: error.message })
        } else next()
    },
    updateUserValidation: (req, res, next) => {
        const { error } = updateUserModel.validate(req.body)
        if (error) {
            return res.status(400).send({ status: false, message: error.message })
        } else next()
    },
    loginValidation: (req, res, next) => {
        const { error } = loginValidation.validate(req.body)
        if (error) {
            return res.status(400).send({ status: false, message: error.message })
        } else next()
    },
    flightValidation: (req, res, next) => {
        const { error } = flightValidation.validate(req.body)
        if (error) {
            return res.status(400).send({ status: false, message: error.message })
        } else next()
    },
    updateFlightValidation: (req, res, next) => {
        const { error } = updateFlightValidation.validate(req.body)
        if (error) {
            return res.status(400).send({ status: false, message: error.message })
        } else next()
    }
}