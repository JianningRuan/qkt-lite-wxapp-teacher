


const initialState = {
  userInfo:{},
  classList:[]
};


const getters = {
  getUserInfo:(state, getters)=>{
    return state.userInfo;
  },
  getClassList:(state, getters)=>{
    return state.classList;
  },
};

const actions = {
  SetUserInfo({ commit, state },data) {
    commit('SETUSERINFO',data);
  },
  SetClassList({ commit, state },data) {
    commit('SETCLASSLIAT',data);
  },
};

const mutations = {
  ['SETUSERINFO']:(state, action)=> {
    state.userInfo=action.userInfo;
    return state;
  },
  ['SETCLASSLIAT']:(state, {classList})=> {
    let _classList=[];
    for(let i=0;i<classList.length;i++){
      let sameIndex=-1;
      for(let u=0;u<_classList.length;u++){
        if(classList[i].classId===_classList[u].classId){
          sameIndex=u;
          break;
        }
      }
      let subject=classList[i].subject;
      let subjectName=subject===0?'全科':subject===1?'语文':subject===2?'数学':subject===3?'英语':'';
      if(sameIndex===-1){
        // 没有相同的 追加班级
        _classList.push({...classList[i],subjectList:[{id:subject,name:subjectName}]});
      }else{
        // 有相同的，在相同的班级下追加科目
        _classList[sameIndex].subjectList.push({id:subject,name:subjectName});
      }
    }
    state.classList=_classList;
    return state;
  },
};

export default {
  state: initialState,
  getters,
  actions,
  mutations,
}
