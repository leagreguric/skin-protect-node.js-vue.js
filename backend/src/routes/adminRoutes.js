// adminRoutes.js (ili odgovarajući ruter za administraciju)
import express from 'express';
import { getAllUsers, deleteUser, deleteProduct, getAllComments, deleteComment } from '../controllers/adminController.js';
import { isAdmin } from '../middleware/admin.js';
const router = express.Router();

// Primijeniti isAdmin middleware na sve admin rute
router.use(isAdmin);

router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.delete('/products/:id', deleteProduct);
router.get('/comments', getAllComments);
router.delete('/comments/:id', deleteComment);
router.get('/isAdmin', isAdmin);
export default router;
