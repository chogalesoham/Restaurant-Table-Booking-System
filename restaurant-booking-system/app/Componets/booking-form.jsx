// app/Componets/booking-form.js
"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const BookingForm = ({ restaurantData }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    guests: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    // Preparing query params
    const queryParams = new URLSearchParams({
      name: formData.name,
      contact: formData.contact,
      guests: formData.guests,
      date: formData.date,
      time: formData.time,
      restaurant: JSON.stringify(restaurantData),
    });

    // Redirect to the confirmation page with the query parameters
    router.push(`/confirmation?${queryParams.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[40%] h-full p-4 bg-gray-100 rounded-lg shadow-md flex flex-col items-start justify-between"
    >
      <div className="w-full">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
          placeholder="Enter your name"
          required
        />
      </div>

      <div className="w-full">
        <label
          htmlFor="contact"
          className="block text-sm font-medium text-gray-700"
        >
          Contact
        </label>
        <input
          type="tel"
          id="contact"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
          placeholder="Enter your contact number"
          required
        />
      </div>

      <div className="w-full">
        <label
          htmlFor="guests"
          className="block text-sm font-medium text-gray-700"
        >
          Guests
        </label>
        <input
          type="number"
          id="guests"
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
          placeholder="Enter number of guests"
          required
          min="1"
        />
      </div>

      <div className="w-full">
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700"
        >
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>

      <div className="w-full">
        <label
          htmlFor="time"
          className="block text-sm font-medium text-gray-700"
        >
          Time
        </label>
        <input
          type="time"
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default BookingForm;
