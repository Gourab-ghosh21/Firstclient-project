import { Request, Response } from 'express';
import { store } from '../services/store';

export function getCategories(req: Request, res: Response) {
  try {
    const categories = store.getCategories();
    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve categories',
    });
  }
}
