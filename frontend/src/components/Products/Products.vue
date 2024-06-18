<template>
  <div class="products">
    <div class="select">

    <label for="skinType" class="title">Skin Type:</label>
    <select v-model="skinType" @change="fetchFilteredProducts" >
      <option value="dry">Dry</option>
      <option value="oily">Oily</option>
      <option value="combination">Combination</option>
      <option value="sensitive">Sensitive</option>
    </select>
    <div class="select_arrow"></div>
  </div>
    <div class="products-container">
      <router-link v-for="product in products" :key="product.ID" :to="'/products/' + product.ID" class="product-box">
     
          <img class="product-image" :src="product.image" alt="Product Image">
          <h2 class="product-name">{{ product.name }}</h2>
        
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      skinType: 'dry'
    };
  },
  methods: {
    async fetchFilteredProducts() {
      try {
        const response = await axios.get('http://localhost:3000/products/filter', {
          params: { skinType: this.skinType }
        });
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching filtered products:', error);
      }
    }
  },
  created() {
    this.fetchFilteredProducts();
  }
};
</script>
