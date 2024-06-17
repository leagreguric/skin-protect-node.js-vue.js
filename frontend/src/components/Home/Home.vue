<template>
    <div id="scroll-animate">
      <div id="scroll-animate-main">
        <div class="wrapper-parallax">
          <header ref="header" :style="{ backgroundPositionY: headerBgPosition }">
            <h1 id="homepage-title">Welcome to SkinProtect:<br> Your Personalized Beauty Companion</h1>
            <div class="description">Welcome to SkinProtect,<br> your ultimate destination for personalized skincare recommendations tailored to your unique skin type. Whether you're on a quest for the perfect moisturizer, searching for the ideal cleanser, or seeking targeted treatments, our intuitive web application is here to simplify your skincare journey.</div>
          </header>
  
          <section class="content" ref="content">
            <h1 class="description" id="content-description">With SkinProtect, you'll experience: <br>
            Say goodbye to guesswork! Our advanced algorithm analyzes your skin type and concerns to curate a customized list of skincare products just for you.
            Discover the joy of skincare made simple with SkinCareMatch. Sign up today and unlock the secret to radiant, healthy-looking skin!
            </h1>
            <div class="sign">
              <template v-if="user">
        <article class="title">Hello, {{ user.username }}!</article>
        <RouterLink to="/products" class="content-action-btn">Products</RouterLink>
      </template>
      <template v-else>
        <RouterLink to="/login" class="content-action-btn">LOGIN</RouterLink>
        <RouterLink to="/register" class="content-action-btn">REGISTER</RouterLink>

      </template>
            </div>
          </section>
  
          <footer ref="footer" :style="{ bottom: footerBottom }">
            <h1>Tu će bit preporučeni proizvodi</h1>
          </footer>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        headerBgPosition: '50%',
        footerBottom: '-300px',
        overlapHeight: '0px'
      };
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
      this.handleScroll(); // Pozivamo funkciju prilikom montiranja kako bi se postavile inicijalne vrijednosti
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
  
        // Ako je kraj contenta dostignut, postavljamo preklapanje na visinu prozora
        if (scroll >= contentHeight - windowHeight) {
          this.overlapHeight = `${windowHeight - (contentHeight - scroll)}px`;
        } else {
          this.overlapHeight = '0px';
        }
  
        // Ako je skrol manji od visine footera, postavljamo footer na dno prozora
        if (scroll >= footerHeight) {
          this.footerBottom = '0px';
        } else {
          this.footerBottom = `-${footerHeight}px`;
        }
  

      }
    }
  }
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
    gap:10vh;
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
  
  <script setup>
  import { useUser, clearUser } from '../../store/auth.js';
const { user } = useUser();
</script>