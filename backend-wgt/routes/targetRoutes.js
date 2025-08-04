// /routes/target.routes.js
import express from 'express';
import user from '../models/userModel.js';
import {verifyToken} from '../middlewares/authMiddleware.js';

const router = express.Router();

router.patch('/target', verifyToken, async (req, res) => {
  try {
    const { targetWeight, height } = req.body;

    // At least one must be provided
    if (targetWeight === undefined && height === undefined) {
      return res.status(400).json({ message: 'Please provide targetWeight or height' });
    }

    // Validate targetWeight
    if (targetWeight !== undefined) {
      if (typeof targetWeight !== 'number' || targetWeight < 0 || targetWeight > 150) {
        return res.status(400).json({ message: 'targetWeight must be a number between 0 and 150' });
      }
    }

    // Validate height
    if (height !== undefined) {
      if (typeof height !== 'number' || height < 0 || height > 213) {
        return res.status(400).json({ message: 'height must be a number between 0 and 213' });
      }
    }

    const updates = {};
    if (targetWeight !== undefined) updates.targetWeight = targetWeight;
    if (height !== undefined) updates.height = height;

    const updatedUser = await user.findByIdAndUpdate(req.user.userId, updates, { new: true }).select('-password');

    res.json({ message: 'User data updated', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating user data' });
  }
});

export default router;
