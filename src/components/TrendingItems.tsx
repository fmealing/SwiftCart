import Link from "next/link";

const TrendingItems = () => {
  return (
    <section className="p-16">
      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold">Trending Items</h2>
        <p className="text-lg text-gray-600">
          Don't Miss Out on What's Hot Right Now
        </p>
      </div>

      {/* Grid for Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Laptops & Computers */}
        <Link href="/products" className="relative group">
          <div className="h-64 bg-laptops rounded-lg shadow-lg group-hover:opacity-75 transition duration-300">
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-3xl font-bold">
                Laptops & Computers
              </h3>
            </div>
          </div>
        </Link>

        {/* Tablets */}
        <Link href="/products" className="relative group">
          <div className="h-64 bg-tablets rounded-lg shadow-lg group-hover:opacity-75 transition duration-300">
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-3xl font-bold">Tablets</h3>
            </div>
          </div>
        </Link>

        {/* Gaming Consoles */}
        <Link href="/products" className="relative group">
          <div className="h-64 bg-consoles rounded-lg shadow-lg group-hover:opacity-75 transition duration-300">
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-3xl font-bold">Gaming Consoles</h3>
            </div>
          </div>
        </Link>

        {/* PC Peripherals */}
        <Link href="/products" className="relative group">
          <div className="h-64 bg-pc-peripherals rounded-lg shadow-lg group-hover:opacity-75 transition duration-300">
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-3xl font-bold">PC Peripherals</h3>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default TrendingItems;
