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
      charge_user:wx.getStorageSync('token')
    },
  },


  onPullDownRefresh:function(){
    const self = this;
    wx.showNavigationBarLoading(); //在标题栏中显示加载
    delete self.data.searchItem.start_time;
    delete self.data.searchItem.end_time;
    self.setData({
      start_time:'',
      end_time:'',
    });
    self.getMainData(true);

  },

  onLoad: function (options) {


    const self = this;
    console.log(options);
    self.setData({
      web_username:options.username
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
        score:res.user_score
      });
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
      
      wx.hideLoading();
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading();
      self.setData({
        web_mainData:self.data.mainData,
      });
    };
    api.scoreList(postData,callback);

  },

  changeBind(e){
    const self = this;
    const key = api.getDataSet(e,'key');
    self.setData({
      [key]:e.detail.value,
    });
    self.data.searchItem[key] = api.timeToTimestamp(e.detail.value);
    self.getMainData(true);
    console.log(self.data.searchItem)
  },

  

  
})