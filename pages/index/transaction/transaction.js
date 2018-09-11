import {Api} from '../../../utils/api.js';
const api = new Api();


Page({
  data: {
    sForm:{
      score:'',
    },
    userInfo:{},
    userInfoById:{},
    isShow:false
    
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
    self.setData({
      web_score:self.data.sForm.score
    })
  },

  pay(funcName){
    const self = this;
    const postData = api.cloneForm(self.data.sForm);
    postData.token = wx.getStorageSync('token');
    postData.id = self.data.userInfoById.id;
    const callback = (res)=>{
      if(res&&res.solely_code==100000){
          setTimeout(function(){
            self.setData({
              buttonClicked: false
            });
            self.buttonClicked = false;
          }, 1000)
          setTimeout(function(){
            self.show()
          },1000);         
        }; 
    };
    api[funcName](postData,callback);
  },



  submit(){
    const self = this;
    if(self.buttonClicked){
      return;
    };
    self.buttonClicked = true;
    self.setData({
      buttonClicked: true
    });
    const pass = api.checkComplete(self.data.sForm);
    if(pass){
      if(self.data.userInfo.user_class=='merchant'){
        self.pay('chargeMerchant');
        setTimeout(function(){
            self.setData({
              buttonClicked: false
            });
            self.buttonClicked = false;
          }, 1000)  
      }else if(self.data.userInfo.user_class=='customer'){
        self.pay('payCusomer');
        setTimeout(function(){
            self.setData({
              buttonClicked: false
            });
            self.buttonClicked = false;
          }, 1000)  
      }
    }else{
      api.showToast('请补全信息','fail');
      setTimeout(function(){
            self.setData({
              buttonClicked: false
            });
            self.buttonClicked = false;
          }, 1000)  
    }
  },

  show(){
    const self = this;
    if(self.data.isShow == false){
      self.setData({
        isShow:true
      })
    }else{
      wx.navigateBack({
        delta: 1
      });
      /*self.setData({
        isShow:false
      })*/
    }
  },


  
  
})
