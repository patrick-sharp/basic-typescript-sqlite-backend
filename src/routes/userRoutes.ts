//import { Router } from 'express';
//import { dbOperations } from '../database';
//
//const router = Router();
//
//// GET all ships
//router.get('/ships', async (req, res) => {
//  try {
//    const users = await dbOperations.getAllShips();
//    res.json(users);
//  } catch (error) {
//    res.status(500).json({ error: 'Failed to get ships' });
//  }
//});
//
//// GET all users
//router.get('/', async (req, res) => {
//  try {
//    const users = await dbOperations.getAllUsers();
//    res.json(users);
//  } catch (error) {
//    res.status(500).json({ error: 'Failed to get users' });
//  }
//});
//
//// GET user by ID
//router.get('/:id', async (req, res) => {
//  try {
//    const user = await dbOperations.getUserById(Number(req.params.id));
//    if (!user) {
//      return res.status(404).json({ error: 'User not found' });
//    }
//    res.json(user);
//  } catch (error) {
//    res.status(500).json({ error: 'Failed to get user' });
//  }
//});
//
//// POST new user
//router.post('/', async (req, res) => {
//  const { name, email } = req.body;
//  if (!name || !email) {
//    return res.status(400).json({ error: 'Name and email are required' });
//  }
//
//  try {
//    await dbOperations.createUser(name, email);
//    res.status(201).json({ message: 'User created successfully' });
//  } catch (error) {
//    res.status(500).json({ error: 'Failed to create user' });
//  }
//});
//
//// PUT update user
//router.put('/:id', async (req, res) => {
//  const { name, email } = req.body;
//  if (!name || !email) {
//    return res.status(400).json({ error: 'Name and email are required' });
//  }
//
//  try {
//    const result = await dbOperations.updateUser(Number(req.params.id), name, email);
//    if (result) {
//      res.json({ message: 'User updated successfully' });
//    } else {
//      res.status(404).json({ error: 'User not found' });
//    }
//  } catch (error) {
//    res.status(500).json({ error: 'Failed to update user' });
//  }
//});
//
//// DELETE user
//router.delete('/:id', async (req, res) => {
//  try {
//    const result = await dbOperations.deleteUser(Number(req.params.id));
//    if (result) {
//      res.json({ message: 'User deleted successfully' });
//    } else {
//      res.status(404).json({ error: 'User not found' });
//    }
//  } catch (error) {
//    res.status(500).json({ error: 'Failed to delete user' });
//  }
//});
//
//export default router;
