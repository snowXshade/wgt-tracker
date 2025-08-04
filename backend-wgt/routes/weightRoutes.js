import express from 'express';
import { addWeight, getWeights, deleteWeight, updateWeight } from '../controllers/weightController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, addWeight);
router.get('/', verifyToken, getWeights);

router.delete('/:id', verifyToken, deleteWeight);   
router.put('/:id', verifyToken, updateWeight); 
export default router;
