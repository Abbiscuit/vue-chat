<template>
  <aside class="section">
    <h3>Sign in Anonymously</h3>
    <p>
      <button class="button" @click="auth.signInAnonymously()">Sign In</button>
    </p>

    <div v-if="newUser">
      <h4>Sign Up for a New Account</h4>
      <a href="#" @click="newUser = false"> Returning User? </a>
    </div>

    <div v-else>
      <h4>Sign In with Email</h4>
      <a href="#" @click="newUser = true"> New User? </a>
    </div>

    <label for="email">Email</label>
    <input type="email" v-model="email" class="input" />

    <label for="password">Password</label>
    <input type="password" v-model="password" class="input" /><br />

    <button
      class="button is-info"
      :class="{ 'is-loading': loading }"
      @click="signInOrCreateUser()"
    >
      {{ newUser ? 'Sign Up' : 'Login' }}
    </button>

    <p class="has-text-danger" v-if="errorMessage">{{ errorMessage }}</p>
  </aside>
</template>

<script>
import { auth } from '../firebase';

export default {
  data() {
    return {
      auth,
      email: '',
      password: '',
      newUser: false,
      loading: false,
      errorMessage: ''
    };
  },
  methods: {
    async signInOrCreateUser() {
      this.loading = true;
      this.errorMessage = '';

      try {
        if (this.newUser) {
          await auth.createUserWithEmailAndPassword(this.email, this.password);
        } else {
          await auth.signInWithEmailAndPassword(this.email, this.password);
        }
      } catch (error) {
        this.errorMessage = error.message;
      }

      this.loading = false;
    }
  }
};
</script>

<style></style>
