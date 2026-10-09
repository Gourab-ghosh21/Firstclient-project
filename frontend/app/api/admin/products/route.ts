import { NextRequest, NextResponse } from 'next/server';
import { getInitialProducts, saveProducts } from '@/lib/store';
import { Product } from '@/lib/types';

export async function GET() {
  const products = getInitialProducts();
  return NextResponse.json({ success: true, products });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const products = getInitialProducts();

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      slug: (body.name || 'product').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: body.name || 'New Garment Design',
      category: body.category || 'Kurtis',
      categorySlug: (body.category || 'kurtis').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: body.description || 'Wholesale garment specification.',
      fabric: body.fabric || 'Rayon / Cotton Blend',
      sizes: body.sizes || ['M', 'L', 'XL'],
      colours: body.colours || ['Assorted'],
      moq: Number(body.moq) || 12,
      unit: body.unit || 'pcs',
      price: body.price ? Number(body.price) : null,
      showPrice: Boolean(body.showPrice),
      availability: body.availability || 'In Stock',
      featured: Boolean(body.featured),
      image: body.image || '/images/cat-1-ref.jpg',
      gallery: body.gallery || ['/images/cat-1-ref.jpg'],
    };

    const updated = [newProduct, ...products];
    saveProducts(updated);

    return NextResponse.json({ success: true, product: newProduct });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    const products = getInitialProducts();
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    products[index] = { ...products[index], ...updates };
    saveProducts(products);

    return NextResponse.json({ success: true, product: products[index] });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const products = getInitialProducts();
    const filtered = products.filter((p) => p.id !== id);
    saveProducts(filtered);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
