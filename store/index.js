export const state = () => {
  return {
    // 用户数据
    userInfo: {},
    // Loading是否显示
    loadingShow: false
  };
};

// 同步方法
export const mutations = {
  // 更新用户信息
  updataUserInfo(state, payload) {
    state.userInfo = payload;
  },
  // 删除用户信息
  deleteUserInfo(state) {
    state.userInfo = {};
  },
  // 显示 Loading
  showLoading(state) {
    state.loadingShow = true;
  },
  // 隐藏 Loading
  hiddenLoading(state) {
    state.loadingShow = false;
  }
};

// 异步方法
export const actions = {
  // 只在服务端执行一次 路由切换不会执行
  nuxtServerInit({ commit }, { app, req }) {
    // 判断是否存在 token
    if (req.headers.cookie) {
      const { token } = require("cookieparser").parse(req.headers.cookie);
      // 更新 vueX 中的 Token
      commit("updataUserInfo", { ...token });
    }
  }
};
