// pages/teacher/data.js
import {Api} from '../../utils/api.js';
const api = new Api();

Page({
  data: {
    sForm:{
      username:'',
      phone:'',
      id_num:'',
      password:''   
    },
    mainData:[],

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
    postData.username = self.data.sForm.username
    postData.phone = self.data.sForm.phone;
    postData.id_num = self.data.sForm.id_num;
    postData.password = self.data.sForm.password;
    const callback = (data)=>{
      wx.hideLoading();
      api.dealRes(data);
    };
    api.userRegister(postData,callback);
  },





  submit(){
    const self = this;
    var phone = self.data.sForm.phone;
    var id_num = self.data.sForm.id_num;
    const pass = api.checkComplete(self.data.sForm);
    if(pass){
      if(!id_num || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(id_num)){
        api.showToast('身份证格式错误','fail')
      }else{
        if(phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)){
          api.showToast('手机格式错误','fail')
        }else{
            self.userRegister();
            setTimeout(function(){
              api.pathTo('/pages/user_center/login/login','redi')
          },1000);  
        }
      }
    }else{
      api.showToast('请补全信息','fail');
    };
  },
  
})