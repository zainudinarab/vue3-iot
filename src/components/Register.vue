<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <h2 class="text-center mb-4">Register</h2>
            <form @submit.prevent="register">
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" id="name" class="form-control" v-model="name" required />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" id="email" class="form-control" v-model="email" required />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  class="form-control"
                  v-model="password"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="password_confirmation" class="form-label">Confirm Password</label>
                <input
                  type="password"
                  id="password_confirmation"
                  class="form-control"
                  v-model="passwordConfirmation"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary w-100">Register</button>
            </form>
            <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
            <div class="mt-3 text-center">
              <p>Sudah punya akun? <router-link to="/login">Login</router-link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api/axios'

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errorMessage: '',
    }
  },
  methods: {
    async register() {
      try {
        const response = await api.post('/register', {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.passwordConfirmation,
        })
        this.$router.push({ name: 'login' })
      } catch (error) {
        if (error.response && error.response.data) {
          this.errorMessage = error.response.data.message || 'Terjadi kesalahan. Coba lagi.'
        } else {
          this.errorMessage = 'Gagal mendaftar. Coba lagi.'
        }
      }
    },
  },
}
</script>
