// 引用使用es6的module引入和定义
// 全局变量以g_开头
// 私有函数以_开头


class Token {

    constructor() {

    }

    verify() {

        var token = wx.getStorageSync('token');
        if (!token) {
            this.getUserInfo();
        };
            
    }

    _veirfyFromServer(token) {

        var that = this;
        wx.request({
            url: that.verifyUrl,
            method: 'POST',
            data: {
                token: token
            },
            success: function (res) {
                var valid = res.data.isValid;
                if(!valid){
                    //that.getTokenFromServer();
                }
            }
        });

    }

    getUserInfo(params,callback){

        var self = this;
        var wxUserInfo = {};
        if(wx.canIUse('button.open-type.getUserInfo')){
            wx.getSetting({
                success: res => {
                    if (res.authSetting['scope.userInfo']) { 
                        wx.getUserInfo({
                            success: function(res) {
                                 
                                wxUserInfo = res.userInfo;
                                self.getTokenFromServer(wxUserInfo,params,callback);
                            }
                        });
                    }else{
                        self.getTokenFromServer(wxUserInfo,params,callback);
                    }
                },
                fail: res=>{
                    wx.showToast({
                        title:'拉取微信失败',
                        icon:'fail',
                        duration:2000,
                        mask:true
                    })
                }
            });
        }else{
            wx.getUserInfo({
                success: function(res) {
                    wxUserInfo = res.userInfo;
                    self.getTokenFromServer(wxUserInfo,params,callback);   
                }
            });
        };
        
    }

    getTokenFromServer(data,params,callback) {
        var self  = this;

        wx.login({
            success: function (res) {
                var postData = {};
                postData.thirdapp_id = getApp().globalData.thirdapp_id;
                postData.code = res.code;
                if(data.nickName&&data.avatarUrl){
                    postData.nickname = data.nickName;
                    postData.headimgurl = data.avatarUrl;
                };
                if(wx.getStorageSync('openidP')){
                    postData.openid = wx.getStorageSync('openidP');
                };
                postData.headimgurl = data.avatarUrl;
                wx.request({
                    url: 'https://solelynet.com/public/index.php/api/v1/token/user',
                    method:'POST',
                    data:postData,
                    success:function(res){
                        if(res.data&&res.data.token){
                            wx.setStorageSync('token', res.data.token);
                            wx.setStorageSync('openid', res.data.openid);
                            if(params&&callback){
                                params.data.token = res.data.token;
                                callback && callback(params);
                            };
                            
                        }else{

                            wx.showToast({
                                title: '获取token失败',
                                icon: 'fail',
                                duration: 1000,
                                mask:true
                            })
                        }
                        
                        
                    }
                })
                
            }
        })
        
    }



    getToken(callback,params){
        if(wx.getStorageSync('login').username&&wx.getStorageSync('login').password){
            var postData = {
                username:wx.getStorageSync('login').username,
                password:wx.getStorageSync('login').password,
            }
            wx.request({
                url: 'https://www.yj-member.com/api/public/index.php/api/v1/User/Login',
                method:'POST',
                data:postData,
                success:function(res){
                    if(res.data&&res.data.token){
                        wx.setStorageSync('token', res.data.token);
                        var login = wx.getStorageSync('login');
                        login.userType = res.data.userInfo.user_class;
                        wx.setStorageSync('login',login);

                        if(params&&callback){
                            params.data.token = res.data.token;
                            callback && callback(params);
                        }else if(callback){
                            callback && callback(res);
                        };
                        
                    }else{
                        wx.showToast({
                            title: res.data.msg,
                            icon: 'fail',
                            duration: 1000,
                            mask:true
                        });
                        wx.removeStorageSync('token');
                        wx.removeStorageSync('login');
                        wx.redirectTo({
                            url:'/pages/user_center/login/login'
                        })
                    }
                    
                    
                }
            })
        }else{
            wx.redirectTo({
              url: '/pages/user_center/login/login'
            });
        };
        

    }
}

export {Token};