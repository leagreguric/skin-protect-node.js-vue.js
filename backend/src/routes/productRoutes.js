// src/routes/itemRoutes.js

import express from 'express';
import { getItems } from '../controllers/productController.js';


const router = express.Router();

router.get('/', getItems);


export default router;