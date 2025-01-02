"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import log from "@/public/restaurant-1.jpg";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false); // Added to check client-side rendering

  console.log(restaurants);

  const getRestaurantData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/bookings/restaurants");
      const data = await res.json();
      setRestaurants(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRestaurantData();
    setIsClient(true); // Mark as client-side
  }, []);

  if (!isClient) {
    return null; // Avoid SSR rendering mismatch
  }

  return (
    <div className="my-4">
      <h2 className="text-center text-3xl font-bold my-4">
        All Popular Restaurants
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : (
          restaurants.map((item) => (
            <div key={item._id} className="border p-4 rounded-lg shadow-lg">
              <Image
                src={log}
                alt={item?.name}
                width={300}
                height={200}
                className="rounded-lg"
              />
              <h3 className="text-xl font-semibold mt-2">{item?.name}</h3>
              <p className="text-gray-600">{item?.cuisine}</p>
              <p className="mt-2">{item?.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Restaurants;
