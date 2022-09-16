<template>
  <div class="wrapper">
    <MovieCard
      v-for="(movie, index) in movies"
      :key="index"
      :information="movie"
    />
  </div>
</template>

<script>
import MovieCard from './MovieCard.vue'

export default {
  name: 'MovieList',
  props: {
    movies: {
      type: Array,
      required: true,
    }
  },
  components: {
    MovieCard
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wrapper {
    margin: 0 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    justify-items: center;
    gap: 1rem;
  }
</style>
