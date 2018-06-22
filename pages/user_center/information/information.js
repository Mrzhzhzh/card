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
    self.data.id = options.id;
    
    self.getMainData();
  
  },

  getMainData(){
    const self = this;
    const postData = {};
    postData.thirdapp_id = getApp().globalData.thirdapp_id;
    postData.id = 4; 
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
          title:'该文章已被删除',
          icon:'fail',
          duration:1000,
          mask:true
        })
      }
    };
    api.articleOne(postData,callback);
  }
})