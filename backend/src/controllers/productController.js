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

