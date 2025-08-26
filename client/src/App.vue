<template>
  <b-container>
    <b-navbar type="light" variant="light" class="justify-content-center">
      <b-navbar-nav>
        <b-nav-item to="/" class="text-dark">Home</b-nav-item>
        <b-nav-item to="/about" class="text-dark">About</b-nav-item>
        <b-nav-item to="/contact" class="text-dark">Contact</b-nav-item>
        <b-nav-item to="/weather" class="text-dark">Weather</b-nav-item>
        <b-nav-item to="/login" class="text-dark">Login</b-nav-item>
        <b-nav-item to="/signup" class="text-dark">Register</b-nav-item>
      </b-navbar-nav>
    </b-navbar>

    <b-card class="mt-5 text-center">
      <router-view />
    </b-card>
  </b-container>
</template>

<script>
export default {};
</script>
