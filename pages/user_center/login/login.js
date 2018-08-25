import {Api} from '../../../utils/api.js';
var api = new Api();

import {Token} from '../../../utils/token.js';
var token = new Token();

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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  submit(){
    const self = this;
    wx.setStorageSync('login',self.data.sForm);
    const callback = (res)=>{
      if(res.data.userInfo.user_class=='customer'){
        api.pathTo('/pages/user_center/user_center','tab')
      }else{
        api.pathTo('/pages/business_center/business_center','tab')
      }
    };
    token.getToken(callback);
  },

  bindInputChange(e){
    const self = this;
    api.fillChange(e,self,'sForm');
    self.setData({
      web_sForm:self.data.sForm,
    });
  },


  check(e){
    const self = this;
    console.log(self.data.sForm);
    if(api.checkComplete(self.data.sForm)){
      self.submit();
    }else{
      api.showToast('请填写账号密码','fail')
    };

  },

   intoPath(e){
      const self = this;
      api.pathTo(api.getDataSet(e,'path'),'tab');
  },  

   intoPathRedi(e){
      const self = this;
      api.pathTo(api.getDataSet(e,'path'),'redi');
  },
})