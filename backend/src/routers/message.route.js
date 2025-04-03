import express from 'express';
import { protectRoute } from '../lib/middleware.js';
import { getMessages, getUserSideBar, sendMessage } from '../controllers/message.controller.js';
const router = express.Router();

router.get('/users', protectRoute, getUserSideBar);

router.get('/:id', protectRoute, getMessages)

router.post('/send/:id', protectRoute, sendMessage)

export default router;