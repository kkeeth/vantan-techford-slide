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
          thumbnailImageUrl: 'https://media.giphy.com/media/xT0GqqWj0MagW1COzu/giphy.gif',
          channelName: 'ゆめみ一郎',
          movieTitle: '動画タイトル１',
          uploadIconImageUrl: 'https://placedog.net/500/500',
          liveFlg: false,
        },
        {
          thumbnailImageUrl: 'https://media.giphy.com/media/xTcnSMB8VXjTox23zW/giphy.gif',
          channelName: 'ゆめみ二郎',
          movieTitle: '動画タイトル２',
          uploadIconImageUrl: 'https://placedog.net/400/400',
          liveFlg: true,
        },
        {
          thumbnailImageUrl: 'https://media.giphy.com/media/QVsIdgs7sToek/giphy.gif',
          channelName: 'ゆめみ三郎',
          movieTitle: '動画タイトル３',
          uploadIconImageUrl: 'https://placedog.net/300/300',
          liveFlg: false,
        },
        {
          thumbnailImageUrl: 'https://media.giphy.com/media/xT77XLWNWgg42wbKVi/giphy.gif',
          channelName: 'ゆめみ四郎',
          movieTitle: '動画タイトル４',
          uploadIconImageUrl: 'https://placedog.net/200/200',
          liveFlg: true,
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
