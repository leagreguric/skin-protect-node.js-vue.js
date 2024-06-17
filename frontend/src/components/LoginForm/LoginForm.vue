<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { setUser } from "../../store/auth.js"; // Adjust the path as needed
const username = ref("");
const password = ref("");
const router = useRouter();

const login = async () => {
    try {
        const response = await axios.post("http://localhost:3000/auth/login", {
            username: username.value,
            password: password.value,
        });

        // Check if response status is ok
        if (response.status !== 200) {
            throw new Error("Login failed: Invalid response");
        }

        const token = response.data.token;
        localStorage.setItem("token", token);

        // Fetch user information after successful login
        const userInfoResponse = await axios.get(
            `http://localhost:3000/auth/user/${username.value}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // Check if user info response status is ok
        if (userInfoResponse.status !== 200) {
            throw new Error("Login failed: Invalid user info response");
        }

        const userInfo = userInfoResponse.data;
        setUser(userInfo);

        console.log("Logged in successfully!");
        router.push("/");
    } catch (error) {
        console.error("Login failed:", error.message);
    }
};
</script>

<template>
    <div class="auth-container">
        <form @submit.prevent="login" class="auth-form">
            <div>
				
                <input
                    type="username"
                    id="username"
                    v-model="username"
                    class="auth-input"
                    placeholder="Username"
                    required
                />
            </div>
            <div>
                <input
                    type="password"
                    id="password"
                    v-model="password"
                    class="auth-input"
                    placeholder="Password"
                    required
                />

            </div>
            <button type="submit" class="content-action-btn" id="auth-btn">LOGIN</button>
        </form>
    </div>
</template>
