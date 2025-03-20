<template>
  <q-layout view="hHh lpR fFf">
    
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>Startup Hub</q-toolbar-title>
        <q-tabs align="left">
          <q-tab label="Home" to="/" />
          <q-tab label="Startups" to="/startups" />
          <q-tab label="About Us" to="/about" />
        </q-tabs>
        <q-space />
        
        <div class="q-mr-md">Logged in as <strong>{{ username }}</strong></div>
        
        <q-btn-dropdown flat color="white" label="Menu" icon="menu">
          <q-list>
            <q-item clickable v-close-popup @click="goToSettings">
              <q-item-section avatar>
                <q-icon name="settings" />
              </q-item-section>
              <q-item-section>Settings</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="goToProfile">
              <q-item-section avatar>
                <q-icon name="person" />
              </q-item-section>
              <q-item-section>My Profile</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="goToStartups">
              <q-item-section avatar>
                <q-icon name="business" />
              </q-item-section>
              <q-item-section>My Startups</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="logout">
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>
              <q-item-section>Logout</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    
    <q-page-container>
      <q-page class="flex flex-center background">
        <q-card class="q-pa-lg" style="width: 600px; background: rgba(255, 255, 255, 0.1);">
          <q-card-section>
            <h2 class="text-h4 text-white text-center">Welcome to the Homepage!</h2>
          </q-card-section>
          <q-card-section class="text-white text-center">
            <p>You have successfully logged in, <strong>{{ username }}</strong>!</p>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>

    
    <q-footer class="bg-grey-9 text-white text-center q-pa-md">
      © 2024 Startup Hub - All Rights Reserved
    </q-footer>
  </q-layout>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const username = ref('');

    
    onMounted(() => {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        username.value = storedUsername;
      } else {
        router.push('/login'); 
      }
    });

    
    const logout = () => {
      localStorage.removeItem('token'); 
      localStorage.removeItem('username'); 
      router.push('/login'); 
    };

    
    const goToSettings = () => {
      router.push('/settings');
    };

    const goToProfile = () => {
      router.push('/profile');
    };

    const goToStartups = () => {
      router.push('/my-startups');
    };

    return {
      username,
      logout,
      goToSettings,
      goToProfile,
      goToStartups,
    };
  },
};
</script>

<style scoped>
@import url('../css/style.scss');
</style>