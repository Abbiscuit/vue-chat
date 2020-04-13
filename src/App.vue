<template>
  <div id="app" class="section">
    <header>
      <h1>Vue Voxer</h1>
      <p>Realtime Voice Chat</p>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
// import { auth } from './firebase';

export default {
  name: 'App',
  components: {}
};
</script>

<style>
ul {
  margin: 0;
}

li {
  list-style: none;
}
</style>
