const Booking = require("../models/Booking");
const Restaurant = require("../models/restaurantModel");

// GET API to fetch restaurant data
const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch restaurant data" });
  }
};

// GET API to fetch restaurant By id
const getRestaurantById = async (req, res) => {
  const { id } = req.params;
  try {
    const restaurantById = await Restaurant.findById(id);
    if (!restaurantById) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json(restaurantById);
  } catch (error) {
    res.status(500).json({ message: "Error fetching restaurant", error });
  }
};

// Create a booking
const createBooking = async (req, res) => {
  console.log("Request Body:", req.body);
  const { name, contact, guests, date, time, restaurantImage, restaurantName } =
    req.body;
  try {
    const booking = new Booking({
      name,
      contact,
      guests,
      date,
      time,
      restaurantImage,
      restaurantName,
    });
    await booking.save();
    res
      .status(201)
      .json({ message: "Booking Restaurant successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Error booking Restaurant", error });
  }
};

// Get all bookings
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error });
  }
};

// Delete a booking by ID
const deleteBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting booking", error });
  }
};

module.exports = {
  createBooking,
  getBookings,
  deleteBooking,
  getRestaurants,
  getRestaurantById,
};
