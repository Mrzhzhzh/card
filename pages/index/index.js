//index.js
//获取应用实例
import {Api} from '../../utils/api.js';
const api = new Api();

Page({

  data: {

    mainData:[],
    menuData:[],
    searchItem:{
      thirdapp_id:getApp().globalData.thirdapp_id,
      pmenu_id:1
    },
    isLoadAll:false,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000
  },
  

  onLoad(){

    const self = this;
    self.data.paginate = api.cloneForm(getApp().globalData.paginate);
    self.getMenuData();
    self.getMainData();
    self.getSliderData();

  },

  onReachBottom() {

    const self = this;
    if(!self.data.isLoadAll){
      self.data.paginate.currentPage++;
      self.getMainData();
    };

  },

  onPullDownRefresh:function(){
    const self = this;
    wx.showNavigationBarLoading(); //在标题栏中显示加载
    self.data.searchItem = {
      thirdapp_id:getApp().globalData.thirdapp_id,

    };
    self.setData({
      area_id:'',
      menu_id:''
    });
    self.data.searchItem = {
      thirdapp_id:getApp().globalData.thirdapp_id,
      pmenu_id:1
    },
    self.getMainData(true);

  },

  


  getMenuData(){

    const self = this;
    const postData = {};
    postData.thirdapp_id = getApp().globalData.thirdapp_id;
    postData.searchItem = {
      parentid:8
    };
    const callback = (res)=>{
      console.log(res);
      if(res.length>0){
        self.data.menuData.push.apply(self.data.menuData,res);
        self.setData({
          web_menuData:self.data.menuData,
        });
      }else{
        api.showToast('没有类别','fail');
      };
    };
    api.menuTree(postData,callback);

  },

  getSliderData(){

        const self = this;
        const postData = {};
        postData.thirdapp_id = getApp().globalData.thirdapp_id;
        postData.searchItem = {
          parentid:6
        };
        const callback = (res)=>{
          console.log(res);
          self.setData({
            sliderData:res,
          });
          wx.hideLoading();
        };
        api.menuTree(postData,callback);

    },




  getMainData(isNew){
    const self = this;
    if(isNew){
      api.clearPageIndex(self);
    };
    const postData = api.cloneForm(self.data.paginate);
    postData.searchItem = api.cloneForm(self.data.searchItem);
    const callback = (res)=>{
      if(res.data.length>0){
        self.data.mainData.push.apply(self.data.mainData,res.data);
      }else{
        self.data.isLoadAll = true;
        api.showToast('没有更多了','fail');
      };
      self.setData({
        web_mainData:self.data.mainData,
      });

      setTimeout(function()
      {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      },500);
      
    };
    api.articleList(postData,callback);
  },


  intoPath(e){

    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');

  },


  pickerChange(e){

    const self = this;
    delete self.data.searchItem.pmenu_id;
    self.data.searchItem[api.getDataSet(e,'type')] = self.data.menuData[api.getDataSet(e,'index')]['child'][e.detail.value].id;
    self.getMainData(true);
    self.setData({
      [api.getDataSet(e,'type')]:e.detail.value
    });

  },


  
})
