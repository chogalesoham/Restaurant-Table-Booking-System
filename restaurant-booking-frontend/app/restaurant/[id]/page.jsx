import BookingForm from "@/app/Componets/booking-form";
import { FaStar } from "react-icons/fa6";

export default async function RestaurantPage({ params }) {
  const { id } = params;

  // Fetch restaurant data
  const restaurant = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/restaurants/${id}`
  ).then((res) => res.json());

  if (!restaurant) {
    return <h1>Restaurant Not Found</h1>;
  }

  return (
    <div className="mt-24 mb-32">
      <h1 className="text-2xl md:text-4xl font-bold text-gray-800 text-center mb-6">
        Book Your Table in {restaurant?.name}
      </h1>
      <div className="flex flex-col xl:flex-row items-center justify-center gap-6 h-auto xl:h-[480px]">
        <div className=" w-full xl:w-[40%] h-full p-5 shadow-xl border rounded-lg">
          <div className="bg-white rounded-lg overflow-hidden">
            <img
              src={restaurant.img}
              alt={restaurant.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h1 className="text-3xl font-semibold text-gray-800">
                {restaurant.name}
              </h1>
              <div className="flex items-center mt-1 text-orange-500 font-bold">
                <FaStar />
                {restaurant.rating}
              </div>
              <p className="text-lg text-gray-600">
                {restaurant.cuisine} Cuisine
              </p>
              <p className="text-sm text-gray-500">{restaurant.address}</p>
              <p className="mt-2 text-gray-700">{restaurant.description}</p>
            </div>
          </div>
        </div>

        <BookingForm restaurantData={restaurant} />
      </div>
    </div>
  );
}
