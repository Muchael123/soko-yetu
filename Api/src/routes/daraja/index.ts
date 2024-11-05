import { Router } from 'express';
import { createPaymentIntent, getKeys, webhook } from './stripeController.js';
import { verifyToken } from '../../middlewares/authMiddleware.js';

const router = Router();

// Note: Guests can get the publishable key
router.get('/keys', getKeys);

router.post('/payment', verifyToken, createPaymentIntent);

router.post('/verify-payment', webhook);

export default router;
