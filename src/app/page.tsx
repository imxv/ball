"use client";

import { useEffect, useState, useCallback } from "react";
import WaterfallLayout from "../components/WaterfallLayout";
import { fetchBallPythons, transformBallPythonToProduct, BallPythonDetail, Store } from "../lib/api";

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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading ball pythons...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-200 mb-2">
          Ball Python Marketplace
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Discover amazing ball pythons from trusted breeders
        </p>
        <p className="text-center text-sm text-gray-500 dark:text-gray-500 mt-2">
          Showing {displayedProducts.length} of {allProducts.length} pythons available
        </p>
      </div>
      <WaterfallLayout products={displayedProducts} />
      
      {loadingMore && (
        <div className="flex items-center justify-center py-8">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading more pythons...</span>
        </div>
      )}
      
      {currentIndex >= allProducts.length && allProducts.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">All pythons loaded!</p>
        </div>
      )}
    </div>
  );
}
