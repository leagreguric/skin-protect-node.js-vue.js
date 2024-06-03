<script setup>
import { useUser, clearUser } from '../../store/auth.js';
import { useRouter } from 'vue-router'; 
const router = useRouter()
const { user } = useUser();
const logout = () => {
  clearUser();
  router.push('/');
};

</script>

<template>
    <header class="header-container">
        <template v-if="user">
        <span class="header-action-btn">Hello, {{ user.username }}!</span>
        <button @click="logout()" class="header-action-btn">Logout</button>
      </template>
      <template v-else>
        <RouterLink to="/login" class="header-action-btn">LOGIN</RouterLink>
        <RouterLink to="/register" class="header-action-btn">REGISTER</RouterLink>
        <RouterLink to="/products" class="header-action-btn">Products</RouterLink>
      </template>
    </header>
</template>