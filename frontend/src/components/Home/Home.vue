<template>
  <div id="scroll-animate">
    <div id="scroll-animate-main">
      <div class="wrapper-parallax">
        <header ref="header" :style="{ backgroundPositionY: headerBgPosition }">
          <h1 id="homepage-title">Welcome to SkinProtect:<br> Your Personalized Beauty Companion</h1>
          <div class="description">
            Welcome to SkinProtect,<br>
            your ultimate destination for personalized skincare recommendations tailored to your unique skin type. Whether you're on a quest for the perfect moisturizer, searching for the ideal cleanser, or seeking targeted treatments, our intuitive web application is here to simplify your skincare journey.
          </div>
        </header>
        <section class="content" ref="content">
          <h1 class="description" id="content-description">
            With SkinProtect, you'll experience: <br>
            Say goodbye to guesswork! Our advanced algorithm analyzes your skin type and concerns to curate a customized list of skincare products just for you.
            Discover the joy of skincare made simple with SkinCareMatch. Sign up today and unlock the secret to radiant, healthy-looking skin!
          </h1>

        </section>
        <footer ref="footer" :style="{ bottom: footerBottom }">
          <div v-if="products">
            <h2 class="title">Popular Hypoallergenic Products:</h2>
            <ul>
              <li v-for="product in products" :key="product.id" class="list">
                {{ product.name }} - {{ product.brand }} 
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { useUser } from '../../store/auth.js';
import axios from 'axios';

const { user } = useUser();

export default {
  data() {
    return {
      headerBgPosition: '50%',
      footerBottom: '-300px',
      overlapHeight: '0px',
      products: null
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.handleScroll();
    this.fetchProducts();
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      let scroll = window.scrollY;
      let windowHeight = window.innerHeight;
      let contentHeight = this.$refs.content.clientHeight;
      let footerHeight = this.$refs.footer.clientHeight;

      this.headerBgPosition = `${50 - (scroll * 100 / windowHeight)}%`;

      if (scroll >= contentHeight - windowHeight) {
        this.overlapHeight = `${windowHeight - (contentHeight - scroll)}px`;
      } else {
        this.overlapHeight = '0px';
      }

      if (scroll >= footerHeight) {
        this.footerBottom = '0px';
      } else {
        this.footerBottom = `-${footerHeight}px`;
      }
    },
    async fetchProducts() {
      try {
        const response = await axios.get('https://makeup-api.herokuapp.com/api/v1/products.json?product_tags=Hypoallergenic');
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
  }
};
</script>

<style scoped>
#scroll-animate {
  overflow: hidden;
}

#scroll-animate-main {
  width: 100%;
  position: relative;
}

header {
  width: 100%;
  gap: 10vh;
  height: 100vh;
  background: url('../../assets/img/skin.jpg') no-repeat 30% 50%;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  transition: background-position-y 0.2s ease;
}

footer {
  width: 100%;
  height: 550px;
  position: absolute;
  bottom: -300px;
  left: 0;
  transition: bottom 0.4s ease;
}

.content {
  min-height: 1000px;
  padding-top: 110vh;
}
</style>
