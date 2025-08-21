import Image from "next/image";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  imageHeight: number;
  imageWidth: number;
}

export default function ProductCard({ 
  title, 
  price, 
  image, 
  imageHeight, 
  imageWidth 
}: ProductCardProps) {
  const aspectRatio = imageHeight / imageWidth;
  const cardWidth = 300; // Fixed card width
  const calculatedHeight = cardWidth * aspectRatio;

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      style={{ width: `${cardWidth}px` }}
    >
      <div 
        className="relative overflow-hidden"
        style={{ height: `${calculatedHeight}px` }}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          sizes="300px"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-xl font-bold text-red-600 dark:text-red-400">
          ¥{price.toLocaleString()}
        </p>
      </div>
    </div>
  );
}