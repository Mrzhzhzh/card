import {Api} from '../../utils/api.js';
const api = new Api();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    key:'false',
    searchItem:{
      isread:'false'
    },
    mainData:[],


  },




  onLoad(){
    const self = this;
    
    wx.showLoading();
    self.data.paginate = api.cloneForm(getApp().globalData.paginate);
    self.getMainData();

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
      self.setData({
        web_mainData:self.data.mainData
      })
    };
    const postData =  api.cloneForm(self.data.paginate);
    postData.token = wx.getStorageSync('token');
    postData.searchItem = api.cloneForm(self.data.searchItem);
    const callback = (res)=>{
      console.log(res);
      if(res.data.length>0){
        self.data.mainData.push.apply(self.data.mainData,res.data);
      }else{
        self.data.isLoadAll = true;
        wx.showToast({
          title:'没有更多了',
          icon:'fail',
          duration:1000,
          mask:true
        });
      };
      wx.hideLoading();;
      self.setData({
        web_mainData:self.data.mainData,
      });
    };
    api.getNoticeList(postData,callback);
  },

  menuClick: function (e) {
    const self = this;
    const key = e.currentTarget.dataset.key;
    self.changeSearch(key);
  },

  changeSearch(key){
    const self = this;
    this.setData({
      key: key
    });
    self.data.searchItem.isread = key;
    self.setData({
      web_mainData:[],
    });
    self.getMainData(true);
  },

  

})