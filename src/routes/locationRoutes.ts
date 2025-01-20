import { Router } from 'express';
import { dbOperations } from '../database';

const router = Router();

// GET all locations
router.get('/', async (req, res) => {
  try {
    const locations = await dbOperations.getAllLocations();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get locations' });
  }
});

export default router;
