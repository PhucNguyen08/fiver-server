import express from 'express';
import { createGig, deleteGig, getGig, getGigs } from '../controllers/gig.js';
import { verifyToken } from '../middleware/auth.js';
import upload from '../utils/multerConfig.js';

const router = express.Router();

router.post('/create', verifyToken, upload.array('pictures'), createGig);
router.delete('/:id', verifyToken, deleteGig);
router.get('/single/:id', getGig);
router.get('/', getGigs);

export default router;
