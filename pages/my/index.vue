<template>
  <div class="my">
    <div class="my_info">
      <h3>会员个人信息</h3>
      <p>
        <span>ID:</span>
        <span>{{ userInfo.id }}</span>
      </p>
      <p>
        <span>用户名:</span>
        <span>{{ userInfo.username }}</span>
      </p>
      <p>
        <span>手机号：</span>
        <span>{{ userInfo.mobile }}</span>
      </p>
      <van-button type="danger" @click="logout">退出登录</van-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  computed: { ...mapState(["userInfo"]) },
  methods: {
    ...mapMutations(["deleteUserInfo"]),
    // 退出登录
    logout() {
      // 清空 localStorage 中的 Token
      localStorage.removeItem("token");
      // 清空 vueX 中的用户数据;
      this.deleteUserInfo();
      // 跳转到登录页面
      this.$router.push("/my/login");
    },
  },
  beforeCreate() {
    // 判断 vueX 是否有用户信息
    if (this.$store.userInfo && this.$store.userInfo.id) {
      this.$store.commit(
        "updataUserInfo",
        JSON.parse(localStorage.getItem("userinfo"))
      );
    }
    // 如果没有 Token 就跳转到登录页面
    this.$store.state.userInfo.token ||
      this.$router.push("/my/login", { t: new Date().getTime() });
  },
};
</script>

<style>
.my_info {
  padding-left: 2rem;
}
</style>
