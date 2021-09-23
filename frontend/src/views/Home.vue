<template>
  <div class="home">
    <div class="home-img"></div>
    <div class="container is-flex is-flex-wrap-wrap is-justify-content-space-around mt-6">
      <StickerCard v-for="i of 16" :key="i" :name="i"></StickerCard>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import StickerCard from '@/components/StickerCard.vue'

export default {
  name: 'Home',
  components: {
    StickerCard
  }
}
</script>

<style>
.home-img {
  height: 400px;
  background-size: cover;
  background: url("https://images.unsplash.com/photo-1540651810471-5699df74834f") no-repeat local, fixed center;
  border-bottom: 4px groove hsl(204, 86%, 53%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>