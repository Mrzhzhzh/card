import {Api} from '../../../utils/api.js';
var api = new Api();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
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

  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },

  calling() {
    const self = this;
    var phone = self.data.mainData.contactPhone;
    wx.makePhoneCall({
        phoneNumber: phone,
        success: function () {
            console.log("拨打电话成功！")
        },
        fail: function () {
            console.log("拨打电话失败！")
        }
    })
  }



})