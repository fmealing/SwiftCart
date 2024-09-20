import Link from "next/link";

interface TrendingItemCardProps {
  title: string;
  bgClass: string;
  link: string;
}

const TrendingItemCard = ({ title, bgClass, link }: TrendingItemCardProps) => {
  return (
    <Link href={link} className="relative group">
      <div
        className={`h-64 ${bgClass} rounded-lg shadow-lg group-hover:opacity-75 transition duration-300`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-white text-3xl font-bold font-inter text-center">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default TrendingItemCard;
