import TrendingItemCard from "./TrendingItemsCard";

const TrendingItems = () => {
  return (
    <section className="p-16">
      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="font-lora text-4xl font-bold">Trending Items</h2>
        <p className="font-inter text-lg text-gray-600">
          Don&apos;t Miss Out on What&apos;s Hot Right Now
        </p>
      </div>

      {/* Grid for Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <TrendingItemCard
          title="Laptops & Computers"
          bgClass="bg-laptops"
          link="/search?query=laptop"
        />
        <TrendingItemCard
          title="Tablets"
          bgClass="bg-tablets"
          link="/search?query=tablet"
        />
        <TrendingItemCard
          title="Gaming Consoles"
          bgClass="bg-consoles"
          link="/search?query=console"
        />
        <TrendingItemCard
          title="PC Peripherals"
          bgClass="bg-pc-peripherals"
          link="/search?query=peripheral"
        />
      </div>
    </section>
  );
};

export default TrendingItems;
