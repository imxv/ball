import { NextResponse } from 'next/server';

async function fetchAllBallPythons() {
  // First, get the total count
  const initialResponse = await fetch(
    'https://www.repttown.com/n/api/v1/product/animals/snakes/ballpythons?sort=0&stock=in&count=true&size=1',
    {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    }
  );

  if (!initialResponse.ok) {
    throw new Error(`HTTP error! status: ${initialResponse.status}`);
  }

  const initialData = await initialResponse.json();
  const totalAmount = initialData.amount;

  // Then fetch all products
  const response = await fetch(
    `https://www.repttown.com/n/api/v1/product/animals/snakes/ballpythons?sort=0&stock=in&count=true&size=${totalAmount}`,
    {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function GET() {
  try {
    const data = await fetchAllBallPythons();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching ball pythons:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ball pythons' },
      { status: 500 }
    );
  }
}