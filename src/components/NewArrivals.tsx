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
            price="£219.00"
            image="/images/apple-watch.jpg"
          />
          <ProductCard
            name="Headphones"
            price="£119.00"
            image="/images/headphones.jpg"
          />
          <ProductCard
            name="Apple Laptop"
            price="£2,029.00"
            image="/images/apple-laptop.jpg"
          />
          <ProductCard name="TV" price="£505.00" image="/images/tv.jpg" />
          <ProductCard
            name="PS4 Controller"
            price="£132.00"
            image="/images/ps4-controller.jpg"
          />
          <ProductCard
            name="Apple iPhone"
            price="£1,219.00"
            image="/images/apple-iphone.jpg"
          />
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
