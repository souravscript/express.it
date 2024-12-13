import express from 'express'
import { verifyToken } from '../middlewares/authMiddleware.js';
import { createExpression } from '../controllers/expressionController.js';


const router=express.Router();
router.post('/expression',verifyToken,createExpression)

export default router;