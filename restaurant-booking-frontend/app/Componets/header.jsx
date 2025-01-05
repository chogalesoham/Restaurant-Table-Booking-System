"use client";

import React, { useEffect, useState } from "react";
import Logo from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";

const Header = () => {
  const [showBooking, setShowBooking] = useState(false);
  const [bookingData, setBookingData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUserBooking = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get`);
      const data = await res.json();
      setBookingData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const deleteBooking = async (bookingId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/delete/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        toast.error("Booking deleted successfully");
        getUserBooking();
      } else {
        toast.error("Failed to delete booking !");
      }
    } catch (error) {
      toast.error("Error deleting booking !");
    }
  };

  useEffect(() => {
    if (showBooking) {
      getUserBooking();
    }
  }, [showBooking]);

  return (
    <header className=" px-4 xl:px-10 py-3 shadow-lg fixed top-0 left-0 right-0 bg-white z-10">
      <div className="container mx-auto flex items-center justify-between">
        <Link href={"/"}>
          <Image
            src={Logo}
            width={250}
            height={200}
            alt="logo"
            className=" object-fill cursor-pointer w-[200] h-[50]"
          />
        </Link>

        <button
          onClick={() => setShowBooking(!showBooking)}
          className="bg-black p-2 xl:p-3 rounded-lg text-sm text-white xl:font-bold hover:bg-slate-600 cursor-pointer"
        >
          Your Tables
        </button>
        {showBooking ? (
          <>
            <div
              className={`bg-black w-screen h-screen top-0 left-0 right-0 bottom-0 opacity-60 fixed z-10 transition-opacity duration-300 ease-in-out`}
              style={{ opacity: showBooking ? 0.6 : 0 }}
            ></div>
            <div
              className={` w-full md:w-[400px] h-screen fixed bg-white top-0 right-0 bottom-0 z-30 p-2 transition-transform duration-500 ease-in-out`}
              style={{
                transform: showBooking ? "translateX(0)" : "translateX(100%)",
              }}
            >
              <div className="flex items-center justify-between p-3">
                <h2 className=" text-xl font-bold my-2  ">
                  Your Restaurants Booking
                </h2>
                <RxCross1
                  onClick={() => setShowBooking(!showBooking)}
                  className="cursor-pointer h-8 w-8 font-bold bg-red-600 rounded-lg p-2 text-white hover:bg-transparent border-black hover:text-black"
                />
              </div>
              <hr />

              <div className="flex flex-col items-center justify-start gap-4 p-2 h-screen overflow-auto">
                {!isLoading && bookingData.length > 0 ? (
                  bookingData.map((item) => {
                    return (
                      <div
                        key={item?._id}
                        className="w-full shadow-lg rounded-md min-h-16 border"
                      >
                        <div className="flex items-center justify-around gap-1 p-1">
                          <Image
                            src={item?.restaurantImage}
                            alt={item?.restaurantName}
                            height={60}
                            width={60}
                            className="rounded-full shadow-xl border"
                          />
                          <div className="flex flex-col items-start gap-1">
                            <h3 className=" text-xl font-semibold">
                              {item?.restaurantName}
                            </h3>
                            <p className=" text-sm font-semibold text-gray-700">
                              {" "}
                              Table Book For {item?.guests} Guests
                            </p>
                            <div className="flex items-center justify-start gap-2">
                              <span className=" text-sm text-gray-700">
                                Date: <b>{item?.date}</b>
                              </span>
                              <span className=" text-sm text-gray-700">
                                Time: <b> {item?.time}</b>
                              </span>
                            </div>
                          </div>
                          <FaTrashAlt
                            onClick={() => deleteBooking(item?._id)}
                            className="cursor-pointer text-xl text-red-700"
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className=" mt-28">
                    <p className="text-xl font-bold">No Bookings Available !</p>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
