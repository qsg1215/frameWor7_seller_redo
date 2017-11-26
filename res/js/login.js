/**
 * Created by Administrator on 2017/11/25.
 */
import {merageLanguage,tempaltePage,$$} from '../../libs/js/Util';
import {foramteDate} from '../../libs/js/Util';
import * as API from '../../libs/js/API'
var indexPageData = {
    name:'测试'
};
var  loginData =  merageLanguage(indexPageData,'index');
tempaltePage(loginData,'body','index_android');
/*$$(document).on('pageInit', '.page[data-page="index_android"]', function (e) {
 API.login({password: "123456",userName: "18328412017"})
 .then(function(data){
 console.log('第一次请求数据',data)
 return    API.login(data)
 }).then(function(data){
 console.log('第二次请求数据',data)
 return    API.login({password: "123456",userName: "18328412017"})
 })
 .then(function(data){
 console.log('第三次请求数据',data)
 });

 });*/

$$(document).on('pageInit', '.page[data-page="index_android"]', function (e) {
 API.login({password: "123456",userName: "18328412017"})
 .then(function(data){
 console.log('第一次请求数据',data,foramteDate(1318781876))
 })

 });





