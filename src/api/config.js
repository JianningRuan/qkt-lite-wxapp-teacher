// import Fly from '../until/wx';
import Fly from 'flyio/dist/npm/wx'
// var Fly=require("../until/wx") //wx.js为您下载的源码文件
var fly = new Fly(); //Create an instance of Fly
// import message from '../message'


fly.interceptors.request.use((config, promise) => {
  config.headers["access_token"] = wx.getStorageSync('accessToken');
  return config;
})
fly.interceptors.response.use(
  (response, promise) => {
    if (typeof (response.data) === 'string' && response.data !== '') {
      response.data = JSON.parse(response.data);
    }

    if (response.data.rcode === 405) {
      wx.removeStorageSync('accessToken');
      wx.reLaunch({
        url: '/pages/login'
      })
    } else if (response.data.rcode === 400 || response.data.rcode === 403) {
      if (response.data.message) {
        wx.showToast({
          title: response.data.message,
          icon: 'none',
          duration: 2000
        })
      }
      promise.resolve(response.data);

    } else {
      return response.data;
      promise.resolve();
    }

    // response.data=Mock.mock(response.data)
    // Do something with response data .
    // Just return the data field of response

  },
  (err, promise) => {
    if(err.status>=500){
      wx.showToast({
        title: '系统错误，请稍后再试或咨询客服',
        icon: 'none',
        duration: 2000
      })
    }
    // Do something with response error
    //promise.resolve("ssss")

  }
)
// Set the base url
if (process.env.NODE_ENV === 'production') {//正式域名
  fly.config.baseURL = "https://qkt-api.uedu100.com";

} else {//测试域名
  // fly.config.baseURL="http://192.168.20.31:8084"//啊添
  // fly.config.baseURL="http://192.168.20.63:8083/"; //小凤
  // fly.config.baseURL="http://192.168.1.29:8084"//开发
  fly.config.baseURL = "https://qkt-api-test.uedu100.com"//开发
  // fly.config.baseURL="http://172.18.16.232:8083"//锦华
}


export default fly;
