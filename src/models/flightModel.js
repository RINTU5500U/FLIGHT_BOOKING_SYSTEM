const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
    airline: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    origin: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    departureDate: {
        type: String,
        required: true,
    },
    arrivalDate: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        default: null
    },
    stopage: {
        type: String,
        default: 'Non stop'
    },
    price: {
        type: Number,
        required: true
    },
    seats: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Flight", flightSchema);