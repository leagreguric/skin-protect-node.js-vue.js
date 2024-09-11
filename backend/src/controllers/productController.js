
import knex from '../../db/knex.js';

export const getItems = async (req, res) => {
  try {
    const products= await knex('products').select('*')
    console.log(products);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const getProductDetails = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await knex('products').where('id', productId).first();
    if (!product) {
      return res.status(404).json({ message: 'Proizvod nije pronađen.' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Greška prilikom dohvaćanja pojedinosti o proizvodu:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getFilteredItems = async (req, res) => {
  try {
    const skinType = req.query.skinType; 
    const desirableIngredients = await knex('skin_type_ingredients')
      .where({ skin_type: skinType, is_desirable: 1 })
      .pluck('ingredient');
    const undesirableIngredients = await knex('skin_type_ingredients')
      .where({ skin_type: skinType, is_desirable: 0 })
      .pluck('ingredient');
    const allProducts = await knex('products').select('*');
    const filteredProducts = allProducts.filter(product => {
      const productIngredients = product.ingredients.split(',').map(ingredient => ingredient.trim());
      const hasDesirableIngredients = desirableIngredients.some(ingredient => productIngredients.includes(ingredient));
      const hasUndesirableIngredients = undesirableIngredients.some(ingredient => productIngredients.includes(ingredient));
      return hasDesirableIngredients && !hasUndesirableIngredients;
    });
    res.status(200).json(filteredProducts);
  } catch (error) {
    console.error('Error fetching filtered items:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

