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
    web_show:false
  },


  onLoad(){

    
  },

  onShow(){
    const self = this;
    wx.showLoading();
    const pass = api.checkLogin('customer');
    if(pass){
      self.setData({
        web_show:true
      })
    };
    
    self.getUserData();
 
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
      if(res.solely_code==200010){
        api.showToast('账号未审核','fail')
      };
      self.setData({
        web_userInfo:res,
      });
      self.getMenuData(res.passage1);
      
      wx.hideLoading();
    };
    api.userOne(postData,callback);
    
  },
  
  getMenuData(id){
    const self = this;
    const postData = {};
    postData.thirdapp_id = getApp().globalData.thirdapp_id;
    postData.menu_id = id;
    const callback = (res)=>{
       console.log(res);
      self.setData({
        web_menuData:res,
     });
      wx.hideLoading();
    };
    api.menuOne(postData,callback);
  },
  
  intoPath(e){

    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');

  },



  














 
})