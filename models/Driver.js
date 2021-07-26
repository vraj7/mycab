const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  carmodel: {
    type: String,
    required: true
  },
  carnumber: {
    type: String,
    required: true
  },
  isBooked:{
    type:Boolean,
  },
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
    },
  }
});

DriverSchema.index({location: '2dsphere'});
const Driver = mongoose.model('Driver', DriverSchema);

module.exports = Driver;
