<template>
  <div class="user-profile" v-if="user">
    <p class="user-profile__title">プロフィール</p>

    <div class="card-panel">
      <p class="user-profile__id">{{ user.uid }}</p>
      <button @click="signOut()" class="btn btn-small pink user-profile__button">ログアウト</button>
    </div>
  </div>
</template>

<script>
import { auth } from "../firebase";
export default {
  data() {
    return {
      auth
    };
  },
  methods: {
    signOut() {
      auth.signOut();
    }
  },
  props: ["user"]
};
</script>

<style scoped>
.user-profile {
  width: 100%;
}

.user-profile__title {
  word-wrap: break-word;
  font-size: 24px;
  line-height: 1;
  margin-bottom: 8px;
}
</style>
