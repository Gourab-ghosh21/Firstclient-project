import { Router } from 'express';
import {
  adminLogin,
  getAdminLeads,
  updateAdminLead,
  createAdminProduct,
  updateAdminProduct,
  deleteAdminProduct,
} from '../controllers/adminController';
import { requireAdminAuth } from '../middleware/auth';

const router = Router();

// Public admin login
router.post('/login', adminLogin);

// Protected admin routes
router.get('/leads', requireAdminAuth, getAdminLeads);
router.patch('/leads/:id', requireAdminAuth, updateAdminLead);

router.post('/products', requireAdminAuth, createAdminProduct);
router.patch('/products/:id', requireAdminAuth, updateAdminProduct);
router.put('/products/:id', requireAdminAuth, updateAdminProduct);
router.delete('/products/:id', requireAdminAuth, deleteAdminProduct);

export default router;
