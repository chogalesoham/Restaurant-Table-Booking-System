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
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600">Booking Confirmed!</h1>
      <p className="text-gray-700 mt-4 text-lg">
        Thank you for your booking,{" "}
        <span className="font-semibold">
          {restaurantData?.name || "Restaurant"}
        </span>
        !
      </p>
      <div className="mt-8 p-6 bg-white rounded-lg shadow-lg w-[90%] md:w-[50%]">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Booking Summary
        </h2>
        <ul className="space-y-2 text-gray-600">
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

        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Restaurant Details
          </h3>
          <ul className="mt-2 text-gray-600">
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

      <Link href={"/"}>
        <button className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default Confirmation;
