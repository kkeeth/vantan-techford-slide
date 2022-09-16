<template>
  <MovieList :movies="movies" />
</template>

<script>
import MovieList from './components/MovieList.vue'

export default {
  name: 'App',
  components: {
    MovieList
  },
  data() {
    return {
      movies: [
        {
          thumbnailImageUrl: 'https://giphy.com/gifs/stefanie-shank-house-of-joy-stef-xT0GqqWj0MagW1COzu',
          uploadName: 'ゆめみ一郎',
          uploadIconImageUrl: '',
          liveFlg: false,
        },
        {
          thumbnailImageUrl: 'https://giphy.com/gifs/animation-bird-flying-xTcnSMB8VXjTox23zW',
          uploadName: 'ゆめみ二郎',
          uploadIconImageUrl: '',
          liveFlg: false,
        },
        {
          thumbnailImageUrl: 'https://giphy.com/gifs/aww-animals-being-cute-QVsIdgs7sToek',
          uploadName: 'ゆめみ三郎',
          uploadIconImageUrl: '',
          liveFlg: false,
        },
        {
          thumbnailImageUrl: 'https://giphy.com/gifs/scifri-dance-bird-xT77XLWNWgg42wbKVi',
          uploadName: 'ゆめみ四郎',
          uploadIconImageUrl: '',
          liveFlg: false,
        },
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
