import fly from './config'

export default {
  //发送短信
  sendSms:function (params) {
    return fly.get("/service/lite/validate/send",params);
  },
  getNews:function (params) {
    return fly.get("/service/lite/teacher/queryRecentNewsList",params);
  },
  upload:function (params) {
    return fly.get("/service/lite/qiniu/getUploadToken",params);
  },
  getBanner:function (params) {
    return fly.get("/service/lite/banner/getBanner",params);
  },
  saveFormId:function (params) {
    return fly.get("/service/lite/wechat/saveFormId",params);
  },
  qcloud:function (params) {
    return fly.get("/service/lite/qcloud/getQCloudInfo",params);
  },
  qcloudAuth:function (params) {
    return fly.get("/service/lite/qcloud/getCredential",params);
  },

}
