<template>
  <section class="card m-4">
    <header class="card-header">
      <p class="card-header-title">
        Sticker #{{ name }}
      </p>
    </header>
    <div class="card-image">
      <figure class="image is-square">
        <img src="https://via.placeholder.com/200" alt="Placeholder image">
      </figure>
    </div>
    <footer class="card-footer">
      <button class="card-footer-item button is-success is-outlined">
        Commander
      </button>
    </footer>
  </section>
</template>

<script>
export default {
  name: 'StickerCard',
  props: {
    name: Number
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  flex: 0 0 20%;
}

.card-footer .button {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
