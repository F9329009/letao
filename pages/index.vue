<template>
  <div class="container">
    <!-- 轮播图 -->
    <IndexCarousel :swipeList="swipeList" />
    <!-- 宫格 -->
    <IndexGrid :gridList="gridList" />
    <!-- 活动 -->
    <IndexActive />
    <!-- 品牌 -->
    <IndexBrand />
    <!-- 运动专区 -->
    <IndexSports :sportsList="sportsList" />
  </div>
</template>


<script>
export default {
  // asyncData 刷新页面时 运行在服务端 服务器调用服务器接口不存在跨域
  async asyncData({ $api }) {
    const [{ data: swipeList }, { data: gridList }, { data: sportsList }] =
      await Promise.all([$api.Banners(), $api.GridList(), $api.Sport()]);

    console.log("banners", swipeList);
    console.log("gridList", gridList);
    console.log("sports", sportsList);

    return { swipeList, gridList, sportsList };
  },
};
</script>


<style>
</style>
