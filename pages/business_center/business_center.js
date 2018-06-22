import {Api} from '../../utils/api.js';
var api = new Api();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sForm:{
      username:'',
      password:''
    }
  
  },
    

  onLoad(){
    

  },

  onShow(){
    const self = this;
    api.checkLogin('merchant');
    self.getUserData()
  },

  intoPath(e){

    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');

  },

 

  removeStorageSync(){
    const self = this;
    wx.removeStorageSync('login');
      if(!wx.removeStorageSync('login')){
        api.pathTo('/pages/user_center/login/login','redi')
      };
  },

  scanCode(){ 
    wx.scanCode({
    onlyFromCamera: true,
      success: (res) => {
      console.log(res)
     }
   })
  },
  
  getUserData(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    const callback = (res)=>{
       console.log(res);
      self.setData({
        web_userInfo:res,
      });
      wx.hideLoading();
    };
    api.userOne(postData,callback);
  },

})