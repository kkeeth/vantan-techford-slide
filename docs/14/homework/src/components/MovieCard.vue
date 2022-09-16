<template>
  <div class="card">
    <div class="thumbnail">
      <img :src="information.thumbnailImageUrl" alt="thumbnail image" />
    </div>
    <div class="contents">
      <div class="icon">
        <img :src="information.uploadIconImageUrl" alt="icon image" />
      </div>
      <div class="detail">
        <p class="title">{{ information.movieTitle }}</p>
        <p class="channel">{{ information.channelName }}</p>
        <p class="live-badge" v-show="information.liveFlg">ライブ配信中</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MovieCard',
    props: {
      information: {
        type: Object,
        required: true,
      }
    }
  }
</script>

<style>
  .card {
    display: flex;
    flex-direction: column;
    max-width: 300px;
    border: 1px solid #ddd;
  }
  .card p {
    margin: 0;
  }
  .thumbnail img {
    width: 100%;
  }
  .contents {
    display: flex;
  }
  .icon {
    flex-basis: 20%;
  }
  .icon img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .detail {
    display: flex;
    flex-direction: column;
    flex-basis: 75%;
    text-align: left;
    margin-left: 5%;
  }
  .live-badge {
    color: red;
    border: 1px solid red;
  }
</style>