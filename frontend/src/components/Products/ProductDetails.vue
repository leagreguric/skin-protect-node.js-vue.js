<template>
  <div class="product-details-container">

    <h1 class="title" id="product-details-title">{{ product.name }}</h1>
    <div class="product-details">
    <div class="info">
    <img :src="product.image" alt="Product Image" class="image">
    <p class="ingredients">{{ product.ingredients }}</p>
  </div>
    <div class="comments-container">
      <h1 class="title">Comments:</h1>
      
      <div v-for="comment in comments" :key="comment.id" class="comment">
        <strong>{{ comment.username }}</strong>:
        <p>{{ comment.comment }}</p>
        <small>{{ formatDateTime(comment.created_at) }}</small>
    </div>
   
    
    <template v-if="user">
      <div class="add-comment">
        <textarea v-model="newComment" placeholder="Add a comment"></textarea>
        <button @click="postComment">Post Comment</button>
      </div>
    </template>
    <template v-else>
      <p>You must be logged in to add a comment. <RouterLink to="/login">Log in here</RouterLink>.</p>
    </template>
  </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      product: {},
      comments: [],
      newComment: '',
      user: null
    };
  },
  mounted() {
    this.getProduct();
    this.getComments();
    this.getUser();
  },
  methods: {
    async getProduct() {
      const id = this.$route.params.id;
      try {
        const response = await axios.get(`http://localhost:3000/products/${id}`);
        this.product = response.data;
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    },
    async getComments() {
      const id = this.$route.params.id;
      try {
        const response = await axios.get(`http://localhost:3000/products/${id}/comments`);
        this.comments = response.data.map(comment => ({
          ...comment,
          created_at: new Date(comment.created_at) // Pretvaranje stringa u Date objekt
        }));
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    },
    getUser() {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        this.user = user;
      }
    },
    async postComment() {
      const id = this.$route.params.id;
      if (!this.newComment.trim()) return;
      
      try {
        const response = await axios.post(`http://localhost:3000/products/${id}/comments`, {
          comment: this.newComment,
          userId: this.user.ID,
          username: this.user.username
        });
        this.comments.push({
          ...response.data,
          created_at: new Date(response.data.created_at) // Pretvaranje stringa u Date objekt
        });
        this.newComment = '';
      } catch (error) {
        console.error('Error posting comment:', error);
      }
    },
    formatDateTime(dateTimeStr) {
      const dateTime = new Date(dateTimeStr);
      return dateTime.toLocaleString(); // Prikaz datuma i vremena u lokalnom formatu
    }
  }
};
</script>


