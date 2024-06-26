// src/routes/commentRoutes.js
import express from 'express';
import { getComments, postComment } from '../controllers/commentController.js';

const router = express.Router();

router.get('/:productId/comments', getComments);
router.post('/:productId/comments', postComment);

export default router;
