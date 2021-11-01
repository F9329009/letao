<template>
  <div>
    <van-form @submit="login">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[
          {
            required: true,
            validator: usernameValidator,
            message: '请输入用户名',
          },
        ]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[
          {
            required: true,
            validator: passwordValidator,
            message: '请输入密码',
          },
        ]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import Joi from "joi";

export default {
  data() {
    return {
      // 用户名
      username: "",
      // 密码
      password: "",
    };
  },
  methods: {
    // 用户名校验
    usernameValidator(val) {
      const verify = Joi.string().min(4).max(20).required().validate(val);
      return !verify.error;
    },
    // 密码校验
    passwordValidator(val) {
      const verify = Joi.string()
        .pattern(/^[a-zA-Z0-9]{6,20}$/)
        .validate(val);
      return !verify.error;
    },
    // 登录
    async login(value) {
      console.log("value", value);
      // 发送登录请求
      const { status, data } = await this.$api.Login(value);
      // 判断登录是否成功
      if (status === 200) {
        // 保存用户 Token 到 localStorage
        localStorage.setItem("token", data.token);
        // 保存用户数据到 localStorage
        localStorage.setItem("userinfo", JSON.stringify(data));
        // 存储用户 Token 到 cookie
        require("js-cookie").set("token", data.token);
        // 保存用户数据到 vueX
        this.$store.commit("updataUserInfo", data);
        // 跳转到首页
        this.$router.push("/");
      }
    },
  },
};
</script>

<style>
</style>
