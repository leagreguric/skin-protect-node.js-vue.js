
import express from 'express';
import { createUser, loginUser, getUserByUsername } from '../controllers/authController.js'; 
import knex from '../../db/knex.js'

const router = express.Router();
router.use((req, res, next) => {
    req.db = knex; 
    next();
  });

router.post('/register', async (req, res) => {
  await createUser(req, res, req.db); 
});
router.post('/login', async (req, res) => {
  await loginUser(req, res, req.db); 
});
router.get('/user/:username', async (req, res) => {
  await getUserByUsername(req, res, req.db);
});
export default router;