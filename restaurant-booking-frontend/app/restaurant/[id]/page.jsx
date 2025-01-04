import BookingForm from "@/app/Componets/booking-form";

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
    <div className="mt-24">
      <h1 className="text-4xl text-center my-8">
        Book Your Table in {restaurant?.name}
      </h1>
      <div className="flex items-center justify-center gap-6 h-[500px]">
        <div className="w-[40%] h-full">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={restaurant.img}
              alt={restaurant.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h1 className="text-3xl font-semibold text-gray-800">
                {restaurant.name}
              </h1>
              <p className="text-lg text-gray-600">
                {restaurant.cuisine} Cuisine
              </p>
              <p className="text-sm text-gray-500">{restaurant.address}</p>
              <div className="flex items-center mt-4">
                <span className="text-yellow-500 font-bold">
                  {restaurant.rating}
                </span>
                <span className="ml-2 text-gray-500">Rating</span>
              </div>
              <p className="mt-6 text-gray-700">{restaurant.description}</p>
            </div>
          </div>
        </div>

        <BookingForm restaurantData={restaurant} />
      </div>
    </div>
  );
}
