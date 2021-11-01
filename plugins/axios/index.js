import { Toast } from "vant";
import { httpCode } from "./httpCode";

export default ({ $axios, store, redirect }, inject) => {
  // 请求拦截
  $axios.onRequest(config => {
    // 打开 Loading
    store.commit("showLoading");
    // 判断是否有 Token
    if (store.state.userInfo.token) {
      $axios.setHeader("Authorization", `Bearer ${store.state.userInfo.token}`);
    }
    return config;
  });

  // 响应拦截
  $axios.onResponse(res => {
    // 关闭 Loading
    store.commit("hiddenLoading");
    // 服务端响应状态码
    const { status, message } = res.data;
    switch (status) {
      case 0:
        Toast(message);
        redirect("/my/login", { t: new Date().getTime() });
        break;
      default:
        break;
    }
  });

  // 错误拦截
  $axios.onError(err => {
    // 关闭 Loading
    store.commit("hiddenLoading");
    // HTTP 错误码
    const code = parseInt(err.response && err.response.status);
    // 提示错误信息
    Toast(httpCode[code]);
    // 错误处理
    switch (code) {
      case 404:
        redirect("404");
        break;
      case 401:
        // 没有权限访问该接口
        console.log("401");
        redirect("/my/login", { t: new Date().getTime() });
        break;
      default:
        break;
    }
  });

  // 封装请求方法
  let requestMethods = {};
  // 请求方法
  ["$get", "$post", "$put", "$delete"].forEach(method => {
    // 增加请求方法
    requestMethods[method] = (url, data) => {
      return $axios[method](
        url,
        method == ("$get" || "$delete") ? { params: data } : data
      );
    };
    // 注入
    inject("request", requestMethods);
  });
};
