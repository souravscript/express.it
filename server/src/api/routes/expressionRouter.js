import express from 'express'
import { verifyToken } from '../middlewares/authMiddleware.js';
import { createExpression, getAllExpressionController, getOthersExpressionController, getOwnExpressionsController } from '../controllers/expressionController.js';


const router=express.Router();
router.post('/expression',verifyToken,createExpression)
router.get('/all-expression',getAllExpressionController)
router.get('/my-expressions',verifyToken,getOwnExpressionsController)
router.get('/others-expressions',verifyToken,getOthersExpressionController)

export default router;