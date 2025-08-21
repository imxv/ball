"use client";

import { useEffect, useState } from "react";
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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBallPythons() {
      try {
        const apiResponse = await fetchBallPythons();
        const transformedProducts = apiResponse.products.map(transformBallPythonToProduct);
        setProducts(transformedProducts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
        console.error('Error loading ball pythons:', err);
      } finally {
        setLoading(false);
      }
    }

    loadBallPythons();
  }, []);

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
          {products.length} pythons available
        </p>
      </div>
      <WaterfallLayout products={products} />
    </div>
  );
}
