import express from 'express';
import serveStatic from 'serve-static';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes.js';
import productRoutes from './src/routes/productRoutes.js';
import commentRoutes from './src/routes/commentRoutes.js';
import db from './db/db.js'; // Ispravio sam putanju
import axios from 'axios'; // Dodaj ovaj import

const app = express();
dotenv.config({ path: './.env' });
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

const port = process.env.PORT || 3000;

app.use('/products', commentRoutes); // Added for handling comments

// Endpoint za analizu sastojaka
app.post('/analyze-ingredients', async (req, res) => {
  const { ingredients } = req.body;
  try {
    const responses = await Promise.all(ingredients.map(async ingredient => {
      const response = await axios.get(`https://api.inci-beauty.com/ingredient/${ingredient}`, {
        headers: {
          'Authorization': `Bearer ${process.env.INCI_API_KEY}`
        }
      });
      return response.data;
    }));

    const comedogenicIngredients = responses.filter(item => item.comedogenic_rating >= 3);

    res.status(200).json(comedogenicIngredients);
  } catch (error) {
    console.error('Error analyzing ingredients:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
