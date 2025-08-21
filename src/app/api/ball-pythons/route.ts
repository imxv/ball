import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      'https://www.repttown.com/n/api/v1/product/animals/snakes/ballpythons?sort=0&stock=in&count=true&size=20',
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching ball pythons:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ball pythons' },
      { status: 500 }
    );
  }
}