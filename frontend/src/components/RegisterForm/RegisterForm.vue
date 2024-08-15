<template>
    <div class="auth-container">
        <form @submit.prevent="register" autocomplete="off" class="auth-form">
                <input
                    type="text"
                    id="username"
                    v-model="username"
                    placeholder="username"
                    class="auth-input"
                    required
                />
                <input
                    type="email"
                    id="email"
                    v-model="email"
                    class="auth-input"
                    placeholder="e-mail"
                    required
                />
                <input
                    type="password"
                    id="password"
                    v-model="password"
                    class="auth-input"
                    placeholder="password"
                    required
                />
                <input
                    type="password"
                    id="confirmPassword"
                    v-model="confirmPassword"
                    class="auth-input"
                    placeholder="confirm password"
                    required
                />
            <button type="submit" class="content-action-btn" id="auth-btn">SIGN UP</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { loginUser } from "../../store/auth.js";
import { useRouter } from 'vue-router';

const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");
const router = useRouter();
const register = async () => {
    if (password.value !== confirmPassword.value) {
        alert("Passwords do not match!");
        return;
    }
    
    try {
        await axios.post("/auth/register", {
            username: username.value,
            email: email.value,
            password: password.value,
            role: "user",
        });
        try {
            await loginUser(username.value, password.value, router);
        } catch (error) {
            errorMessage.value = "Prijava nije uspjela";
            console.error("Login failed:", error.message);
        }

    } catch (error) {
        errorMessage.value = "Registracija nije uspjela";
        console.error("Registration failed:", error);
    }
};
</script>
