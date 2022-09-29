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
        <span class="live-badge" v-show="information.liveFlg">ライブ配信中</span>
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
    min-width: 280px;
    margin: 0;
    gap: 8px;
  }
  .card p {
    margin: 0;
  }
  .thumbnail {
    height: 180px;
  }
  .thumbnail img {
    width: 100%;
    height: 100%;
  }
  .contents {
    display: flex;
  }
  .icon {
    flex-basis: 20%;
  }
  .icon img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .detail {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-left: 5%;
  }
  .detail .title {
    font-weight: bold;
    font-size: large;
    margin-bottom: 4px;
  }
  .detail .channel {
    color: #666;
  }
  .detail .live-badge {
    color: red;
    border: 1px solid red;
    width: 100%;
  }
</style>