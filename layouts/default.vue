<template>
  <div class="container">
    <div class="header">
      <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="onClickBack"
      >
        <!-- <template #right>
          <van-icon name="search" size="18" />
        </template> -->
      </van-nav-bar>
    </div>
    <div class="main">
      <Nuxt />
    </div>
    <div class="footer">
      <van-tabbar v-model="active">
        <van-tabbar-item name="index" to="/" icon="home-o">
          首页
        </van-tabbar-item>
        <van-tabbar-item name="category" to="/category" icon="search">
          分类
        </van-tabbar-item>
        <van-tabbar-item name="cart" to="/cart" icon="friends-o">
          购物车
        </van-tabbar-item>
        <van-tabbar-item name="my" to="/my" icon="setting-o">
          我的
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: this.$route.name,
      title: "",
    };
  },
  methods: {
    refreshHandle() {
      // 设置导航标题
      this.title = {
        index: "乐淘 - 首页",
        category: "乐淘 - 分类",
        cart: "乐淘 - 购物车",
        my: "乐淘 - 我的",
      }[this.$route.name];
      // 设置导航高亮
      this.active = this.$route.name;
    },
    // 返回
    onClickBack() {
      this.$router.go(-1);
    },
  },
  // 刷页面会触发 mounted asyncData 钩子只能在页面组件中使用
  mounted() {
    // 设置导航标题
    this.refreshHandle();
  },
  watch: {
    // 监听路由变化
    $route() {
      // 设置标题和高亮
      this.refreshHandle();
    },
  },
};
</script>

<style>
</style>
