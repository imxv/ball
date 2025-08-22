import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  const cardWidth = 300;
  const skeletonImageHeight = 400; // Default image height

  return (
    <Card 
      className="overflow-hidden"
      style={{ width: `${cardWidth}px` }}
    >
      <div 
        className="relative overflow-hidden"
        style={{ height: `${skeletonImageHeight}px` }}
      >
        <Skeleton className="w-full h-full" />
      </div>
      <CardContent className="p-4">
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-3" />
        
        <div className="mb-3 flex flex-wrap gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-24" />
        </div>

        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>

        <div className="pt-2 border-t border-border">
          <Skeleton className="h-3 w-full" />
        </div>
      </CardContent>
    </Card>
  );
}