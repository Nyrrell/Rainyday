<template>
  <Navbar></Navbar>
  <router-view/>
  <Footer></Footer>
</template>

<script>
import Navbar from '@/components/templates/Navbar.vue'
import Footer from '@/components/templates/Footer.vue'

export default {
  components: {
    Navbar,
    Footer,
  }
}
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: hsl(0, 0%, 96%);
  padding-top: 84px;
}
</style>
