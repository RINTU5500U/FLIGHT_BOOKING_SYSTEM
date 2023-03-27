const express = require("express")
const router = express.Router()

const {createUser, login, updateUser, deleteUser} = require('../controllers/userController')
const {createFlight, updateFlight, retrieveFlights, getFlightById} = require('../controllers/flightController')
const {bookingFlight, rebookingFlight, cancelBooking, retrieveBookingHistory} = require('../controllers/bookingController')
const {authentication, authorization, adminAuthorization} = require('../middlewares/auth')
const {userValidation, loginValidation, updateUserValidation, flightValidation, updateFlightValidation} = require('../middlewares/validator')

router.post('/createUser', userValidation, createUser)
router.post('/login', loginValidation, login)
router.put('/updateUser/:userId', updateUserValidation, authentication, authorization, updateUser)
router.delete('/deleteUser/:userId', authentication, authorization, deleteUser)

router.post('/createFlight', authentication, adminAuthorization, flightValidation, createFlight)
router.put('/user/:userId/updateFlight/:flightId', authentication, authorization, adminAuthorization, updateFlightValidation, updateFlight)
router.get('/retrieveFlights/:page', retrieveFlights)
router.get('/getFlightById/:flightId', getFlightById)

router.post('/user/:userId/bookingFlight/:flightId', authentication, bookingFlight)
router.put('/user/:userId/rebookingFlight/:bookingId/:flightId', authentication, authorization, rebookingFlight)
router.delete('/user/:userId/cancelBooking/:bookingId', authentication, authorization, cancelBooking)
router.get('/user/:userId/bookingHistory',authentication, authorization, retrieveBookingHistory)


router.all("/*", function (req, res) { 
    return res.status(400).send({ status: false, message: "invalid http request" });
});

module.exports = router