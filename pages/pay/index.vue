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
  async mounted({ query, $api }) {
    // 获取用户IP地址
    const ip = await fetch("https://v6r.ipip.net/", { method: "get" });
    // 下单参数
    const params = {
      body: query.name,
      spbill_create_ip: ip || "127.0.0.1",
      total_fee: 1,
      trade_type: "NATIVE",
    };
    // 调用微信下单接口
    const { pay_qrcode, out_trade_no } = await $api.WxOrder(params);
    console.log("payData", data);
    // 判断下单是否成功
    if (pay_qrcode) {
      // 更新支付二维码
      this.payQrcode = pay_qrcode;
      // 定时器轮询调用订单查询接口判断订单是否支付
      this.timeId = setInterval(async () => {
        const resultData = await this.$api.QueryOrder(out_trade_no);
        // 判断是否已支付
        if (resultData.trade_state === "SUCCESS") {
          this.payStatus = true;
          // 清除轮询订单查询接口的定时器
          clearInterval(this.itemId);
        }
      }, 3000);
    }
  },
  beforeDestroy() {
    // 清除轮询订单查询接口的定时器
    clearInterval(this.itemId);
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
