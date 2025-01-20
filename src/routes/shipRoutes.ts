import { Router } from 'express';
import { dbOperations } from '../database';

const router = Router();

// GET all ships
router.get('/', async (req, res) => {
  try {
    const users = await dbOperations.getAllShips();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get ships' });
  }
});

export default router;
