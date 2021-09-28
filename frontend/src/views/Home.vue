<template>
  <div class="home">
    <div class="home-header">
      <div class="title is-size-1 has-text-centered">
        <p>Bienvenue sur</p><br>
        <p>SHOP-TITLE</p>
      </div>
    </div>
    <div class="container mt-6">
      <h1 class="title">Notre selection de stickers </h1>
      <div class="is-flex is-flex-wrap-wrap is-justify-content-space-around">
        <ProductCard v-for="i of 16" :key="i" :name="i"></ProductCard>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue'

export default {
  name: 'Home',
  components: {
    ProductCard
  }
}
</script>

<style lang="scss">
.home-header {
  height: 400px;
  border-bottom: 4px groove hsl(204, 86%, 53%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)), url("https://images.unsplash.com/photo-1540651810471-5699df74834f");
  background-attachment: local, fixed;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  p {
    color: white;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, .4);
    background: linear-gradient(to top, transparent 10%, rgba(32, 156, 238, 0.8) 10.01%, rgba(32, 156, 238, 0.8) 40%, transparent 40.01%) no-repeat left bottom / 100% 100%;
    display: inline-block;
  }
}

</style>