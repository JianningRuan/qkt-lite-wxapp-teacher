
import map from 'just-map-object'
import types from '../types'
import {
  fetchConfig,
} from '../../api'

const initialState = {
  list: [],
  selectScope:[]
};

const getters = {
  getList:(state, getters)=>{
    return state.list;
  },
  getSelectScope:(state, getters)=>{
    return state.selectScope;
  }
};

const actions = {
  setList ({ commit, state },data) {
    commit('SETLIST',data);
  },
  deleteItemById ({ commit, state },data) {
    debugger;
    commit('DELETEITEM',data);
  },
  AddSelectScope({ commit, state },data) {
    commit('ADDSETSELECTSCOPE',data);
  },
  RemoveSelectScope({ commit, state },data) {
    commit('REMOVESETSELECTSCOPE',data);
  },
  ClearSelectScope({ commit, state },data) {
    commit('CLEARSELECTSCOPE');
  },
};

const mutations = {
  ['SETLIST']:(state, action)=> {
    state.list=action.list;
    return state
  },
  ['ADDSETSELECTSCOPE']:(state, action)=> {
    state.selectScope.push(action.item);
    return state;
  },
  ['CLEARSELECTSCOPE']:(state, action)=> {
    state.selectScope=[];
    return state;
  },
  ['REMOVESETSELECTSCOPE']:(state, action)=> {
    let index;
    for(let i=0;i<state.selectScope.length;i++){
      if(state.selectScope[i].id==action.item.id){
        index=i;
        break;
      }
    }
    state.selectScope.splice(index,1);
    return state
  },

  ['DELETEITEM']:(state, action)=> {
    if(state && state.list && state.list.length>0){
      let index;
      for(let i=0;i<state.list.length;i++){
        if(state.list[i].id==action.id){
          index=i;
        }
      }
      if(typeof (index)!='undefined'){
        state.list.splice(index,1);
        return state;
      }else{
        return state;
      }
    }else{
      return state
    }
  },
};

export default {
  state: initialState,
  getters,
  actions,
  mutations,
}
