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
    api.logOff();
  },

  scanCode(){ 
    wx.scanCode({
    onlyFromCamera: true,
      success: (res) => {
        console.log(res)
      api.pathTo(res.path,'nav');
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