import { Request, Response } from 'express';
import { store } from '../services/store';

export function getSettings(req: Request, res: Response) {
  try {
    const settings = store.getSettings();
    return res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve settings',
    });
  }
}

export function updateSettings(req: Request, res: Response) {
  try {
    const updates = req.body;
    const settings = store.updateSettings(updates);

    return res.status(200).json({
      success: true,
      message: 'Settings updated successfully',
      data: settings,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update settings',
    });
  }
}
