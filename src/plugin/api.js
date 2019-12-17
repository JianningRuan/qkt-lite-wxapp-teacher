import api from '../api'


export function mixin (setting = {}) {
  setting = {

  }


  function setup () {
    this.$api = api
  }
  return {
    beforeLoad: setup,
    created: setup,
  }
}

const Plugin = {
  install ({ Page, Component }, setting) {
    const api = mixin(setting)
    Page.mixin(api)
    Component.mixin(api)
  },
}

export default Plugin
