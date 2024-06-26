<template>
    <div>
      <h1>Analyze Ingredients</h1>
      <label for="ingredients">Enter Ingredients (comma separated):</label>
      <input v-model="ingredientsInput" id="ingredients" placeholder="e.g., Water, Glycerin, Mineral Oil" />
      <button @click="analyzeIngredients">Analyze</button>
      <div v-if="error">
        <p>Error: {{ error }}</p>
      </div>
      <div v-if="comedogenicIngredients.length">
        <h2>Comedogenic Ingredients:</h2>
        <ul>
          <li v-for="ingredient in comedogenicIngredients" :key="ingredient.id">
            {{ ingredient.name }} - Comedogenic Rating: {{ ingredient.comedogenic_rating }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        ingredientsInput: '',
        comedogenicIngredients: [],
        error: null
      };
    },
    methods: {
      async analyzeIngredients() {
        this.error = null;
        try {
          const ingredients = this.ingredientsInput.split(',').map(ing => ing.trim());
          const response = await axios.post('http://localhost:3000/analyze-ingredients', { ingredients });
          this.comedogenicIngredients = response.data;
        } catch (error) {
          this.error = error.response ? error.response.data.message : error.message;
          console.error('Error analyzing ingredients:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  #ingredients {
    width: 100%;
    padding: 0.5em;
    margin-bottom: 1em;
  }
  
  button {
    padding: 0.5em 1em;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  