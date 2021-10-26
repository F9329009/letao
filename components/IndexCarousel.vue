<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in swipeList" :key="item.id">
        <img :src="item.img_src" style="width: 100%; height: 100%" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  props: ["swipeList"],
};
</script>

<style>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  /* line-height: 150px; */
  text-align: center;
  /* background-color: #39a9ed; */
}
</style>
