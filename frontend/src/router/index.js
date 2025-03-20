import { route } from 'quasar/wrappers';
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from 'src/pages/LoginPage.vue';
import RegisterPage from 'src/pages/RegisterPage.vue';
import HomePage from 'src/pages/HomePage.vue';
import MainLayout from 'src/layouts/MainLayout.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: 'login', component: LoginPage },
      { path: 'register', component: RegisterPage },
      { path: 'home', component: HomePage },
      { path: '', redirect: '/register' },
    ],
  },
];

export default route(function (/* { store, ssrContext } */) {
  return createRouter({
    history: createWebHistory(),
    routes,
  });
});