import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Foods from '@/views/Foods.vue'
import Home from '../views/Home.vue'
import FoodDetail from '../views/FoodDetail.vue'
import Keranjang from '../views/Keranjang.vue'
import PesananSukses from '../views/PesananSukses.vue'
import LampuPage from '@/views/LampuPage.vue' // Path ke komponen halaman LampuPage
import DevicePage from '../views/DevicePage.vue' // Path ke komponen halaman LampuPage
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Dashboard from '../views/Dashboard.vue' // Mengimpor Dashboard
import Perangkat from '@/views/Perangkat.vue'
import KelasView from '@/views/KelasView.vue'
import GedungList from '@/views/GedungList.vue' // Mengimpor komponen GedungLisngCreatet
// ruangan
import RuanganList from '@/views/RuanganList.vue'
import RuanganForm from "@/components/ruangans/RuanganForm.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
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
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard, // Menambahkan rute untuk dashboard
    },
    {
      path: '/perangkat',
      name: 'perangkat',
      component: Perangkat, // Menambahkan rute untuk dashboard
    },

    {
      path: '/kelasview',
      name: 'kelasview',
      component: KelasView, // Menambahkan rute untuk dashboard
    },

    {
      path: '/gedungs',
      name: 'gedungs',
      component: GedungList
    },

    {
      path: '/ruangans',
      name: 'ruangans',
      component: RuanganList
    },
    { path: "/ruangans/:id?", name: "RuanganForm", component: RuanganForm },
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
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.getItem('token')) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
