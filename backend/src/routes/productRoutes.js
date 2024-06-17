import express from 'express';
import { getItems, getProductDetails, getFilteredItems } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getItems);
router.get('/filter', getFilteredItems); // Dodana nova ruta za filtriranje
router.get('/:id', getProductDetails);

export default router;
