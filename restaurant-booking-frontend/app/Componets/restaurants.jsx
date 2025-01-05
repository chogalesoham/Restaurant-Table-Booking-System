"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const getRestaurantData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/restaurants`);
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
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="my-4 flex flex-col items-center justify-center">
      <h1 className="text-2xl md:text-4xl font-bold text-gray-800 text-center mb-6">
        All Popular Restaurants
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-10">
        {isLoading
          ? Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className=" bg-slate-200  w-72 h-[300px] md:h-[350px]  rounded-lg animate-pulse"
              ></div>
            ))
          : restaurants.map((item) => (
              <div
                key={item._id}
                className="border p-4 rounded-lg shadow-md hover:shadow-lg hover:border-orange-400 hover:bg-orange-50 transition duration-300"
              >
                <Image
                  src={item?.img}
                  alt={item?.name}
                  width={300}
                  height={200}
                  className="rounded-lg object-cover h-[200px] md:h-[220px] w-full"
                />
                <div className="mt-3">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item?.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-orange-500 font-bold flex items-center">
                      <FaStar /> {item?.rating}
                    </span>
                    <p className="text-gray-600 text-sm">{item?.cuisine}</p>
                  </div>
                  <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                    {item?.description}
                  </p>
                  <Link href={`/restaurant/${item?._id}`}>
                    <button className="bg-black text-white py-2 px-4 mt-3 rounded-md w-full text-center text-sm hover:bg-gray-800 transition">
                      Book Table
                    </button>
                  </Link>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Restaurants;
