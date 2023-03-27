const flightModel = require('../models/flightModel')
const EventEmitter = require('events')
const {GET_ASYNC, SETEX_ASYNC, KEYS_ASYNC} = require('../redis/redis')

module.exports = {
    createFlight : async (req, res) => {
        try {
            const saveData = await flightModel.create(req.body)
            return res.status(201).send({ status: true, message: 'Data created successfully', Data: saveData })
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    },
    updateFlight : async (req, res) => {
        try {
            const {flightId} = req.params
            const updateData = await flightModel.findByIdAndUpdate(flightId, req.body, {new: true})
            if (!updateData) {
                return res.status(404).send({ status: false, message: 'Data not found' })
            }
            return res.status(201).send({ status: true, message: 'Data updated successfully', Data: updateData })
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    },
    retrieveFlights : async (req, res) => {
        try {
            const {origin, destination, departureDate, returnDate} = req.query
            const {page} = req.params
            if (origin && destination && origin == destination) {
                return res.status(400).send({ status: false, msg: "origin and destination airports can't be the same" })
            }
            if (departureDate < new Date().toLocaleString() ) {
                return res.status(400).send({ status: false, msg: "you can choose the departure date from today only" })
            }
            if (returnDate) {
                if (departureDate > returnDate) {
                    return res.status(400).send({ status: false, msg: "you can choose the return date from departure date only" })
                }
            }
            const searchKey = `flight:${origin}:${destination}:${departureDate}*`
            const keys = await KEYS_ASYNC(searchKey);
            if (keys.length > 0) {
                const results = await Promise.all(keys.map(key => GET_ASYNC(key)));
                const flights = results.map(result => JSON.parse(result));
                return res.status(200).send({ status: true, msg: 'Data from redis', Data: flights})
            } else {
                const query = {
                    $or: [
                        {
                            origin : {$regex: '.*'+origin+'.*', $options: 'i' },
                            destination : {$regex: '.*'+destination+'.*', $options: 'i' },
                            departureDate: departureDate
                        },
                        {
                            origin: {$regex: '.*'+destination+'.*', $options: 'i' },
                            destination: {$regex: '.*'+origin+'.*', $options: 'i' },
                            departureDate: returnDate,
                        }
                    ]
                }
                const flightData = await flightModel.find(query).select({_id: 0,__v: 0}).skip(2*((page || 1)-1)).limit(2)
                if (!flightData[0]) {
                    return res.status(404).send({ status: false, msg: "Flights not available" })
                }
                const key = `flight:${flightData.origin}:${flightData.destination}:${flightData.departureDate}`;
                const value = JSON.stringify(flightData);
                const expireTime = 60 * 60 * 24 * 7; // 7 days in seconds
                await SETEX_ASYNC(key, expireTime, value);
                return res.status(200).send({ status: true, Data: flightData})
            }
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    },
    getFlightById : async (req, res) => {
        try {
            const {flightId} = req.params
            const flight = await flightModel.findById(flightId).select({_id: 0,__v: 0})
            return res.status(200).send({ status: true, Data: flight})
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    },

}