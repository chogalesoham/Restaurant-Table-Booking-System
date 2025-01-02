const express = require("express");
const router = express.Router();
const {
  createBooking,
  getBookings,
  deleteBooking,
  getRestaurants,
} = require("../controllers/bookingController");

//fetch restaurant data
router.get("/restaurants", getRestaurants);

//create a new booking
router.post("/create", createBooking);

//get all bookings
router.get("/get", getBookings);

//delete a booking by ID
router.delete("/delete/:id", deleteBooking);

module.exports = router;
