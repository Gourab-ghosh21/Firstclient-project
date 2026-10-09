import { Router } from 'express';
import {
  createWholesaleQuote,
  createContactEnquiry,
  createStartBusinessLead,
} from '../controllers/leadsController';
import { rateLimiter } from '../middleware/rateLimiter';

const router = Router();

// Apply rate limiting to public lead submission endpoints
router.use(rateLimiter(15, 60000));

router.post('/wholesale-quote', createWholesaleQuote);
router.post('/contact', createContactEnquiry);
router.post('/start-business', createStartBusinessLead);

// Backward-compatible endpoints
router.post('/enquiry', createWholesaleQuote);
router.post('/questionnaire', createStartBusinessLead);

export default router;
