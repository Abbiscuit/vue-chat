<template>
  <div v-if="user">
    <p>Logged in as {{ user.uid }}</p>
    <button @click="signOut()" class="button is-small is-danger is-light">
      Sign Out
    </button>
  </div>
</template>

<script>
import { auth } from '../firebase';
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
  props: ['user']
};
</script>

<style></style>
