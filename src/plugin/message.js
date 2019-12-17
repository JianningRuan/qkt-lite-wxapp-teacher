import wxio from 'wxio'

const DEFAULT_SETTING = {
  duration: 1500,
  mask:false,
}

export class CancelError extends Error {
  constructor () {
    super('Canceled')
    this.name = 'CancelError'
  }
}

export function mixin (setting={}) {
  const toast = (params) => {
    let config=JSON.parse(JSON.stringify(DEFAULT_SETTING));
    return new Promise((resolve => {
      if(typeof (params)=='object'){
        if(params.mask){
          config.mask=params.mask;
        }
        if(params.duration){
          config.duration=params.duration;
        }
        wxio.showToast({title:params.title,icon:'none',...config});
      }else{
        wxio.showToast({title:params.toString(),icon:'none',...config});
      }
      setTimeout(()=>{
        resolve()
      },config.duration)
    }))
  };

  const message={
    success(params){
      return setMessage('success',setting,params);
    },
    error(params){
      return setMessage('error',setting,params);
    }
  }

  const setMessage=(type,setting,params)=>{
    let config=JSON.parse(JSON.stringify(DEFAULT_SETTING));
    return new Promise((resolve)=>{
      if(typeof (params)=='object'){
        if(params.mask){
          config.mask=params.mask;
        }
        if(params.mask){
          config.duration=params.duration;
        }
        config.title=params.title;
      }else{
        config.title=params.toString();
      }
      if(type=='success'){
        config.icon=type;
      }else if(type=='error'){
        config.image='https://image.baidu.com/search/detail?ct=503316480&z=&tn=baiduimagedetail&ipn=d&word=icon&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=-1&cs=1127226966,1278292789&os=493005680,1803306227&simid=1888189960,840463219&pn=10&rn=1&di=49999088280&ln=1909&fr=&fmq=1542769795549_R&ic=0&s=undefined&se=&sme=&tab=0&width=&height=&face=undefined&is=0,0&istype=2&ist=&jit=&bdtype=13&spn=0&pi=0&gsm=0&objurl=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dd6c502a48d01a18be4e61a0cf6466d7d%2F86d6277f9e2f07087529ae88e324b899a901f20e.jpg&rpstart=0&rpnum=0&adpicid=0'
      }
      wx.showToast(config);
      setTimeout(()=>{
        resolve()
      },config.duration)
    })
  };


  function setup () {
    this.$toast = toast
    this.$message = message
  }
  return {
    beforeLoad: setup,
    created: setup,
  }
}

const Plugin = {
  install ({ Page, Component }, setting) {
    const message = mixin(setting)
    Page.mixin(message)
    Component.mixin(message)
  },
}

export default Plugin;
