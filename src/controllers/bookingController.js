const flightModel = require('../models/flightModel')
const userModel = require('../models/userModel')
const bookingModel = require('../models/bookingModel')
const customId = require('custom-id')

module.exports = {
    bookingFlight : async (req, res) => {
        try {
            const {userId, flightId} = req.params
            const flight = await flightModel.findById(flightId)
            const user = await userModel.findById(userId)
            if (flight.seats < 1) {
                return res.status(500).send({ status: false, message: 'No seat available' })
            }
            const bookingId = customId({
                name: flight.origin + flight.destination + flight.airline,
                email: user.name 
            })
            const newBooking = new bookingModel({ bookingId, flightId, userId });
            const saveData = await newBooking.save()
            await flightModel.findByIdAndUpdate(flightId, { $inc: { seats: -1 } })
            return res.status(201).send({ status: true, message: 'Flight booked successfully', Data: saveData })
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    },
    rebookingFlight : async (req, res) => {
        try {
            const {userId, flightId, bookingId} = req.params
            const flight = await flightModel.findById(flightId)
            const user = await userModel.findById(userId)
            const newBookingId = customId({
                name: flight.origin + flight.destination + flight.airline,
                email: user.name
            })
            const findFlight = await bookingModel.findOne({userId: userId, bookingId: bookingId, canceledAt: null})
            await flightModel.findByIdAndUpdate(findFlight.flightId, {$inc: { seats: +1 }})
            const saveData = await bookingModel.findOneAndUpdate({userId: userId, bookingId: bookingId, canceledAt: null}, {bookingId: newBookingId, flightId: flightId, rebookedAt: new Date().toLocaleString()}, {new: true})
            await flightModel.findByIdAndUpdate(flightId, { $inc: { seats: -1 } })
            return res.status(201).send({ status: true, message: 'Flight rebooked successfully', Data: saveData })
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    },

    cancelBooking : async (req, res) => {
        try {
            const {userId, bookingId} = req.params
            const deleteData = await bookingModel.findOneAndUpdate({userId: userId, bookingId: bookingId, canceledAt: null},{canceledAt: new Date().toLocaleString()})
            await flightModel.findByIdAndUpdate(deleteData.flightId, { $inc: { seats: +1 } })
            return res.status(204).send({ status: true, message: 'Flight canceled successfully' })
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    },
    retrieveBookingHistory : async (req, res) => {
        try {
            const {userId} = req.params
            const findData = await bookingModel.find({userId: userId})
                .populate({ path: 'userId', select: '-_id -__v -email -password -userType -title -isDeleted -createdAt -updatedAt -deletedAt' })
                .populate({ path: 'flightId', select: '-_id -__v -seats' })
                .select({_id:0,__v:0})
            return res.status(200).send({ status: true, Data: findData })
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    }
}