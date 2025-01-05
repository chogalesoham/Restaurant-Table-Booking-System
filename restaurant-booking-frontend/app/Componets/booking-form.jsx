"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { ImSpinner } from "react-icons/im";

const BookingForm = ({ restaurantData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    restaurantName: restaurantData?.name,
    restaurantImage: restaurantData?.img,
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
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        Cookies.set("formData", JSON.stringify(formData), { expires: 1 });
        Cookies.set("restaurantData", JSON.stringify(restaurantData), {
          expires: 1,
        });
        toast.success("Restaurant Booking SuccessFull");
        router.push("/confirmation");
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error Restaurant Booking !");
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" w-full xl:w-[40%] h-full p-4 bg-gray-100 rounded-lg shadow-md flex flex-col items-start justify-between gap-4 xl:gap-0  "
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
        className={`w-full bg-black text-white py-2 px-4 rounded-md hover:bg-blue-700
         ${isLoading ? " cursor-not-allowed" : " cursor-pointer"}  `}
      >
        {isLoading ? (
          <ImSpinner className=" text-2xl animate-spin mx-auto" />
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
};

export default BookingForm;
