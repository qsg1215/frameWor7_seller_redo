/**
 * Created by Administrator on 2017/11/26.
 */
import  axios from 'axios';
import  md5Hex  from 'md5-hex';
import {requestConfig} from '../../libs/js/request'
export function login(data,success){
    data.password = md5Hex (data.password).toUpperCase();
    console.log( data.password)
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
