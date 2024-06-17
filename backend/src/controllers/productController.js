// src/controllers/itemController.js

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


/*export const filterProductsByIngredients = async (req, res) => {
  try {
    const { skinType } = req.query;
    console.log(skinType);

    // Dohvati sve sastojke iz proizvoda
    const ingredientsInProducts = await knex('products')
      .select('ingredients')
      .pluck('ingredients');

    // Razdvoji sastojke iz proizvoda i stvori jedinstveni set sastojaka
    const allIngredients = new Set();
    ingredientsInProducts.forEach(ingredients => {
      const splitIngredients = ingredients.split(', ');
      splitIngredients.forEach(ingredient => allIngredients.add(ingredient));
    });
    console.log(allIngredients);

    // Dohvati poželjne i nepoželjne sastojke za odabrani tip kože
    const desirableIngredients = await knex('skin_type_ingredients')
      .where({ skin_type: skinType, is_desirable: 1 })
      .pluck('ingredient');

      console.log(desirableIngredients);

    const undesirableIngredients = await knex('skin_type_ingredients')
      .where({ skin_type: skinType, is_desirable: 0 })
      .pluck('ingredient');

    // Filtriraj proizvode koji sadrže poželjne sastojke i ne sadrže nepoželjne sastojke
    const products = await knex('products')
      .where(function() {
        if (desirableIngredients.length) {
          this.whereRaw(`CONCAT(',', ingredients, ',')`, 'like', `%${desirableIngredients.join(',%')}%`);
        }
        if (undesirableIngredients.length) {
          this.whereNotRaw(`CONCAT(',', ingredients, ',')`, 'like', `%${undesirableIngredients.join(',%')}%`);
        }
      });

    res.status(200).json(products);
  } catch (error) {
    console.error('Error filtering products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
*/
// productController.js


export const getFilteredItems = async (req, res) => {
  try {
    const skinType = req.query.skinType; // Tip kože iz zahtjeva

    // Dohvaćanje poželjnih sastojaka za odabrani tip kože
    const desirableIngredients = await knex('skin_type_ingredients')
      .where({ skin_type: skinType, is_desirable: 1 })
      .pluck('ingredient');

    // Dohvaćanje neželjenih sastojaka za odabrani tip kože
    const undesirableIngredients = await knex('skin_type_ingredients')
      .where({ skin_type: skinType, is_desirable: 0 })
      .pluck('ingredient');

    // Dohvaćanje svih proizvoda iz baze
    const allProducts = await knex('products').select('*');

    // Filtriranje proizvoda prema sastojcima
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

