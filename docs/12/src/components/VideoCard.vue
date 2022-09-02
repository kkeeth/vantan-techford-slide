<template>
  <div class="video-card">
    <img :src="information.thumbnailUrl" class="thumbnail" />
    <div class="information-wrapper">
      <img :src="information.userIconUrl" class="user-icon" />
      <div class="information">
        <p class="video-title">{{ information.title }}</p>
        <p class="user-name">{{ information.userName }}</p>
        <p class="video-watched">{{ information.watched }}</p>
        <p v-if="information.isOnline" class="video-is-online">ライブ配信中</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    information: {
      type: Object,
      require: true,
      default: () => {
        return {
          thumbnailUrl: "",
          userIconUrl: "",
          title: "",
          userName: "",
          watched: 0,
          isOnline: false,
        };
      },
    },
  },
};
</script>

<style scoped>
.video-card {
  width: 300px;
  min-height: 320px;
  background: #fff;
  padding: 12px;
}
.thumbnail {
  width: 100%;
}
.information-wrapper {
  display: flex;
  padding-top: 12px;
}
.user-icon {
  width: 36px;
  height: 36px;
  border-radius: 18px;
  margin-right: 12px;
  flex-grow: 0;
}
.information {
  flex-grow: 1;
}
.video-title {
  color: #333;
  font-size: 16px;
  font-weight: bold;
  width: 100%;
  word-break: break-all;
}
.user-name,
.video-watched {
  color: #888;
  font-size: 12px;
  width: 100%;
  margin: 4px 0;
}
.video-is-online {
  border: 1px solid #ff3333;
  color: #ff3333;
  font-size: 12px;
  padding: 2px;
  border-radius: 2px;
  display: inline;
}
</style>
