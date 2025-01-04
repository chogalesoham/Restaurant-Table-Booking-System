import Carousel from "./Componets/carousel";
import Restaurants from "./Componets/restaurants";

export default function Home() {
  return (
    <div className=" mt-20 container mx-auto">
      <Carousel />
      <Restaurants />
    </div>
  );
}
