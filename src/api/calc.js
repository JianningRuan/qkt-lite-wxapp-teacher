import fly from './config'

export default {
  // 获取我的的阅读指导
  ruleList:function (params) {
    return fly.get("/service/lite/exercises/queryRuleList",params);
  },
  issueList:function (params) {
    return fly.get("/service/lite/exercises/queryRandomExercisesList",params);
  },
  info:function (params) {
    return fly.get("/service/base/teacher/queryUser",params);
  },
  check:function (params) {
    return fly.get("/service/base/teacher/userCheck",params)
  }
}
