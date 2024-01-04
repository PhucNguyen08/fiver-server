import express from 'express';
import {
    getConversations,
    createConversation,
    getSingleConversation,
    updateConversation,
} from '../controllers/conversation.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', verifyToken, getConversations);
router.post('/create', verifyToken, createConversation);
router.get('/single/:id', verifyToken, getSingleConversation);
router.put('/:id', verifyToken, updateConversation);

export default router;
