export interface BallPythonDetail {
  sex: string;
  birth: string;
  weight: number | null;
  diet: string;
}

export interface Store {
  _id: string;
  storeName: string;
  address: {
    _id: string;
    province: string;
  };
}

export interface Category {
  title: string;
  path: string;
}

export interface BallPythonProduct {
  _id: string;
  title: string;
  images: string[];
  price: number;
  shippingPrice: number | null;
  stock: number | null;
  type: string;
  detail: BallPythonDetail;
  s1: Category;
  s2: Category;
  store: Store;
}

export interface BallPythonApiResponse {
  amount: number;
  products: BallPythonProduct[];
}

export async function fetchBallPythons(): Promise<BallPythonApiResponse> {
  const response = await fetch('/api/ball-pythons');
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}

export function transformBallPythonToProduct(pythonProduct: BallPythonProduct) {
  const imageUrl = pythonProduct.images.length > 0 
    ? `https://www.repttown.com/n/images/product/thumb/${pythonProduct.images[0]}.jpeg`
    : 'https://picsum.photos/300/400?random=snake';

  return {
    id: pythonProduct._id,
    title: pythonProduct.title,
    price: pythonProduct.price / 100, // Convert from cents to dollars
    image: imageUrl,
    imageHeight: 400, // Default height
    imageWidth: 300,  // Default width
    detail: pythonProduct.detail,
    store: pythonProduct.store,
    shippingPrice: pythonProduct.shippingPrice,
    category: `${pythonProduct.s1.title} > ${pythonProduct.s2.title}`,
  };
}