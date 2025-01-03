// app/confirmation/page.js
"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Confirmation = () => {
  const router = useRouter();
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    if (router.query) {
      const { name, contact, guests, date, time, restaurant } = router.query;

      // Parse restaurant data from query string
      const parsedRestaurant = restaurant ? JSON.parse(restaurant) : null;

      if (name && contact && guests && date && time) {
        setBookingData({
          name,
          contact,
          guests,
          date,
          time,
          restaurantData: parsedRestaurant,
        });
      }
    }
  }, [router.query]);

  if (!bookingData) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600">Booking Confirmed!</h1>
      <p className="text-gray-700 mt-4 text-lg">
        Thank you for your booking,{" "}
        <span className="font-semibold">{bookingData.name}</span>!
      </p>
      <div className="mt-8 p-6 bg-white rounded-lg shadow-lg w-[90%] md:w-[50%]">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Booking Summary
        </h2>
        <ul className="space-y-2 text-gray-600">
          <li>
            <strong>Name:</strong> {bookingData.name}
          </li>
          <li>
            <strong>Contact:</strong> {bookingData.contact}
          </li>
          <li>
            <strong>Guests:</strong> {bookingData.guests}
          </li>
          <li>
            <strong>Date:</strong> {bookingData.date}
          </li>
          <li>
            <strong>Time:</strong> {bookingData.time}
          </li>
        </ul>

        {bookingData.restaurantData?.name && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800">
              Restaurant Details
            </h3>
            <ul className="mt-2 text-gray-600">
              <li>
                <strong>Name:</strong> {bookingData.restaurantData.name}
              </li>
              <li>
                <strong>Address:</strong> {bookingData.restaurantData.address}
              </li>
              <li>
                <strong>Cuisine:</strong> {bookingData.restaurantData.cuisine}
              </li>
            </ul>
          </div>
        )}
      </div>

      <button
        className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        onClick={() => router.push("/")}
      >
        Back to Home
      </button>
    </div>
  );
};

export default Confirmation;
