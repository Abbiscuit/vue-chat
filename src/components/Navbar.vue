<template>
  <nav class="navbar indigo darken-3">
    <div class="nav-wrapper navbar__container">
      <a href="#" class="brand-logo navbar__title">Vue Voxer</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li>
          <a href="sass.html">About Voxer</a>
        </li>
        <li>
          <a href="badges.html">Profile</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  components: {}
};
</script>

<style scoped>
.navbar .navbar__container {
  padding: 0 20px;
}

.navbar .navbar__title {
  font-size: 24px;
}
</style>