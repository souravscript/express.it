import express from 'express'
import { verifyToken } from '../middlewares/authMiddleware.js';
import { createExpression, getAllExpressionController, getOthersExpressionController, getOwnExpressionsController } from '../controllers/expressionController.js';

/**
 * @swagger
 * tags:
 *   name: Expression
 *   description: API for managing expressions
 */

/**
 * @swagger
 * /expression:
 *   post:
 *     tags: [Expression]
 *     summary: Create a new expression
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               expression:
 *                 type: string
 *                 description: The expression text
 *                 example: "This is a new expression"
 *     responses:
 *       201:
 *         description: Expression created successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /all-expression:
 *   get:
 *     tags: [Expression]
 *     summary: Retrieve all expressions
 *     responses:
 *       200:
 *         description: A list of expressions
 */

/**
 * @swagger
 * /own-expressions:
 *   get:
 *     tags: [Expression]
 *     summary: Retrieve own expressions
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of own expressions
 */

/**
 * @swagger
 * /others-expressions:
 *   get:
 *     tags: [Expression]
 *     summary: Retrieve others' expressions
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of others' expressions
 */

const router=express.Router();
router.post('/expression',verifyToken,createExpression)
router.get('/all-expression',getAllExpressionController)
router.get('/own-expressions',verifyToken,getOwnExpressionsController)
router.get('/others-expressions',verifyToken,getOthersExpressionController)

export default router;