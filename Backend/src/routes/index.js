import express from 'express';
import reelRoutes from './reelRoutes.js';
import userRoutes from './userRoutes.js'

const router = express.Router();

router.use(userRoutes);
router.use(reelRoutes);

export default router;