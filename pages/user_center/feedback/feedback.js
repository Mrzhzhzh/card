import {Api} from '../../../utils/api.js';
const api = new Api();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sForm:{
      phone:'',
      content:'',
      passage1:'意见反馈',
      
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
          self.addMessage();
          api.pathTo('/pages/user_center/user_center','tab');  
        }else{
          wx.hideLoading();
          api.showToast('请补全信息','fail');
        };
        
        
      }
    }
    api.checkPhone(postData,callback);

  },

  addMessage(){
    const self = this;
    const postData = api.cloneForm(self.data.sForm);
    postData.token = wx.getStorageSync('token');
    postData.thirdapp_id = getApp().globalData.thirdapp_id;
    const callback = (res)=>{
      wx.hideLoading();
      api.dealRes(res);
    };
    api.messageAdd(postData,callback);

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