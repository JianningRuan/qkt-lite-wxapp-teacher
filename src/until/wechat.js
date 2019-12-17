
// const qiniuUploader = require("@/until/qiniuUploader-min");//七牛上传sdk
import COS from 'cos-wx-sdk-v5'//腾讯云cos上传sdk
import api from '@/api/until'

let wechat={
  getSetting:()=>{
    return new Promise((resolve,reject)=>{
      wx.getSetting(
        {
          success:(res)=>{
            resolve(res.authSetting);
          }
        }
      )
    })
  },
  toast:(title,duration,mask)=>{
    duration=duration?duration:1500;
    return new Promise((resolve,reject)=>{
      wx.showToast(
        {
          title:title,
          icon:'none',
          mask:mask?mask:false,
          duration:duration
        }
      );
      setTimeout(()=>{
        resolve();
      },duration)
    })
  },
  getAuth:()=>{
    return new Promise((resolve,reject)=>{
      let token=wx.getStorageSync('token');
      if(token && token !=''){
        resolve(true);
      }else{
        resolve(false);
      }
    })
  },
  getLoginCode:()=>{
    return new Promise((resolve => {
      wx.login({
        success (res) {
          if (res.code) {
            resolve(res.code)
          } else {
            resolve(null);
          }
        }
      })
    }))
  },
  token:null,
  chooseImage(count){
    return new Promise((resolve,reject)=>{
      wx.chooseImage({
        count: count||9,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success :(res)=>{
          // tempFilePath可以作为img标签的src属性显示图片
          // let base64s=[];
          // let FileSystemManager=wx.getFileSystemManager();
          // res.tempFilePaths.map((item=>{
          //   let type = item.replace(/.+\./, "").toLowerCase();
          //   let base64=FileSystemManager.readFileSync(item,'base64');
          //   base64s.push(`data:image/${type};base64,${base64}`);
          // }));
          resolve(res.tempFilePaths);
        }
      })
    })
  },
  /*chooseImage(count){
    return new Promise((resolve,reject)=>{
      wx.chooseImage({
        count: count||9,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
          // tempFilePath可以作为img标签的src属性显示图片
          let base64s=[];
          let FileSystemManager=wx.getFileSystemManager();
          res.tempFilePaths.map((item=>{
            let type = item.replace(/.+\./, "").toLowerCase();
            let base64=FileSystemManager.readFileSync(item,'base64');
            base64s.push(`data:image/${type};base64,${base64}`);
          }))
          resolve({paths:res.tempFilePaths,base64s:base64s});
        }
      })
    })
  },*/
  //type 文件类型	number	1图片 2音频 3视频 4文档
  //folderName 分类文件夹	string	work:作业 notice:通知
  upload(fileList,type=1,folderName='work'){
    return new Promise(async (resolve)=>{
      // 初始化实例
      var cos = new COS({
        getAuthorization: async (options, callback) =>{
          // 异步获取签名
          let res= await api.qcloudAuth();
          var data = res.data.data;
          callback({
            TmpSecretId: data.credentials && data.credentials.tmpSecretId,
            TmpSecretKey: data.credentials && data.credentials.tmpSecretKey,
            XCosSecurityToken: data.credentials && data.credentials.sessionToken,
            ExpiredTime: data.expiredTime,
          });
        }
      });
      var uploadList=[];
      fileList.map((item)=>{
        uploadList.push(
          new Promise(async(resolveItem)=>{
            var key=item;
            var isUploaded=true;
            if(item.indexOf('http://tmp/')>=0){
              isUploaded=false;
              key=item.split('http://tmp/');
              key=key[key.length-1];
            }else {
              if(item.indexOf('wxfile://tmp_')>=0){
                isUploaded=false;
                key=item.split('wxfile://tmp_');
                key=key[key.length-1];
              }
            }

            if(isUploaded){
              resolveItem(item);
            }else{
              // let result= await api.upload({fileKey:key,folderName:folderName,type:type});
              let result= await api.qcloud({fileKey:key,folderName:folderName,type:type});
              debugger;
              cos.postObject({
                Bucket: result.data.bucket,
                Region: result.data.region,
                Key: result.data.bucketKey,
                FilePath: item,
                onProgress: function (info) {
                  debugger;
                  console.log(JSON.stringify(info));
                }
              }, function (err, data) {
                resolveItem(data.Location);
                console.log(err || data);

              });
              //七牛上传
              /*qiniuUploader.upload(item, (res) => {
                resolveItem(res.imageURL);
              }, (error) => {
                console.log('error: ' + error);
                error(error);
              }, {
                region: 'SCN',
                domain: result.data.bucketDomain, // // bucket 域名，下载资源时用到。如果设置，会在 success callback 的 res 参数加上可以直接使用的 ImageURL 字段。否则需要自己拼接
                key: result.data.bucketKey,
                uptoken: result.data.token, // 由其他程序生成七牛 uptoken
              });*/
            }
          })
        )
      });
      let results=await Promise.all(uploadList);
      resolve(results);
    })

  },
  async deleteCosImages(fileList){
    var cos = new COS({
      getAuthorization: async (options, callback) =>{
        // 异步获取签名
        let res= await api.qcloudAuth();
        var data = res.data.data;
        callback({
          TmpSecretId: data.credentials && data.credentials.tmpSecretId,
          TmpSecretKey: data.credentials && data.credentials.tmpSecretKey,
          XCosSecurityToken: data.credentials && data.credentials.sessionToken,
          ExpiredTime: data.expiredTime,
        });
      }
    });
    let result= await api.qcloud({fileKey:'test',folderName:'test',type:1});
    var uploadList=[];
    fileList.map((item)=>{
      uploadList.push(
        new Promise(async(resolveItem)=>{
          cos.deleteObject({
            Bucket: result.data.bucket,
            Region: result.data.region,
            Key: '/img/work/wx0c80294f9c8c5bea.o6zAJs0IoaUXKzxVmFFAzQFfryiI.V6ajMsB36M2B81e784c5de31f48afcf330b0374a6048.jpg',
            onProgress: function (info) {
              debugger;
              console.log(JSON.stringify(info));
            }
          }, function (err, data) {
            resolveItem(data.Location);
            console.log(err || data);
          });
        })
      )
    });
    let results=await Promise.all(uploadList);
    resolve(results);
  },
  async getUserId(){
    return new Promise((resolve,reject)=>{
      let userId=wx.getStorageSync('userId');
      if(userId && userId!=''){
        resolve(userId);
      }else{
        resolve(null);
      }
    })
  },
  async setUserId(){
    let res=await this.getAuth();
    if(res){
      // let result=await gql.query({query:`query getUserId{getUserId}`});
      if(result.getUserId){
        wx.setStorageSync('userId', result.getUserId);
      }
    }
  },
  showModal(title){
    return new Promise((resolve,reject)=>{
      wx.showModal({
        title: '提示',
        content: title,
        success (res) {
          if (res.confirm) {
            resolve(true);
          } else if (res.cancel) {
            resolve(false);
          }
        }
      })
    })
  },
  message:{
    success(title){
      wx.showToast({
        title: title,
        icon: 'success',
        duration: 1500
      })
    }
  },
  getView(target){
    return new Promise((resolve,reject)=>{
      const query = wx.createSelectorQuery()
      query.select(target).boundingClientRect()
      query.selectViewport();
      query.exec(function(res){
        resolve(res);
      })
    })
  },
  showLoading(){
    wx.showLoading({
      title: '加载中...',
      mask:true
    });
  }
};

export default wechat;
