"use client";

import { useEffect, useState, useCallback } from "react";
import WaterfallLayout from "../components/WaterfallLayout";
import { fetchBallPythons, transformBallPythonToProduct, BallPythonDetail, Store } from "../lib/api";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface Product {
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

export default function Home() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const PRODUCTS_PER_LOAD = 20;

  const loadMoreProducts = useCallback(() => {
    if (currentIndex >= allProducts.length || loadingMore) return;
    
    setLoadingMore(true);
    
    // Simulate loading delay
    setTimeout(() => {
      const nextIndex = Math.min(currentIndex + PRODUCTS_PER_LOAD, allProducts.length);
      const newProducts = allProducts.slice(currentIndex, nextIndex);
      
      setDisplayedProducts(prev => {
        // Ensure no duplicates when adding new products
        const existingIds = new Set(prev.map(p => p.id));
        const uniqueNewProducts = newProducts.filter(p => !existingIds.has(p.id));
        return [...prev, ...uniqueNewProducts];
      });
      setCurrentIndex(nextIndex);
      setLoadingMore(false);
    }, 500);
  }, [allProducts, currentIndex, loadingMore]);

  useEffect(() => {
    async function loadBallPythons() {
      try {
        const apiResponse = await fetchBallPythons();
        const transformedProducts = apiResponse.products.map(transformBallPythonToProduct);
        
        // Remove duplicates based on ID
        const uniqueProducts = transformedProducts.filter((product, index, self) => 
          index === self.findIndex(p => p.id === product.id)
        );
        
        setAllProducts(uniqueProducts);
        
        // Load initial batch
        const initialProducts = uniqueProducts.slice(0, PRODUCTS_PER_LOAD);
        setDisplayedProducts(initialProducts);
        setCurrentIndex(PRODUCTS_PER_LOAD);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
        console.error('Error loading ball pythons:', err);
      } finally {
        setLoading(false);
      }
    }

    loadBallPythons();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop 
          >= document.documentElement.offsetHeight - 1000) {
        loadMoreProducts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreProducts]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center text-foreground mb-2">
            Ball Python Marketplace
          </h1>
          <p className="text-center text-muted-foreground">
            Discover amazing ball pythons from trusted breeders
          </p>
          <p className="text-center text-sm text-muted-foreground mt-2">
            Loading pythons...
          </p>
        </div>
        <WaterfallLayout products={[]} showSkeleton={true} skeletonCount={16} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background py-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive">Error: {error}</p>
          <Button 
            onClick={() => window.location.reload()} 
            className="mt-4"
            variant="destructive"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center text-foreground mb-2">
          Ball Python Marketplace
        </h1>
        <p className="text-center text-muted-foreground">
          Discover amazing ball pythons from trusted breeders
        </p>
        <p className="text-center text-sm text-muted-foreground mt-2">
          Showing {displayedProducts.length} of {allProducts.length} pythons available
        </p>
      </div>
      <WaterfallLayout products={displayedProducts} />
      
      {loadingMore && (
        <div className="flex items-center justify-center py-8">
          <Spinner size="md" className="text-destructive" />
          <span className="ml-2 text-muted-foreground">Loading more pythons...</span>
        </div>
      )}
      
      {currentIndex >= allProducts.length && allProducts.length > 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">All pythons loaded!</p>
        </div>
      )}
    </div>
  );
}
