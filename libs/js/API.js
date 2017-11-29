/**
 * Created by Administrator on 2017/11/26.
 */
import  axios from 'axios';
import {sellerApp} from '../../res/js/init'
import {alert} from './Util';

import  md5Hex  from 'md5-hex';
import {requestConfig} from '../../libs/js/request';

var baseUrlConfigCommon = '/common/';
var baseUrlConfigCate = '/cate/';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    sellerApp.showIndicator()
    return config;
}, function (error) {
    alert(error)
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    console.log('======>接口地址',response.request.responseURL)
    console.log('======>返回数据',response.data)
    if(response.data.code >300){
        sellerApp.hideIndicator();
        alert(response.data.msg)
        return Promise.reject(response.data);
    }
    sellerApp.hideIndicator();
    return response;
}, function (error) {
    alert(error)
    return Promise.reject(error);
});

//登录
export function login(data){
    data.password = md5Hex (data.password).toUpperCase();
    const promise = new Promise(function(resolve, reject){
        axios(baseUrlConfigCommon+'merchant_shop_user_login',requestConfig(data,'post'))
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            });
    });
    return promise;
};

//获取店铺列表
export function get_shop_list(data){
    //回到页面没有重新引入util,所以要手动更新
    if(localStorage.lang){
        var  lang = localStorage.lang == 'CH'? 'zh_CN' : 'en_US';
    }else{
        var lang  =  navigator.language == 'zh-CN' ? 'zh_CN' : 'en_US';
    }

    var token = localStorage.jwt;

    var config = requestConfig(data,'post',token);
    config.headers.language = lang
    console.log('店铺列请求',config);
    const promise = new Promise(function(resolve, reject){
        axios(baseUrlConfigCommon+'shop/get_shops_list',config)
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            });
    });
    return promise;
};

/*var status = {
    waitOrder:'S_WAITRECEIVE', //'待结单'
    waitPay:'S_WAITINVOIC',  //'待结账'
    ing:'S_ING', //进行中
    complete: 'S_COMPLETE', //'已完成'
    cancel:'S_CANCLE'//已取消

}*/

/*
获取订单列表
* @parm
* orderType:订单类型
*     TAKEAWAY: 外卖;
*     MEAL: 点餐
*     BOOKING: 订座;
*
* */
export function get_order(orderType,data){
    //设置默认值
     data.status ? data.status = data.status :  data.status = 'S_WAITRECEIVE'
     data.start ? data.start = data.start : data.start = 0;
     data.limit ? data.limit = data.limit : data.limit = 10;

    var token = localStorage.jwt;
    var address ;
    switch(orderType)
    {
        case 'TAKEAWAY':
            address =  'takeOutOrder/byShop'
            break;
        case 'MEAL':
            address =  'mealOrder/byShop4Web'
            break;
        case 'BOOKING':
            address = 'bookingOrder/byShop'
            break;
        default:
    };
    const promise = new Promise(function(resolve, reject){
        axios(baseUrlConfigCate+address,requestConfig(data,'get',token))
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            });
    });
    return promise;
};

//获取验证码
export function get_SMScode(data){
    data.type = 'T_CHANGE_PWD';
    const promise = new Promise(function(resolve, reject){
        axios(baseUrlConfigCommon+'smsCode',requestConfig(data,'post'))
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function (error) {
               // reject(error);
            });
    });
    return promise;
};

//获取验证码
export function reset_password(data){
    data.type = 'T_CHANGE_PWD';
    const promise = new Promise(function(resolve, reject){
        axios(baseUrlConfigCommon+'auth/password',requestConfig(data,'put'))
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function (error) {
                 reject(error);
            });
    });
    return promise;
};







