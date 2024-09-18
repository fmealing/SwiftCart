import ProductCard from "./ProductCard";

const NewArrivals = () => {
  return (
    <section className="bg-amber-100 py-40">
      <div className="container mx-auto px-4">
        <h2 className="font-lora text-3xl font-bold text-center mb-6">
          New Arrivals
        </h2>
        <p className="font-inter text-lg text-center mb-10">
          Discover the Latest Trends and Fresh Arrivals
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProductCard
            name="Apple Watch"
            price={219.0} // Use number for the price
            image="/images/apple-watch.jpg"
            brand="Apple" // Add the brand
          />
          <ProductCard
            name="Headphones"
            price={119.0}
            image="/images/headphones.jpg"
            brand="Sony" // Add the brand
          />
          <ProductCard
            name="Apple Laptop"
            price={2029.0}
            image="/images/apple-laptop 2.jpg"
            brand="Apple" // Add the brand
          />
          <ProductCard
            name="TV"
            price={505.0}
            image="/images/tv.jpg"
            brand="Samsung" // Add the brand
          />
          <ProductCard
            name="PS4 Controller"
            price={132.0}
            image="/images/ps4-controller 2.jpg"
            brand="Sony" // Add the brand
          />
          <ProductCard
            name="Apple iPhone"
            price={1219.0}
            image="/images/apple-iphone.jpg"
            brand="Apple" // Add the brand
          />
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
