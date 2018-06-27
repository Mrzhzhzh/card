import {Api} from '../../../utils/api.js';

const api = new Api();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainData:[],
    isLoadAll:false,
    searchItem:{
      ischeck:'true'
    },
  },

  onLoad: function (options) {
    const self = this;

    self.setData({
      web_userName:options.username
    })
    self.setData({
      web_userscore:options.score
    })
    const res = api.checkLogin('merchant');
    if(res){
      wx.showLoading();
      self.data.paginate = api.cloneForm(getApp().globalData.paginate);
      self.getMainData();
    };
    

  },

  onReachBottom() {

    const self = this;
    if(!self.data.isLoadAll){
      self.data.paginate.currentPage++;
      self.getMainData();
    };

  },

  getMainData(isNew){

    const self = this;
    if(isNew){
      api.clearPageIndex(self);
    };
    const postData = self.data.paginate;
    postData.token = wx.getStorageSync('token');
    postData.searchItem = api.cloneForm(self.data.searchItem);
    const callback = (res)=>{
      console.log(res);
      self.setData({ 
        score:res.score
      });
      if(res.data.length>0){
        self.data.mainData.push.apply(self.data.mainData,res.data);    
      }else{
        wx.showToast({
          title:'没有更多了',
          icon:'fail',
          duration:1000,
          mask:true
        });

      };
      wx.hideLoading();
      self.setData({
        web_mainData:self.data.mainData,
      });
    };
    api.scoreList(postData,callback);

  },

  

  
})