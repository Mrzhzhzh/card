import { Base } from 'base.js';



class Api extends Base{


    


    realPay(param,callback){
        wx.requestPayment({
            'timeStamp': param.timeStamp,
            'nonceStr': param.nonceStr,
            'package': param.package,
            'signType': param.signType,
            'paySign': param.paySign,
            success: function () {
                wx.showToast({
                    title: '支付成功',
                    icon: 'success',
                    duration: 1000,
                    mask:true
                  });
                  
                callback && callback(1);
            },
            fail: function () {
                wx.showToast({
                    title: '支付失败',
                    icon: 'success',
                    duration: 1000,
                    mask:true
                });
                callback && callback(0);
            }
        });

    }
  


    tokenGet(param,callback) {
        var allParams = {
            url:'token/user',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.request(allParams);
    }


    articleList(param,callback) {
        var allParams = {
            url:'UserArticle/GetList',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }

    articleOne(param,callback) {
        var allParams = {
            url:'UserArticle/GetInfo',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }

    productList(param,callback) {
        var allParams = {
            url:'UserProduct/GetList',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }

    productOne(param,callback) {
        var allParams = {
            url:'UserProduct/GetInfo',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }

    productSort(param,callback) {
        var allParams = {
            url:'UserProduct/ProductSort',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }

    menuTree(param,callback) {
        var allParams = {
            url:'UserMenu/GetTree',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }

    menuOne(param,callback) {
        var allParams = {
            url:'UserMenu/GetInfo',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }

    orderAdd(param,callback) {
        var allParams = {
            url:'AddOrder',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }

    

    orderList(param,callback) {
        var allParams = {
            url:'getUserOrder',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }

    orderOne(param,callback) {
        var allParams = {
            url:'getOrder',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }

    orderCancel(param,callback) {
        var allParams = {
            url:'CancelOrder',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }

    orderDel(param,callback) {
        var allParams = {
            url:'DeleteOrder',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }

    orderReceive(param,callback) {
        var allParams = {
            url:'ReceiveOrder',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }

    orderReceiveList(param,callback) {
        var allParams = {
            url:'getReceiveOrder',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }


    addressAdd(param,callback) {
        var allParams = {
            url:'AddAddress',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }

    addressEdit(param,callback) {
        var allParams = {
            url:'EditAddress',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }

    addressDel(param,callback) {
        var allParams = {
            url:'DelAddress',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }

    addressList(param,callback) {
        var allParams = {
            url:'getUserAddress',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }

    addressSet(param,callback) {
        var allParams = {
            url:'SetAddress',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }

    addressDefault(param,callback) {
        var allParams = {
            url:'getDefaultAddress',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }

    themeList(param,callback) {
        var allParams = {
            url:'UserContent/GetList',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }

    themeOne(param,callback) {
        var allParams = {
            url:'UserContent/GetInfo',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }

    themeNum(param,callback) {
        var allParams = {
            url:'UserContent/GetHomeTheme',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }


    userEdit(param,callback) {
        var allParams = {
            url:'User/EditUser',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }

    userOne(param,callback) {
        var allParams = {
            url:'User/getUser',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }




    payPre(param,callback) {
        var allParams = {
            url:'pay/pre_order',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }

    UserQRcodeOne(param,callback) {
        var allParams = {
            url:'UserQRcode/GetCode',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }

    memberLogin(param,callback) {
        var allParams = {
            url:'UserMember/getInfo',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }

    themeOriOne(param,callback) {
        var allParams = {
            url:'UserTheme/GetInfo',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }

    checkPhone(param,callback) {
        var allParams = {
            url:'User/checkPhone',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }

    categoryTree(param,callback) {
        var allParams = {
            url:'UserCategory/GetTree',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }

    scoreList(param,callback) {
        var allParams = {
            url:'UserFlowScore/GetList',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }

    productfList(param,callback) {
        var allParams = {
            url:'UserProduct/GetSortList',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }

    isSign(param,callback) {
        var allParams = {
            url:'User/Signin',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }

    userEditGxyd(param,callback) {
        var allParams = {
            url:'GuoxingydUser/EditUser',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }

    messageAdd(param,callback) {
        var allParams = {
            url:'UserMessage/addMessage',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }


    remarkAdd(param,callback) {
        var allParams = {
            url:'UserRemark/add',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }


    remarkList(param,callback) {
        var allParams = {
            url:'UserRemark/getList',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }

    couponList(param,callback) {
        var allParams = {
            url:'CouponInfo/GetList',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }

    couponOne(param,callback) {
        var allParams = {
            url:'CouponInfo/GetInfo',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }

    userCouponReceive(param,callback) {
        var allParams = {
            url:'UserCoupon/Receive',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }

    userCouponList(param,callback) {
        var allParams = {
            url:'UserCoupon/GetList',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }

    userCouponOne(param,callback) {
        var allParams = {
            url:'UserCoupon/GetInfo',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }

    bpGetDiscount(param,callback) {
        var allParams = {
            url:'Jifensc/GetDiscount',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }


    checkPhoneCallback(callback) {
        const api = this;
        const param = {};
        param.token = wx.getStorageSync('token');
        var allParams = {
            url:'User/checkPhone',
            type:'post',
            data:param,
            sCallback: function(data){
                console.log(data)
                if(data == true){
                    callback&&callback(data);
                }else{
                    api.showToast('请补全信息','fail');
                    api.pathTo('/pages/mine/personal_data/personal_data','nav');
                }
                
            }
        };
        api.request(allParams)
    }


    passwordChange(param,callback) {
        var allParams = {
            url:'User/ChangePassword',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }

    scanUser(param,callback) {
        var allParams = {
            url:'User/ScanUser',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }

    payCusomer(param,callback) {
        var allParams = {
            url:'UserFlowScore/PayCusomer',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }

    chargeMerchant(param,callback) {
        var allParams = {
            url:'UserFlowScore/ChargeMerchant',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.request(allParams)
    }







}

export {Api};