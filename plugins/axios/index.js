import { Toast } from "vant";

import { httpCode } from "./httpCode";

export default ({ $axios, store, redirect }, inject) => {
  // 请求拦截
  $axios.onRequest(config => {
    if (store.state.token) {
      $axios.setHeader("Authorization", `Bearer ${store.state.token}`);
      console.log("onRequest", config.url, config.headers.common.Authorization);
    }
    return config;
  });

  // 响应拦截
  $axios.onResponse(res => {
    // 服务端响应状态码
    const { status, message } = res.data;
    switch (status) {
      case 0:
        Toast(message);
        redirect("/my/login");
        break;
      default:
        break;
    }
  });

  // 错误拦截
  $axios.onError(err => {
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
        redirect("/my/login");
        break;
      default:
        break;
    }
  });

  // 封装请求方法
  let requestMethods = {};
  // ["get", "post", "put", "delete"].forEach(method => {
  //   // 区分请求参数
  //   let paramsOrData =
  //     method == "get" || method == "delete" ? "params" : "data";
  //   // 请求方法
  //   requestMethods[method] = (url, data) => {
  //     return $axios({
  //       method,
  //       url,
  //       [paramsOrData]: data
  //     });
  //   };
  //   // 注入
  //   inject("request", requestMethods);
  // });

  // 简化
  ["$get", "$post", "$put", "$delete"].forEach(method => {
    // 请求方法
    requestMethods[method] = (url, data) => {
      console.log("hhhhhhhhhhhhhhhhhhhhhhhhhh", method, url, data);

      return $axios[method](
        url,
        method == "$get" || "$delete" ? { params: data } : data
      );
    };
    // 注入
    inject("request", requestMethods);
  });
};
