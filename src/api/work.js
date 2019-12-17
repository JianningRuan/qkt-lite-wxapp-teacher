import fly from './config'

export default {
  create:function (params) {
    return fly.post("/service/lite/teacher/homework/assignHomework",params);
  },
  get:function (params) {
    return fly.get("/service/lite/teacher/homework/queryHomeworkList",params);
  },
  show:function (params) {
    return fly.get("/service/lite/teacher/homework/queryHomework",params);
  },
  update:function (params) {
    return fly.post("/service/lite/teacher/homework/modifyHomework",params);
  },
  check:function (params) {
    return fly.get("/service/lite/teacher/homework/correctHomework",params)
  },
  sendNotice:function (params) {
    return fly.get("/service/lite/teacher/homework/noticeUFStudent",params);
  },
  getStuWork:function (params) {
    return fly.get("/service/lite/teacher/homework/queryStuHomework",params);
  },
  remove:function (params) {
    return fly.get("/service/lite/teacher/homework/removeHomework",params)
  }
}
