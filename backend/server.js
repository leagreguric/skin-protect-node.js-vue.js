import express from 'express';
import serveStatic from 'serve-static';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes.js';
import productRoutes from './src/routes/productRoutes.js';
import commentRoutes from './src/routes/commentRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';
import session from 'express-session';
import { isAdmin } from './src/middleware/admin.js';

const app = express();
dotenv.config({ path: './.env' });

app.use(session({
  secret: 'your-secret-key', // Promijeni ovo u sigurniji ključ u produkciji
  resave: false,
  saveUninitialized: false, // Možeš promijeniti na true ako koristiš session store koji zahtijeva ovu opciju
  cookie: { secure: false } // Postavi na true ako koristiš HTTPS
}));

app.use(express.json());

const router = express.Router();
router.use((req, res, next) => {
    console.log('Middleware executed');
    console.log('Request:', req.method, req.originalUrl);
    next();
});

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use(serveStatic("../frontend/dist"));
app.use('/products', commentRoutes); 


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



app.use('/admin', isAdmin, adminRoutes);