// src/controllers/commentController.js
import knex from '../../db/knex.js';

export const getComments = async (req, res) => {
  try {
    const productId = req.params.productId;
    const comments = await knex('comments').where({ product_id: productId });
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const postComment = async (req, res) => {
  try {
    console.log(req.body);
    const { comment, userId, username } = req.body;

    const productId = req.params.productId;
    const newComment = { product_id: productId, user_id: userId, username, comment };
    const [id] = await knex('comments').insert(newComment);
    res.status(201).json({ id, ...newComment });
  } catch (error) {
    console.error('Error posting comment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
