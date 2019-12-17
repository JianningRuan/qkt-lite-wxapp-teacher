import fly from './config'

export default {
  // 获取我的的阅读指导
  create:function (params) {
    return fly.post("/service/lite/teacher/notice/addNotice",params);
  },
  // 获取系统消息
  get:function (params) {
    return fly.get("/service/lite/teacher/notice/queryNoticeList",params);
  },
  list:function (params) {
    return fly.get("/service/lite/teacher/notice/queryLastNoticeList",params);
  },
  show:function (params) {
    return fly.get("/service/lite/teacher/notice/getNotice",params);
  },
  sendUnread(params){
    return fly.get("/service/lite/teacher/homework/noticeUFStudent",params)
  }
}
