<template>
  <nav class="navbar is-dark is-spaced" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-menu ">
        <div class="navbar-start">
          <router-link to="/" class="navbar-item">Home</router-link>
          <router-link to="/about" class="navbar-item">About</router-link>
        </div>
        </div>
        <div class="navbar-brand ml">
          <router-link to="/" class="navbar-item">
            <strong>SHOP-TITLE</strong>
          </router-link>

          <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false"
             data-target="navbarBasicExample" @click="toggleBurger">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
      <div class="navbar-menu ">
        <div class="navbar-end">
          <div class="navbar-item">
          <span class="icon is-medium">
            <i class="mdi mdi-24px mdi-account-outline"></i>
          </span>
          </div>
          <div class="navbar-item cart">
          <span class="icon is-medium">
            <span class="tag is-danger">0</span>
            <i class="mdi mdi-24px mdi-cart-outline"></i>
          </span>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    toggleBurger (el) {
      return el.target.classList.toggle('is-active')
    }
  }
}
</script>

<style>
.cart .tag {
  position: relative;
  top: -1em;
  left: 2.5em;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  cursor: default;
}
</style>