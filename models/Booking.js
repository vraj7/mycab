const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    driverid: {
        type: String,
        required: true
    },
    drivername:{
        type: String,
        required: true
    },
    carmodel:{
        type: String,
        required: true
    },
    carnumber:{
        type: String,
        required: true
    },
    bookingloc: [{
        curlong: String,
        curlat: String,
        destlong:String,
        destlat:String
    }],
    date: {
        type: Date,
        default: Date.now
      }
});

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;
