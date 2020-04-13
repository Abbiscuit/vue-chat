<template>
  <aside class="section auth">
    <h4 class="auth__title">カンタンに始める</h4>
    <p>
      <button class="btn btn-small pink" @click="auth.signInAnonymously()">匿名でログイン</button>
    </p>

    <div class="section" v-if="newUser">
      <h4 class="auth__title">アカウントを作成する</h4>
      <a href="#" @click="newUser = false">アカウントを持っていますか？</a>
    </div>

    <div class="section" v-else>
      <h4 class="auth__title">ログインする</h4>
      <a href="#" @click="newUser = true">新規作成</a>
    </div>

    <div class="login-form section">
      <label for="email">Email</label>
      <input type="email" v-model="email" class="input" />

      <label for="password">Password</label>
      <input type="password" v-model="password" class="input" />
      <br />

      <button
        class="btn btn-small pink auth__button"
        :class="{ 'is-loading': loading }"
        @click="signInOrCreateUser()"
      >{{ newUser ? 'Sign Up' : 'Login' }}</button>

      <p class="auth__warning red-text" v-if="errorMessage">{{ errorMessage }}</p>
    </div>
  </aside>
</template>

<script>
import { auth } from "../firebase";

export default {
  data() {
    return {
      auth,
      email: "",
      password: "",
      newUser: false,
      loading: false,
      errorMessage: ""
    };
  },
  methods: {
    async signInOrCreateUser() {
      this.loading = true;
      this.errorMessage = "";

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

<style style="css" scoped>
.auth .auth__button {
  margin-bottom: 8px;
}
</style>
