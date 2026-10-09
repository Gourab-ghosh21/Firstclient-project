import { Request, Response } from 'express';
import { store } from '../services/store';

export function getProducts(req: Request, res: Response) {
  try {
    const { category, featured } = req.query;
    let products = store.getProducts();

    if (category && typeof category === 'string' && category !== 'all') {
      products = products.filter(
        (p) =>
          p.categorySlug === category.toLowerCase() ||
          p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (featured === 'true') {
      products = products.filter((p) => p.featured);
    }

    return res.status(200).json({
      success: true,
      data: products,
      count: products.length,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve products',
    });
  }
}

export function getProductById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const product = store.getProductById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve product',
    });
  }
}
