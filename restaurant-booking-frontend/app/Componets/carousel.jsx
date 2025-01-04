"use client";

import { useState, useEffect } from "react";
import banner1 from "@/public/restaurant-1.jpg";
import banner2 from "@/public/restaurant-2.jpg";
import banner3 from "@/public/restaurant-3.jpg";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [banner1, banner2, banner3, banner2];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full mx-auto overflow-hidden">
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full h-[450] bg-cover bg-center flex items-center justify-center flex-col gap-6"
            style={{
              backgroundImage: `url(${slide.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h1 className="text-6xl font-bold text-white drop-shadow-md hover:scale-105 transition-transform duration-300 shadow-lg">
              Reserve Your Restaurant Table
            </h1>
            <button className="mt-4 py-2 px-6 bg-black text-white  shadow-lg hover:bg-white hover:text-black hover:scale-105 transition-all duration-300">
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
