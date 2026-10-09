import { Router } from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController';
import { requireAdminAuth } from '../middleware/auth';

const router = Router();

router.get('/', getSettings);
router.put('/', requireAdminAuth, updateSettings);
router.post('/', requireAdminAuth, updateSettings);

export default router;
