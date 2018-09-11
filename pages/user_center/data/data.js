// pages/teacher/data.js
import {Api} from '../../../utils/api.js';
const api = new Api();

Page({
  data: {
    sForm:{
      phone:'',
      cardID:'',
      area:'',
      username:'',
      email:''
    },
    mainData:[],
    web_show:false

  },


  onLoad(){
    const self = this;
    const pass = api.checkLogin('customer');
      if(pass){
        self.setData({
          web_show:true
        })
    };
    self.getMainData();
  },


  getMainData(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    const callback = (res)=>{
      console.log(res)
      if(res.solely_code==200010){
        api.showToast('账号未审核,不能使用','none')
      };
      self.data.mainData = res;
      self.data.sForm.username = self.data.mainData.username,
      self.data.sForm.phone = self.data.mainData.phone,
      self.data.sForm.cardID = self.data.mainData.cardID,
      self.data.sForm.email = self.data.mainData.email,
      self.data.sForm.area = self.data.mainData.area,
      self.setData({
        web_sForm:self.data.sForm,
        web_mainData:self.data.mainData
      });

      wx.hideLoading();
    };
    api.userOne(postData,callback);
  },

  edit(user){
    const self = this;
    const postData = api.cloneForm(self.data.sForm);
    postData.nickname = user.nickName;
    postData.headimgurl = user.avatarUrl;
    postData.openid = user.avatarUrl
    postData.token = wx.getStorageSync('token');
    const callback = (data)=>{
      wx.hideLoading();
      api.dealRes(data);
    };
    api.userEdit(postData,callback);
  },


  changeBind(e){
    const self = this;
    api.fillChange(e,self,'sForm');
    self.setData({
      web_sForm:self.data.sForm,
    });  
    console.log(self.data.sForm)    
  },


  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },

  switch2Change: function (e){
    const self = this;
    console.log(e.detail.value)
    if( e.detail.value == true){
      self.data.sForm.bind_wechat = 'true'
    }else{
      self.data.sForm.bind_wechat = 'false'
    } 
  },
  



  submit(){
    const self = this;
    var phone = self.data.sForm.phone;
    var cardID = self.data.sForm.cardID;
    const pass = api.checkComplete(self.data.sForm);
    if(pass){
      if(!cardID || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(cardID)){
        api.showToast('身份证格式错误','fail')
      }else{
        if(phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)){
          api.showToast('手机格式错误','fail')
        }else{
          const callback = (user,res) =>{
            self.edit(user);
          };
          api.getAuthSetting(callback);
          setTimeout(function(){
            if(wx.getStorageSync('login').userType=='customer'){
              api.pathTo('/pages/user_center/user_center','tab')
            }else{
              api.pathTo('/pages/business_center/business_center','tab')
            }
          },1000);  
        }
      }
    }else{
      api.showToast('请补全信息','fail');
    };
  },
  
})