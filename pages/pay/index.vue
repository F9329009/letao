<template>
  <div class="pay">
    <!-- 已支付 -->
    <div v-if="payStatus" class="pay-ok">
      <h3>您已支付</h3>
    </div>
    <!-- 未支付 -->
    <div v-else class="pay-no">
      <h3>支付二维码</h3>
      <van-image width="100" height="100" :src="payQrcode" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 订单支付状态
      payStatus: false,
      // 微信支付二维码
      payQrcode: "",
      // 支付结果轮询定时器ID
      timeId: null,
    };
  },
  async asyncData() {
    // 获取用户IP地址
    const userIp = await fetch("https://v6r.ipip.net/", { method: "get" })
      .then((res) => res.text())
      .catch(() => "127.0.0.1");

    return { userIp };
  },
  async mounted() {
    const { id, name, price } = this.$route.query;
    // IP地址正则匹配表达式
    const ipReg =
      /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    // 下单参数
    const params = {
      id,
      body: name,
      spbill_create_ip: ipReg.test(this.userIp) ? this.userIp : "127.0.0.1",
      total_fee: price,
      trade_type: "NATIVE",
    };
    console.log(params);

    // 调用微信下单接口
    const {
      status,
      data: { pay_qrcode, out_trade_no },
    } = await this.$api.WxOrder(params);

    // 判断下单是否成功
    if (status == 200 && pay_qrcode) {
      // 更新支付二维码
      this.payQrcode = pay_qrcode;
      // 定时器轮询调用订单查询接口判断订单是否支付
      const timeId = setInterval(async () => {
        // 查询支付状态
        const {
          status,
          data: { trade_state },
        } = await this.$api.QueryOrder(out_trade_no);

        // 判断是否已支付
        if (status == 200 && trade_state === "SUCCESS") {
          this.payStatus = true;
          // 清除轮询订单查询接口的定时器
          clearInterval(timeId);
        }
      }, 3000);
      // 通过 $once 监听定时器 在 beforeDestroy 钩子中清除定时器
      this.$once("hook:beforeDestroy", () => {
        clearInterval(timeId);
      });
    }
  },
};
</script>

<style>
.pay {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
