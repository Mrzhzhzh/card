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
    },
    web_show:false,
  
  },
    

  onLoad(){
    wx.showLoading();

  },


  onShow(){
    const self = this;
    api.checkLogin('merchant');
    self.setData({
      web_show:true
    })
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
    success: (res) => {
      var surl = '/'+res.path;
      console.log(surl)
      wx.navigateTo({
        url:surl
      })
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