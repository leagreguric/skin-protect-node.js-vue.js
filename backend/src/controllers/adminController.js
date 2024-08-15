
import knex from '../../db/knex.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await knex('user').select('id', 'username', 'email');
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await knex('user').where('id', id).del();
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await knex('products').where('id', id).del();
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product' });
  }
};


export const getAllComments = async (req, res) => {
    try {
      const commentsWithProducts = await knex('comments')
        .join('products', 'comments.product_id', '=', 'products.id')
        .select('comments.id as comment_id', 'comments.comment', 'comments.username', 'products.name as product_name', 'products.id as product_id');
      
      res.status(200).json(commentsWithProducts);
    } catch (error) {
      console.error('Error fetching comments:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

  export const deleteComment = async (req, res) => {
    try {
      const { id } = req.params;
      await knex('comments').where('id', id).del();
      res.status(200).json({ message: 'Comment deleted' });
    } catch (error) {
      console.error('Error deleting comment:', error);
      res.status(500).json({ message: 'Error deleting comment' });
    }
  };
