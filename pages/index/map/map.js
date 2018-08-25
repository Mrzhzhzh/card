//logs.js
import {Api} from '../../../utils/api.js';
var api = new Api();


Page({
  data: {
    mainData:[]
  },


 onLoad:function (options) {
    const self = this;
    self.data.id = options.id;
    
    self.getMainData();
  
  },

  getMainData(){
    const self = this;
    const postData = {};
    postData.thirdapp_id = getApp().globalData.thirdapp_id;
    postData.id = self.data.id; 
    const callback =(data)=>{
      wx.hideLoading();
      console.log(data);
      if(data){
        self.data.mainData = data;
        self.data.mainData.content = api.wxParseReturn(data.article_content.content).nodes;
        console.log(self.data.mainData)
        self.setData({
          web_mainData:self.data.mainData,
        });
      }else{
        wx.showToast({
          title:'该门店已被删除',
          icon:'fail',
          duration:1000,
          mask:true
        })
      }
    };
    api.articleOne(postData,callback);
  },


  map(e) {
    const self = this;
    wx.openLocation({
      latitude: parseFloat(self.data.mainData.latitude),
      longitude: parseFloat(self.data.mainData.longitude),
      height:100,
      scale: 18,
      name: self.data.mainData.title,
      address:self.data.mainData.description
    })
  },

})
