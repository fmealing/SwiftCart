import Link from "next/link";

const Hero = () => {
  return (
    <section className="hero-background text-white">
      <div className="flex flex-col items-center justify-center h-full bg-black bg-opacity-50 ">
        <h1 className="font-lora text-7xl font-bold mb-4">Minimalist Tech</h1>

        <Link href="/auth/signup">
          <p className="text-xl font-inter bg-amber-500 text-white font-semibold rounded-full hover:bg-amber-600 transition duration-300 px-6 py-3">
            Register
          </p>
        </Link>
        <Link href="/auth/login">
          <p className="font-inter font-medium px-6 py-3 text-amber-500 hover:text-amber-600 transition duration-300">
            Already have an account?
          </p>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
