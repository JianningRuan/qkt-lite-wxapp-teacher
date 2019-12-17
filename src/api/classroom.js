import fly from './config'

export default {
  get:function (params) {
    return fly.get("/service/base/teacher/queryClassList",params);
  },
  getStu:function (params) {
    return fly.get("/service/base/student/queryStudentListByClassId",params);
  },
  removeStu:function (params) {
    return fly.get("/service/base/student/removeStudentsFromClass",params);
  },
  // 二维码生成
  getwxacode: function (params) {
    return fly.get('/service/base/teacher/getwxacode', params)
  },
  // 获取申请学生
  queryApply: function (params) {
    return fly.get('/service/base/teacher/queryApply', params)
  },
  // 入班申请处理
  dealApply: function (params) {
    return fly.post('/service/base/teacher/dealApply', params)
  }
}
