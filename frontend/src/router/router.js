import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProductsView from '../views/ProductsView.vue';
const routes = [
    { 
      path: '/', 
      component: HomeView,
      meta: {
          title: "Home",
        }
    },
    { 
      path: '/login', 
      component: LoginView,
      meta: {
          title: "Login",
      }
    },
    { 
      path: '/register', 
      component: RegisterView,
      meta: {
          title: "Register",
      }
    },
    {
      path: '/products',
      component: ProductsView,
      meta : {
        title: "Product",
      }
    }
    ]
  
  const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior (to, from, savedPosition) {
      if (to.hash) {
        return {
          el: to.hash,
          behavior: 'smooth',
        }
      } else if (savedPosition) {
        return savedPosition;
      } else {
        return { top: 0, behavior: 'smooth' };
      }
    }
  });
  
  router.beforeEach((to, from)=> {
    document.title=to.meta?.title ?? 'skinProtect';
  })
  
  export default router;