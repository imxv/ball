"use client";

import React, { useEffect, useState, useCallback } from "react";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

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

interface WaterfallLayoutProps {
  products: Product[];
  showSkeleton?: boolean;
  skeletonCount?: number;
}

export default function WaterfallLayout({ products, showSkeleton = false, skeletonCount = 12 }: WaterfallLayoutProps) {
  const [columns, setColumns] = useState<Product[][]>([]);
  const [skeletonColumns, setSkeletonColumns] = useState<number[][]>([]);
  const [columnCount, setColumnCount] = useState(4);

  const calculateColumns = useCallback(() => {
    const width = window.innerWidth;
    let cols = 1;
    if (width >= 1536) cols = 5; // 2xl
    else if (width >= 1280) cols = 4; // xl
    else if (width >= 1024) cols = 3; // lg
    else if (width >= 640) cols = 2; // sm
    else cols = 1;
    
    setColumnCount(cols);
  }, []);

  const distributeProducts = useCallback(() => {
    const newColumns: Product[][] = Array.from({ length: columnCount }, () => []);
    const columnHeights = Array(columnCount).fill(0);

    products.forEach((product) => {
      // 计算每个卡片的高度 (图片高度 + 内容区域高度)
      const cardWidth = 300;
      const aspectRatio = product.imageHeight / product.imageWidth;
      const imageHeight = cardWidth * aspectRatio;
      const contentHeight = 100; // 标题和价格区域的估计高度
      const totalHeight = imageHeight + contentHeight;

      // 找到最短的列
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
      
      // 将产品添加到最短的列
      newColumns[shortestColumnIndex].push(product);
      columnHeights[shortestColumnIndex] += totalHeight + 16; // 16px 为间距
    });

    setColumns(newColumns);
  }, [products, columnCount]);

  const distributeSkeletons = useCallback(() => {
    const newSkeletonColumns: number[][] = Array.from({ length: columnCount }, () => []);
    
    for (let i = 0; i < skeletonCount; i++) {
      const columnIndex = i % columnCount;
      newSkeletonColumns[columnIndex].push(i);
    }
    
    setSkeletonColumns(newSkeletonColumns);
  }, [columnCount, skeletonCount]);

  useEffect(() => {
    calculateColumns();
    window.addEventListener('resize', calculateColumns);
    return () => window.removeEventListener('resize', calculateColumns);
  }, [calculateColumns]);

  useEffect(() => {
    distributeProducts();
  }, [distributeProducts]);

  useEffect(() => {
    distributeSkeletons();
  }, [distributeSkeletons]);

  if (showSkeleton) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-4 justify-center">
          {skeletonColumns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-4" style={{ width: '300px' }}>
              {column.map((skeletonId) => (
                <ProductCardSkeleton key={skeletonId} />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex gap-4 justify-center">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-col gap-4" style={{ width: '300px' }}>
            {column.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                image={product.image}
                imageHeight={product.imageHeight}
                imageWidth={product.imageWidth}
                detail={product.detail}
                store={product.store}
                shippingPrice={product.shippingPrice}
                category={product.category}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}