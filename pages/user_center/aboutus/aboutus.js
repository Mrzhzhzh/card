import {Api} from '../../../utils/api.js';
const api = new Api();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
  },
  

   onLoad:function (options) {
    const self = this;
    console.log(options);
    if(options.type=='article'){
      self.data.id = options.id;
      self.getMainData();
      wx.setNavigationBarTitle({
        title: '关于我们'
      })
    }else if(options.type=='menu'){
      self.data.id = options.id;
      self.getMenuData();
      wx.setNavigationBarTitle({
        title: '会员卡信息'
      })
    }else{
      api.showToast('参数有误','fail')
    }
    
  },

  getMainData(){
    const self = this;
    const postData = {};
    postData.thirdapp_id = getApp().globalData.thirdapp_id;
    postData.id = self.data.id; 
    const callback =(res)=>{
      wx.hideLoading();
      console.log(res);
      if(res){
        self.data.mainData = res;
        self.data.mainData.content = api.wxParseReturn(res.article_content.content).nodes;
        console.log(self.data.mainData)
        self.setData({
          web_mainData:self.data.mainData,
        });
      }else{
        wx.showToast({
          title:'该文章已被删除',
          icon:'fail',
          duration:1000,
          mask:true
        })
      }
    };
    api.articleOne(postData,callback);
  },

  getMenuData(){
    const self = this;
    const postData = {};
    postData.thirdapp_id = getApp().globalData.thirdapp_id;
    postData.menu_id = self.data.id; 
    const callback =(res)=>{
      wx.hideLoading();
      console.log(res);
      if(res){
        self.data.mainData = res;
        self.data.mainData.content = api.wxParseReturn(res.description).nodes;
        self.data.mainData.img = res.banner;
        self.data.mainData.title = res.name;
        console.log(self.data.mainData)
        self.setData({
          web_mainData:self.data.mainData,
        });
      }else{
        wx.showToast({
          title:'该会员卡已被删除',
          icon:'fail',
          duration:1000,
          mask:true
        })
      }
    };
    api.menuOne(postData,callback);
  },


})