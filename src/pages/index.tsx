import LogoutButton from "../components/LogoutButton";
import Hero from "../components/Hero";
import NewArrivals from "../components/NewArrivals";
import TrendingItems from "../components/TrendingItems";

const HomePage = ({ user }: { user: any }) => {
  return (
    <>
      <Hero />
      <NewArrivals />
      <TrendingItems />
    </>
  );
};

export default HomePage;
