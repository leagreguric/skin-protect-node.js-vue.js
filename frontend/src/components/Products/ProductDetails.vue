<template>
    <div class="product-details">
      <h1>{{ product.name }}</h1>
      <img :src="product.image" alt="Product Image">
      <p>{{ product.ingredients }}</p>

    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        product: {}
      };
    },
    mounted() {
      this.getProduct();
    },
    methods: {
      async getProduct() {
        const id = this.$route.params.id;
        try {
          const response = await axios.get(`http://localhost:3000/products/${id}`);
          this.product = response.data;
        } catch (error) {
          console.error('Greška prilikom dohvaćanja proizvoda:', error);
        }
      }
    }
  };
  </script>
  
