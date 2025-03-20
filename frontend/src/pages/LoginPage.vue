<template>
  <q-page class="flex flex-center" style="overflow: hidden; position: relative;">
    
    <div class="background" :class="{ blurred: isBlurred }"></div>

    
    <transition name="fade" mode="out-in">
      <q-card class="q-pa-md card-style">
        <q-card-section>
          <h2 class="text-h5 text-white text-center">Login</h2>
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="login">
            
            <q-input
              v-model="username"
              label="Username"
              dark
              color="white"
              class="q-mb-sm"
              required
              @focusin="toggleBlur(true)"
              @focusout="toggleBlur(false)"
            />
            
            <q-input
              v-model="password"
              label="Password"
              type="password"
              dark
              color="white"
              class="q-mb-sm"
              required
              @focusin="toggleBlur(true)"
              @focusout="toggleBlur(false)"
            />
            
            <q-btn type="submit" class="modern-btn full-width q-mt-sm" label="Login" />
          </q-form>
          <div class="auth-links">
            <q-btn flat label="Forgot your password?" class="text-button" @click="forgotPassword" />
            <q-btn flat label="Don't have an account?" class="text-button" @click="goToRegister" />
          </div>
        </q-card-section>
      </q-card>
    </transition>
  </q-page>
</template>

<script>
import axios from 'axios';
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import '../css/style.scss';

export default {
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const username = ref('');
    const password = ref('');
    const isBlurred = ref(false); 

    const login = async () => {
      try {
        const response = await axios.post('http://localhost:5000/login', {
          username: username.value,
          password: password.value,
        });

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.user.username);

        $q.notify({
          type: 'positive',
          message: 'Login successful!',
          position: 'top',
        });

        router.push('/home');
      } catch {
        $q.notify({
          type: 'negative',
          message: 'Login failed. Please check your credentials.',
          position: 'top',
        });
      }
    };

    const forgotPassword = () => {
      router.push('/forgot-password');
    };

    const goToRegister = () => {
      router.push('/register');
    };

    const toggleBlur = (isFocused) => {
      isBlurred.value = isFocused;
    };

    return {
      username,
      password,
      isBlurred,
      login,
      forgotPassword,
      goToRegister,
      toggleBlur,
    };
  },
};
</script>

<style scoped>
@import url('../css/style.scss');
</style>