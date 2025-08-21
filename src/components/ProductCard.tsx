import Image from "next/image";

interface BallPythonDetail {
  sex: string;
  birth: string;
  weight: number | null;
  diet: string;
}

interface Store {
  _id: string;
  storeName: string;
  address: {
    _id: string;
    province: string;
  };
}

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  imageHeight: number;
  imageWidth: number;
  detail?: BallPythonDetail;
  store?: Store;
  shippingPrice?: number | null;
  category?: string;
}

export default function ProductCard({ 
  title, 
  price, 
  image, 
  imageHeight, 
  imageWidth,
  detail,
  store,
  shippingPrice,
  category 
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
        
        {detail && (
          <div className="mb-3 space-y-1">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>{detail.sex === 'm' ? '🚹' : detail.sex === 'w' ? '🚺' : 'Unknown'}</span>
            </div>
            {detail.birth && (
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Born: {new Date(detail.birth).toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })}</span>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mb-2">
          <p className="text-xl font-bold text-red-600 dark:text-red-400">
            ¥{price}
          </p>
          {shippingPrice && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              +¥{shippingPrice} shipping
            </span>
          )}
        </div>

        {store && (
          <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
              {store.storeName} • {store.address.province}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}