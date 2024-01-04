import express from 'express';
import { getOrders, paymentIntent } from '../controllers/order.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// router.post('/create', verifyToken, createOrder);
router.post('/razorpay/:id', verifyToken, paymentIntent);
router.get('/', verifyToken, getOrders);

export default router;
