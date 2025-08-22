import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    <Card 
      className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
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
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-card-foreground mb-2 line-clamp-2">
          {title}
        </h3>
        
        {detail && (
          <div className="mb-3 flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-xs">
              {detail.sex === 'm' ? '🚹 Male' : detail.sex === 'w' ? '🚺 Female' : 'Unknown'}
            </Badge>
            {detail.birth && (
              <Badge variant="outline" className="text-xs">
                Born: {new Date(detail.birth).toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })}
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mb-2">
          <p className="text-xl font-bold text-destructive">
            ¥{price}
          </p>
          {shippingPrice && (
            <span className="text-xs text-muted-foreground">
              +¥{shippingPrice} shipping
            </span>
          )}
        </div>

        {store && (
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground line-clamp-1">
              {store.storeName} • {store.address.province}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}