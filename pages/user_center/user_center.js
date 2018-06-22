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
    api.checkLogin('customer');
    

    self.getUserData();
 
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