/**
 * Created by Administrator on 2017/11/26.
 */
import 'framework7';
import  {alert} from './Util'
var Framework7 = window.Framework7
import  server from './server';
var jwt = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwOWNlZDI1OWQwZDc0OTMwOGU1YTg2ZWU3YTcxOWFmMiIsInN1YiI6IntcImlkXCI6MzE0Nzc0OTgsXCJ1c2VyTmFtZVwiOlwiMTgzMjg0MTIwMTdcIixcImFnZW50XCI6XCJ3ZWJcIn0ifQ.8LUw23h7CVekVCG9Ut5irV76hsryomTJxj3voz4nt5A'
/*
* 平台*/
var source = localStorage.platform,
    source = source ? source : "H5"
/*
* 语言
* */
var  lang =localStorage.lang && localStorage.lang == 'EN'? 'en_US': 'zh-en';

var config = {
    // `transformRequest` 允许在向服务器发送前，修改请求数据
    // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
    // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
    transformRequest: [function (data) {
        return data;
    }],
    // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
    transformResponse: [function (data) {
        // 对 data 进行任意转换处理
        return data;
    }],
    paramsSerializer: function (params) {
        return Qs.stringify(params, {arrayFormat: 'brackets'})
    },
    headers:{
        'version': 'v100',
        'Access-Control-Allow-Origin': '*',
        'Content-Type':'application/json',
        'source': source,
        'lang': lang
    },
    timeout: 7000,
    withCredentials: false, // 默认的
    baseURL:server.lineUrl,
    // `auth` 表示应该使用 HTTP 基础验证，并提供凭据
    // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
    // Authorization: jwt,
    responseType: 'json', // 默认的
    xsrfHeaderName: 'X-XSRF-TOKEN', // 默认的
    // `maxContentLength` 定义允许的响应内容的最大尺寸
    maxContentLength: 2000,
    // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
    validateStatus: function (status) {
        return status >= 200 && status < 300; // 默认的
    }
}

export   function requestConfig (data,method,success,failed) {
    var parm = {

    }
    if(!method){
        parm.params =data;
    }else{
        data = JSON.stringify(data);
        parm.data = data;
    }
    return   method &&  method !== 'get' ?  Object.assign(parm,{method:method },config) :   Object.assign(parm,{method:'get' },config)
}




