// pages/teacher/data.js
import {Api} from '../../../utils/api.js';
const api = new Api();

Page({
  data: {
    sForm:{
      name:'',
      phone:'',
      idCard:'',
      address:'',
      passage2:''
    
    },
    mainData:[],
    web_show:false

  },


  onLoad(){
    const self = this;
    const pass = api.checkLogin('merchant');
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
      self.data.mainData = res;

      self.setData({
        web_sForm:self.data.sForm,
        web_mainData:self.data.mainData
      });
      wx.hideLoading();
    };
    api.userOne(postData,callback);
  },


/*  changeBind(e){
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
  

  userInfoUpdate(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    postData.data = {};
    postData.data = api.cloneForm(self.data.sForm);
    const callback = (data)=>{
      wx.hideLoading();
      api.dealRes(data);
    };
    api.userInfoUpdate(postData,callback);
  },


  userInfoAdd(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    postData.data = {};
    postData.data = api.cloneForm(self.data.sForm);
    const callback = (data)=>{
      wx.hideLoading();
      api.dealRes(data);
    };
    api.userInfoAdd(postData,callback);
  },


  submit(){
    const self = this;
    var phone = self.data.sForm.phone;
    var idCard = self.data.sForm.idCard;
    const pass = api.checkComplete(self.data.sForm);
    if(pass){
      if(!idCard || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(idCard)){
        api.showToast('身份证格式错误','fail')
      }else{
        if(phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)){
          api.showToast('手机格式错误','fail')
        }else{
          if(JSON.stringify(wx.getStorageSync('info').info)=='[]'){
            wx.showLoading();
            self.userInfoAdd();
          }else{
            wx.showLoading();
            self.userInfoUpdate();
          }
            setTimeout(function(){
            api.pathTo('/pages/teacher/teacher','tab')
          },1000);  
        }
      }
    }else{
      api.showToast('请补全信息','fail');
    };
  },*/
  
})