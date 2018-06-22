import {Api} from '../../../utils/api.js';
const api = new Api();
// pages/business_center/modify_password/modify_password.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sForm:{
      o_password:'',
      n_password:'',
      c_password:'',
      
    },
  
  },

  checkPhone(){

    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    const callback=(res)=>{
      console.log(res);
      if(res == true){
        const pass = api.checkComplete(self.data.sForm);
        if(pass){
          self.passwordChange(); 
        }else{
          wx.hideLoading();
          api.showToast('请补全信息','fail');
        };
      }
    }
    api.checkPhone(postData,callback);

  },


  removeStorageSync(){

    const self = this;
    wx.removeStorageSync('login');
      if(!wx.removeStorageSync('login')){
        api.pathTo('/pages/user_center/login/login','redi')
      };

  },


  passwordChange(){
    const self = this;
    const postData = api.cloneForm(self.data.sForm);
    postData.token = wx.getStorageSync('token');
    const callback = (res) => { 
      wx.hideLoading();
      api.dealRes(res);
       
    }
    api.passwordChange(postData,callback)
  },


  changeBind(e){
    const self = this;
    api.fillChange(e,self,'sForm');
  },


  submit(){
    const self = this;
    wx.showLoading();
    self.checkPhone();
  },

})