<template>
    <div class="auth-container">

        <form @submit.prevent="register" autocomplete="off" class="auth-form">
            <div>
                <input
                    type="text"
                    id="username"
                    v-model="username"
                    placeholder="username"
                    class="auth-input"
                    required
                />
            </div>
            <div>
                <input
                    type="email"
                    id="email"
                    v-model="email"
                    class="auth-input"
                    placeholder="e-mail"
                    required
                />
    </div>
            <div>
                <input
                    type="password"
                    id="password"
                    v-model="password"
                    class="auth-input"
                    placeholder="password"
                    required
                />
				
            </div>
            <button type="submit" class="content-action-btn" id="auth-btn">SIGN UP</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const username = ref("");
const email = ref("");
const password = ref("");


const register = async () => {
    try {
        await axios.post("/auth/register", {
            username: username.value,
            email: email.value,
            password: password.value,
            role: "user",
        });
        console.log("Registered successfully!");
    } catch (error) {
        console.error("Registration failed:", error);
    }
};
</script>
