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
      
    },
    searchChange:{
      pay_user:wx.getStorageSync('token')
    },

  },


  onLoad: function (options) {


    const self = this;
    const res = api.checkLogin('customer');
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
    postData.searchItem = api.extend(postData.searchItem,self.data.searchChange)
    const callback = (res)=>{
      console.log(res);
      self.setData({ 
        score:res.user_score
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

  changeSearch(e){

    const self = this;
    self.data.searchChange = {};
    const key = api.getDataSet(e,'key');
    if(key!='clear'){
      self.data.searchChange[key] = api.getDataSet(e,'value');
    }else{
      self.data.searchChange.pay_user = wx.getStorageSync('token');
    }
    self.setData({
      web_searchChange:self.data.searchChange
    });
    self.getMainData(true);

  },

  

})