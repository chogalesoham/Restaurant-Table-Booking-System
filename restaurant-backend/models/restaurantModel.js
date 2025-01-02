const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  cuisine: { type: String, required: true },
  rating: { type: Number, default: 0 },
  img: { type: String, required: true },
  description: { type: String, required: true },
});
const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
