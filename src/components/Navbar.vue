<template>
  <div>
    <!-- Navbar Bootstrap 5 -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="#">Smart Class</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/foods">Foods</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/lampu">Lampu</router-link>
              <!-- Link ke Halaman Lampu -->
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/device">lampu device</router-link>
              <!-- Link ke Halaman Lampu -->
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/gedungs">Gedung</router-link>
              <!-- Link ke Halaman Lampu -->
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/ruangans">Rungan</router-link>
              <!-- Link ke Halaman Lampu -->
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/perangkats">Perangakat</router-link>
              <!-- Link ke Halaman Lampu -->
            </li>
          </ul>

          <!-- Right aligned nav items -->
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/keranjang">
                Keranjang
                <i class="bi bi-bag"></i>
                <!-- Bootstrap 5 Icon -->
                <span class="badge bg-success ms-2">
                  {{ updateKeranjang ? updateKeranjang.length : jumlah_pesanans.length }}
                </span>
              </router-link>
            </li>
            <!-- Tombol Logout -->
            <li class="nav-item">
              <button class="btn btn-danger" @click="logout">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Navbar',
  data() {
    return {
      jumlah_pesanans: [],
    }
  },
  props: ['updateKeranjang'],
  methods: {
    setJumlah(data) {
      this.jumlah_pesanans = data
    },
    logout() {
      // Hapus token dan data pengguna dari localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('user')

      // Redirect ke halaman login
      this.$router.push({ name: 'login' })
    },
  },
  mounted() {
    // Ambil data keranjang dari json-server atau API kamu
    axios
      .get('http://localhost:3000/keranjangs')
      .then((response) => this.setJumlah(response.data))
      .catch((error) => console.log(error))
  },
}
</script>

<style scoped>
/* Tambahkan styling jika diperlukan */
</style>
