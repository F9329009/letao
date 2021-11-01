export default ({ $request }, inject) => {
  inject("api", {
    /**
     * 轮播图接口
     * @returns
     */
    Banners() {
      return $request.$get("/banners");
    },
    /**
     * 宫格接口
     * @returns
     */
    GridList() {
      return $request.$get("/gridList");
    },
    /**
     * 运动专区接口
     * @returns
     */
    Sport() {
      return $request.$get("/sport");
    },
    /**
     * 一级分类
     * @returns
     */
    OneCategory() {
      return $request.$get("/oneCategory");
    },
    /**
     * 二级分类
     * @param {*} id 一级分类ID
     * @returns
     */
    TowCategory(id) {
      return $request.$get("/towCategory", { id });
    },
    /**
     * 获取验证码
     * @returns
     */
    SendSms() {
      return $request.$post("/sendSms");
    },
    /**
     * 注册
     * @param {Object} payload 注册信息
     * @returns
     */
    Register(payload) {
      return $request.$post("/users/register", payload);
    },
    /**
     * 登录
     * @param {Object} payload 登录信息
     * @returns
     */
    Login(payload) {
      return $request.$post("/users/login", payload);
    },
    /**
     * 微信下单
     * @param {Object} payload
     * @returns
     */
    WxOrder(payload) {
      return $request.$post("/wxPay/order", payload);
    },
    /**
     * 查询订单
     * @param {String} payload
     */
    QueryOrder(payload) {
      return $request.$post("/wxPay/queryOrder", payload);
    }
  });
};
