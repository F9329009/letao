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
            message: '您输入的密码不一致',
          },
        ]"
      />
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
      >
        <template #button>
          <van-button
            type="primary"
            size="small"
            round
            native-type="button"
            :disabled="isDisabled"
            @click="sendSms"
          >
            {{ smsBtnText }}
          </van-button>
        </template>
      </van-field>

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
      <div style="margin: 16px; font-size: 14px">
        <van-checkbox v-model="protocolChecked" shape="square" icon-size="14px">
          我同意 《注册协议》
        </van-checkbox>
      </div>
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
      // 注册协议勾选状态
      protocolChecked: false,
      // 短信验证码按钮文本
      smsBtnText: "发送验证码",
      // 短信验证码按钮知否禁用
      isDisabled: false,
      // 短信发送间隔
      codeInterval: 0,
      // 正确验证码
      correctCode: null,
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
      return this.password === val;
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
      // const verify = Joi.string()
      //   .pattern(/^[0-9]{6}$/)
      //   .validate(val);
      // return !verify.error;

      // 客户端判断验证码是否正确
      // 正常流程应该把验证码发送到服务端进行验证
      return this.correctCode === val;
    },
    // 发送短信验证码
    async sendSms() {
      // 校验手机号是否正确
      if (this.telValidator(this.tel)) {
        const {
          status,
          data: { code },
        } = await this.$api.SendSms({ tel: this.tel });
        // 保存服务器返回的验证码
        this.correctCode = code;
        if (status == 200) {
          // 短信发送成功提示
          this.$notify({
            type: "success",
            message: "手机短信验证码发送成功",
          });
          // 倒计时 60 秒
          this.codeInterval = 60;
          // 禁用 发送短信按钮
          this.isDisabled = true;
          // 修改 发送短信按钮 文案
          this.smsBtnText = `发送验证码(${this.codeInterval}s)`;
          // 限制短信发送间隔
          const timeId = setInterval(async () => {
            // 短信发送间隔 -1
            this.codeInterval--;
            // 修改 发送短信按钮 文案
            this.smsBtnText = `发送验证码(${this.codeInterval}s)`;
            // 判断发送间隔是否为0
            if (!this.codeInterval) {
              // 清除定时器
              clearInterval(timeId);
              // 重置 发送短信按钮 文案
              this.smsBtnText = "发送验证码";
              // 启用 发送短信按钮
              this.isDisabled = false;
            }
          }, 1000);
          // 通过 $once 监听定时器 在 beforeDestroy 钩子中清除定时器
          this.$once("hook:beforeDestroy", () => {
            clearInterval(timeId);
          });
        } else {
          // 短信发送成功提示
          this.$notify({
            type: "danger",
            message: "手机短信验证码发送失败",
          });
        }
      } else {
        // 短信发送成功提示
        this.$notify({
          type: "warning",
          message: "请输入正确的手机号码",
        });
      }
    },
    // 注册
    async register(value) {
      // 判断是否勾选用户协议
      if (this.protocolChecked) {
        // 发送注册请求
        const { status, message } = await this.$api.Register({
          username: value.username,
          password: value.password,
          mobile: value.tel,
        });

        if (status == 200) {
          // 注册成功提示
          this.$notify({
            type: "success",
            message: `${message} 3秒后跳转到登录页面`,
          });
          // 延迟3秒
          setTimeout(() => {
            // 跳转到登录页面
            this.$router.push("/my/login");
          }, 3000);
        }
      } else {
        this.$notify({
          type: "warning",
          message: "请先阅读并同意注册协议",
        });
      }
    },
  },
};
</script>

<style>
</style>
