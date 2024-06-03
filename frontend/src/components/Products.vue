<template>
  <div class="products">
    <h1>Popis proizvoda</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        <img :src='product.image' alt="Product Image">
        <h2>{{ product.name }}</h2>
        <p>{{ product.ingredients }}</p>
      </li>
    </ul>
  </div>
</template>

<script >
export default {
  data() {
    return {
      products: []
    };
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    async getProducts() {
      try {
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();
        this.products = data;
      } catch (error) {
        console.error('Greška prilikom dohvaćanja proizvoda:', error);
      }
    }
  }
};
</script>



