import { Router } from 'express';
import healthRoutes from './healthRoutes';
import productsRoutes from './productsRoutes';
import categoriesRoutes from './categoriesRoutes';
import leadsRoutes from './leadsRoutes';
import adminRoutes from './adminRoutes';
import settingsRoutes from './settingsRoutes';

const router = Router();

router.use('/health', healthRoutes);
router.use('/products', productsRoutes);
router.use('/categories', categoriesRoutes);
router.use('/leads', leadsRoutes);
router.use('/admin', adminRoutes);
router.use('/settings', settingsRoutes);

// Direct top-level aliases requested in user specifications
router.use('/', leadsRoutes);

export default router;
