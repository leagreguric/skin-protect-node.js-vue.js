  <template>
    <div class="admin-container">
    <div class="dashboard">
      <h1 v-if="isAdmin" class="title" id="admin-title">Admin Dashboard</h1>
      <div v-if="isAdmin" class="content-container">
        <div class="section">
          <h2 class="title">Users</h2>
          <ul class="list">
            <li v-for="user in users" :key="user.id" class="list-item">
              {{ user.username }} - {{ user.email }}
              <button @click="deleteUser(user.id)" class="delete-btn">Delete</button>
            </li>
          </ul>
        </div>
        <div class="section">
          <h2 class="title">Products</h2>
          <ul class="list">
            <li v-for="product in products" :key="product.id" class="list-item">
              {{ product.name }}
              <button @click="deleteProduct(product.id)" class="delete-btn">Delete</button>
            </li>
          </ul>
        </div>
        <div class="section">
          <h2 class="title">Comments</h2>
          <ul class="list">
            <li v-for="comment in comments" :key="comment.comment_id" class="list-item">
              <strong class="comment-product-name">{{ comment.product_name }}:</strong> 
              <p class="comment-user">{{ comment.username }}: {{ comment.comment }}</p>
              <button @click="deleteComment(comment.comment_id)" class="delete-btn">Delete</button>
            </li>
          </ul>
        </div>
      </div>
      <div v-else class="no-access">
        <p>You do not have access to this page.</p>
      </div>
    </div>
  </div>
  </template>
  <script>
  import { useUser } from '../store/auth'; 
  import axios from 'axios';
  export default {
    data() {
      return {
        users: [],
        products: [],
        comments: [],
        isAdmin: false, 
      };
    },
    async mounted() {
      const { user } = useUser();
      if (user.value && user.value.role === 'admin') {

        this.isAdmin = true;
        await this.fetchUsers();
        await this.fetchProducts();
        await this.fetchComments();
      } else {
        this.isAdmin = false;
      }
    },

    methods: {
      async fetchUsers() {
        try {
          const response = await axios.get('http://localhost:3000/admin/users');
          this.users = response.data;
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      },

      async deleteUser(userId) {
        try {
          await axios.delete(`http://localhost:3000/admin/users/${userId}`);
          await this.fetchUsers(); 
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      },

      async fetchProducts() {
        try {
          const response = await axios.get('http://localhost:3000/products');
          this.products = response.data;
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      },

      async deleteProduct(productId) {
        try {
          await axios.delete(`http://localhost:3000/admin/products/${productId}`);
          await this.fetchProducts(); 
        } catch (error) {
          console.error('Error deleting product:', error);
        }
      },

      async fetchComments() {
        try {
          const response = await axios.get('http://localhost:3000/admin/comments');
          this.comments = response.data;
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      },

      async deleteComment(commentId) {
        try {
          await axios.delete(`http://localhost:3000/admin/comments/${commentId}`);
          await this.fetchComments(); 
        } catch (error) {
          console.error('Error deleting comment:', error);
        }
      }
    }
  };
  </script>

