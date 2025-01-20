import { Router } from 'express';
import { dbOperations } from '../database';
import { computeTravelTime } from '../travelTime';

const router = Router();

// GET all trips
router.get('/', async (req, res) => {
  try {
    const users = await dbOperations.getAllTrips();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get trip' });
  }
});

// POST new trip
router.post('/', async (req, res) => {
  const { startCode, endCode, departureTime } = req.body;
  if (!startCode || !endCode || !departureTime) {
    return res.status(400).json({ error: 'all attributes required' });
  }
  computeTravelTime(startCode, endCode)
  

  try {
    //await dbOperations.createUser(name, email);
    res.status(201).json({ message: 'trip booked successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to book trip' });
  }
});
