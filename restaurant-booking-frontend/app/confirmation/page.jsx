"use client";

import React from "react";
import Cookies from "js-cookie";
import Link from "next/link";

const Confirmation = () => {
  let formData = {};
  let restaurantData = {};

  try {
    const formDataCookie = Cookies.get("formData");
    if (formDataCookie) {
      formData = JSON.parse(formDataCookie);
    }
  } catch (error) {
    console.error("Error parsing formData cookie:", error);
  }

  try {
    const restaurantDataCookie = Cookies.get("restaurantData");
    if (restaurantDataCookie) {
      restaurantData = JSON.parse(restaurantDataCookie);
    }
  } catch (error) {
    console.error("Error parsing restaurantData cookie:", error);
  }

  return (
    <div className="min-h-screen mt-10 flex flex-col items-center bg-gray-50 px-4">
      <div className="max-w-4xl w-full mt-16 p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-extrabold text-blue-600 text-center">
          Booking Confirmed!
        </h1>
        <p className="text-center text-lg text-gray-700 mt-4">
          Thank you for your booking,{" "}
          <span className="font-semibold text-gray-900">
            {restaurantData?.name || "Restaurant"}
          </span>
          !
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Booking Summary */}
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Booking Summary
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>
                <strong>Name:</strong> {formData?.name || "N/A"}
              </li>
              <li>
                <strong>Contact:</strong> {formData?.contact || "N/A"}
              </li>
              <li>
                <strong>Guests:</strong> {formData?.guests || "N/A"}
              </li>
              <li>
                <strong>Date:</strong> {formData?.date || "N/A"}
              </li>
              <li>
                <strong>Time:</strong> {formData?.time || "N/A"}
              </li>
            </ul>
          </div>

          {/* Restaurant Details */}
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Restaurant Details
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>
                <strong>Name:</strong> {restaurantData?.name || "N/A"}
              </li>
              <li>
                <strong>Address:</strong> {restaurantData?.address || "N/A"}
              </li>
              <li>
                <strong>Cuisine:</strong> {restaurantData?.cuisine || "N/A"}
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-10">
          <Link href="/">
            <button className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
