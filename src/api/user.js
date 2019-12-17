import fly from './config'

export default {
  // 获取我的的阅读指导
  stus:function (params) {
    return fly.get("/service/base/student/queryStudentListByClassId",params);
  },
  login:function (params) {
    return fly.post("/security/wechat",params);
  },
  info:function (params) {
    return fly.get("/service/base/teacher/queryUser",params);
  },
  check:function (params) {
    return fly.post("/service/base/teacher/userCheck",params)
  },
  updateStudent:function ({studentId,studentName}) {
    return fly.post(`/service/base/student/update_student?studentId=${studentId}&studentName=${studentName}`)
  }
}
