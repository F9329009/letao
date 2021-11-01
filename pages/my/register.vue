<template>
  <div>
    <van-form @submit="register">
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
      <van-field
        v-model="repeatPassword"
        type="repeatPassword"
        name="repeatPassword"
        label="确认密码"
        placeholder="确认密码"
        :rules="[
          {
            required: true,
            validator: repeatPasswordValidator,
            message: '请再次输入密码',
          },
        ]"
      />
      <van-row>
        <van-col span="18">
          <van-field
            v-model="tel"
            type="tel"
            name="tel"
            label="手机号"
            placeholder="请输入手机号"
            :rules="[
              {
                required: true,
                validator: telValidator,
                message: '请输入手机号',
              },
            ]"
          />
        </van-col>
        <van-col span="6">
          <van-button type="primary" native-type="button" size="small">
            发送验证码
          </van-button>
        </van-col>
      </van-row>
      <van-field
        v-model="telCode"
        name="telCode"
        label="验证码"
        placeholder="请输入手机验证码"
        :rules="[
          {
            required: true,
            validator: telCodeValidator,
            message: '请输入正确的手机验证码',
          },
        ]"
      />
      <van-checkbox v-model="checked" shape="square">《注册协议》</van-checkbox>
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">
          注册
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
      // 确认密码
      repeatPassword: "",
      // 手机号
      tel: "",
      // 手机验证码
      telCode: "",
    };
  },
  methods: {
    // 校验函数返回 true 表示校验通过，false 表示不通过
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
    // 确认密码校验
    repeatPasswordValidator(val) {
      const verify = Joi.ref(this.password).validate(val);
      return !verify.error;
    },
    // 手机号校验
    telValidator(val) {
      const verify = Joi.string()
        .pattern(
          /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
        )
        .validate(val);
      return !verify.error;
    },
    // 手机验证码校验
    telCodeValidator(val) {
      const verify = Joi.string()
        .pattern(/^[0-9]{6}$/)
        .validate(val);
      return !verify.error;
    },
    // 注册
    register(value) {
      console.log("value", value);
    },
  },
};
</script>

<style>
</style>
