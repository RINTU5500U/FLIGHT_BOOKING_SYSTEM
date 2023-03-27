const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    flightId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Flight",
    },
    bookingId: {
        type: String,
        required: true 
    },
    bookedAt: {
        type: String,
        default: new Date().toLocaleString()
    },
    rebookedAt: {
        type: String,
        default: null
    },
    canceledAt: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model("Booking", bookingSchema);