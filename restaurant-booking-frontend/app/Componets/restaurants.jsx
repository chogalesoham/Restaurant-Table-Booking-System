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
    <div className="my-4">
      <h2 className="text-center text-4xl font-bold my-4">
        All Popular Restaurants
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-10 ">
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : (
          restaurants.map((item) => (
            <div
              key={item._id}
              className="border p-4 rounded-lg shadow-lg hover:border-orange-400 hover:bg-orange-50  "
            >
              <Image
                src={item?.img}
                alt={item?.name}
                width={300}
                height={200}
                className="rounded-lg object-cover h-[65%] w-[100%]"
              />
              <div className=" h-auto">
                <h3 className="text-xl font-semibold mt-2">{item?.name}</h3>
                <div className=" flex items-center justify-start gap-4">
                  <span className=" text-orange-500 font-bold flex items-center">
                    <FaStar /> {item?.rating}
                  </span>
                  <p className="text-gray-600">{item?.cuisine}</p>
                </div>

                <p className="mt-2 line-clamp-2">{item?.description}</p>

                <Link href={`/restaurant/${item?._id}`}>
                  <button className=" bg-black text-white py-2 px-3 mt-2 cursor-pointer">
                    Book Tabele
                  </button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Restaurants;
