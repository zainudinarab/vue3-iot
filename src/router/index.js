import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Foods from '@/views/Foods.vue'
import Home from '../views/Home.vue'
import FoodDetail from '../views/FoodDetail.vue'
import Keranjang from '../views/Keranjang.vue'
import PesananSukses from '../views/PesananSukses.vue'
import LampuPage from '@/views/LampuPage.vue' // Path ke komponen halaman LampuPage
import DevicePage from '../views/DevicePage.vue' // Path ke komponen halaman LampuPage

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/',
      name: 'home2',
      component: Home,
    },
    {
      path: '/foods',
      name: 'Foods',
      component: Foods,
    },
    {
      path: '/foods/:id',
      name: 'FoodDetail',
      component: FoodDetail,
    },
    {
      path: '/keranjang',
      name: 'Keranjang',
      component: Keranjang,
    },
    {
      path: '/pesanan-sukses',
      name: 'PesananSukses',
      component: PesananSukses,
    },
    {
      path: '/lampu',
      name: 'lampu',
      component: LampuPage, // Halaman dengan komponen Lampu
    },
    {
      path: '/device',
      name: 'device',
      component: DevicePage, // Halaman dengan komponen Lampu
    },

    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
