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
              <router-link class="nav-link" to="/dashboard">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/lampu">Lampu</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/device">Lampu Device</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/gedungs">Gedung</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/ruangans">Ruang</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/control-perangkat">Control Perangkat</router-link>
            </li>
          </ul>

          <!-- Right aligned nav items -->
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/notifikasi">
                Notifikasi
                <i class="bi bi-bell"></i>
                <!-- Bootstrap 5 Icon untuk bel -->
                <span class="badge bg-danger ms-2">
                  {{ unreadNotifications.length }}
                </span>
                <!-- Menampilkan jumlah notifikasi baru -->
              </router-link>
            </li>

            <!-- Tampilkan nama user atau tombol login/logout -->
            <li v-if="isLoggedIn" class="nav-item">
              <span class="nav-link">Hello, {{ userName }}</span>
            </li>
            <li class="nav-item">
              <button v-if="isLoggedIn" class="btn btn-danger" @click="logout">Logout</button>
              <router-link v-else class="btn btn-primary" to="/login">Login</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      unreadNotifications: [], // Menyimpan notifikasi baru
      userName: '',
      isLoggedIn: false, // Untuk mengecek status login
    }
  },
  methods: {
    logout() {
      // Hapus token dan data pengguna dari localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('user')

      // Update status login dan redirect ke halaman login
      this.isLoggedIn = false
      this.userName = ''
      this.$router.push({ name: 'login' })
    },
    checkLoginStatus() {
      const user = localStorage.getItem('user')
      if (user) {
        this.userName = JSON.parse(user).name
        this.isLoggedIn = true
      } else {
        this.isLoggedIn = false
      }
    },
    fetchNotifications() {
      // Di sini kamu bisa mendapatkan notifikasi dari MQTT broker (atau backend)
      // Misalnya menggunakan WebSocket atau subscribe ke topik MQTT tertentu
      // Update unreadNotifications dengan data dari server atau broker
      this.unreadNotifications = [
        { id: 1, message: 'Lampu Ruang Tamu menyala' },
        { id: 2, message: 'Perangkat Kamar Mandi tidak responsif' },
        { id: 3, message: 'Suhu kamar mencapai 30°C' },
      ]
    },
  },
  mounted() {
    this.checkLoginStatus()
    this.fetchNotifications() // Panggil fetchNotifications untuk mendapatkan notifikasi
  },
}
</script>

<style scoped>
/* Tambahkan styling jika diperlukan */
</style>
