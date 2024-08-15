<template>
  <div>
    <h2>Skin Analysis</h2>
    <input type="file" @change="handleFileUpload" accept="image/*">
    <button @click="analyzeSkin">Analyze Skin</button>

    <div v-if="skinAnalysisResult">
      <h3>Analysis Result</h3>
      <p>{{ skinAnalysisResult }}</p>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      skinImage: null,
      skinAnalysisResult: null
    };
  },
  methods: {
    handleFileUpload(event) {
      this.skinImage = event.target.files[0];
    },
    async analyzeSkin() {
      try {
        if (!this.skinImage) {
          alert('Please select an image first.');
          return;
        }

        let formData = new FormData();
        formData.append('image', this.skinImage);

        const response = await axios.post('http://localhost:3000/api/analyze-skin', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        this.skinAnalysisResult = response.data;
      } catch (error) {
        console.error('Error analyzing skin:', error);
        alert('An error occurred while analyzing skin.');
      }
    }
  }
};
</script>
