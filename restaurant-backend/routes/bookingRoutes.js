const express = require("express");
const router = express.Router();
const {
  createBooking,
  getBookings,
  deleteBooking,
  getRestaurants,
  getRestaurantById,
} = require("../controllers/bookingController");

//fetch restaurant data
router.get("/restaurants", getRestaurants);

//fetch restaurant by id
router.get("/restaurants/:id", getRestaurantById);

//create a new booking
router.post("/create", createBooking);

//get all bookings
router.get("/get", getBookings);

//delete a booking by ID
router.delete("/delete/:id", deleteBooking);

module.exports = router;
