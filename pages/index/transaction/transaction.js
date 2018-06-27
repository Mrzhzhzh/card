import {Api} from '../../../utils/api.js';
const api = new Api();


Page({
  data: {
    sForm:{
      score:'',
    },
    userInfo:{},
    userInfoById:{},
    
  },
  
  onLoad(options){
    const self = this;
    const pass = api.checkLogin();
    if(pass){
      
      self.getUserData();
      
      if(options.scene&&decodeURIComponent(options.scene)){
        self.getUserDataById(decodeURIComponent(options.scene));
      }else if(options.id){
        self.getUserDataById(options.id);
      }else{
        const func = ()=>{
          setTimeout(function(){
            wx.switchTab({
              url: '/pages/index/index'
            });
          },1000);
        };
        api.showToast('二维码失效','fail',func);
      };
      
    }
    
  },


  getUserDataById(id){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    postData.id = id;
    const callback = (res)=>{
      if(res.user_class==wx.getStorageSync('login').userType){
        const toastCallback = (res)=>{
          setTimeout(function(){
            wx.switchTab({
              url: '/pages/index/index'
            });
          },500);
        }
        api.showToast('无效用户','fail',toastCallback);
      }else{
        self.data.userInfoById = res;
        self.setData({
          web_userInfoById:self.data.userInfoById,
        });
        wx.hideLoading();
      }
      
    };
    api.scanUser(postData,callback);
  },

  getUserData(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    const callback = (res)=>{

      self.data.userInfo = res;
      self.setData({
        web_userInfo:self.data.userInfo,
      });
      wx.hideLoading();
    };
    api.userOne(postData,callback);
  },



  fillChange(e){
    const self = this;
    api.fillChange(e,self,'sForm');
  },

  pay(funcName){
    const self = this;
    const postData = api.cloneForm(self.data.sForm);
    postData.token = wx.getStorageSync('token');
    postData.id = self.data.userInfoById.id;
    const callback = (res)=>{
      const pass = api.dealRes(res);
      if(pass){
        setTimeout(function(){
           api.pathTo('/pages/index/index','tab');
        },800)
      }
    };
    api[funcName](postData,callback);
  },



  submit(){
    const self = this;
    const pass = api.checkComplete(self.data.sForm);
    if(pass){
      if(self.data.userInfo.user_class=='merchant'){
        self.pay('chargeMerchant');
      }else if(self.data.userInfo.user_class=='customer'){
        self.pay('payCusomer');
      }
    }else{
      api.showToast('请补全信息','fail')
    }
  }


  
  
})
