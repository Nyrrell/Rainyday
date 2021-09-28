<template>
  <nav class="navbar is-dark is-spaced is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-menu ">
        <div class="navbar-start">
          <router-link to="/" class="navbar-item">Accueil</router-link>
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
          <a class="navbar-item">
          <span class="icon is-medium">
            <i class="mdi mdi-24px mdi-account-outline"></i>
          </span>
          </a>
          <a class="navbar-item cart">
            <span class="icon is-medium">
              <i class="mdi mdi-24px mdi-cart-outline"></i>
              <span class="tag is-danger">0</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    toggleBurger(el) {
      return el.target.classList.toggle('is-active')
    }
  }
}
</script>

<style>
nav {
  border-bottom: 4px groove hsl(204, 86%, 53%);
}
.cart .tag {
  position: absolute;
  top: 0.2em;
  left: 2em;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  cursor: pointer;
}
</style>