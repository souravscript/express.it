import express from 'express'
import { verifyToken } from '../middlewares/authMiddleware.js';


const router=express.Router();
router.post('/expression',verifyToken)