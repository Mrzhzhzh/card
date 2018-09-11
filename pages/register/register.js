// pages/teacher/data.js
import {Api} from '../../utils/api.js';
const api = new Api();

Page({
  data: {
    sForm:{
      username:'',
      phone:'',
      cardID:'',
      password:''   
    },
    mainData:[],
    isShow:false

  },


  onLoad(){
    const self = this;

  },


  changeBind(e){
    const self = this;
    api.fillChange(e,self,'sForm');
    console.log(self.data.sForm);
    self.setData({
      web_sForm:self.data.sForm,
    });    
  },


  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },
  

  userRegister(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    postData.thirdapp_id = 1;
    postData.username = self.data.sForm.username;
    postData.phone = self.data.sForm.phone;
    postData.cardID = self.data.sForm.cardID;
    postData.password = self.data.sForm.password;
    const callback = (data)=>{
      if(data.solely_code==100000){ 
        self.show()
      }else if(data.solely_code==205011){
        api.showToast('用户名或手机号重复','none')
      }
      wx.hideLoading();
    };
    api.userRegister(postData,callback);
  },


  show(){
    const self = this;
    if(self.data.isShow == false){
      self.setData({
        isShow:true
      })
    }else{
      self.setData({
        isShow:false
      })
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
          self.userRegister();
        }
      }
    }else{
      api.showToast('请补全信息','fail');
    };
  },
  
})