const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  restaurantName: { type: String, required: true },
  restaurantImage: { type: String, required: true },
  name: { type: String, required: true },
  contact: { type: String, required: true },
  guests: { type: Number, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
