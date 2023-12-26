import axios from 'axios';
import cookies from "js-cookie";
import StUI from '@sottop/st-ui'
import router from "@/router";
import {t} from "@/locales";
import {decodeByAES} from "@/hooks/useAES/useAES";
// 创建 Axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // 设置基础 URL
  timeout: 500000, // 设置超时时间
  headers: {'Content-Type': 'application/json'}, // 设置请求头
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    config.headers.satoken = cookies.get('satoken') ? decodeByAES(cookies.get('satoken') as string) : ''
    if(config.ContentType) {
      config.headers["Content-Type"] = config.ContentType
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code === 401) {
      StUI.dialogUtil.showStMessage.error({
        content: t('tips_token_not_valid'),
        duration: 2
      })
      setTimeout(() => {
        router.push('/login')
      }, 2000)
      return
    }
    if (res.code && res.code !== 200) {
      StUI.dialogUtil.showStMessage.error({
        content: res.msg,
        duration: 2
      })
      return Promise.reject(response);
    } else if(res.data){
      return res.data
    } else {
      return res
    }
  },
  error => {
    return Promise.reject(error);
  }
);

export default service
