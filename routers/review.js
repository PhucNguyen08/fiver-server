import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import {
    createReview,
    getReviews,
    deleteReview,
} from '../controllers/review.js';

const router = express.Router();

router.post('/create', verifyToken, createReview);
router.get('/:gigId', getReviews);
router.delete('/delete', verifyToken, deleteReview);

export default router;
