/**
 * Created by Administrator on 2017/11/26.
 */
import  axios from 'axios';
import {sellerApp} from '../../res/js/init'
import {alert} from './Util'

import  md5Hex  from 'md5-hex';
import {requestConfig} from '../../libs/js/request';


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
    console.log(response)
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

export function login(data,success){
    data.password = md5Hex (data.password).toUpperCase();
    const promise = new Promise(function(resolve, reject){
        axios('/common/merchant_shop_user_login',requestConfig(data,'post'))
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            });
    });
    return promise;
};
