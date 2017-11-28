/**
 * Created by Administrator on 2017/11/25.
 */
import {loadPage,$$} from '../../libs/js/Util';
import * as API from '../../libs/js/API';
import  './forget_passWord'
import {sellerApp,mainView} from './init'
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

/*
* 事件绑定
*
* */
$$('.loginInfo').keyup(function(){
      var userName = $$("input[name = 'userName']").val();
      var password = $$("input[name = 'password']").val();
    if(userName.trim().length > 0 && password.trim().length > 5 ){
        $$('#login_btn').removeAttr('disabled');
    }else{
        $$('#login_btn').attr({'disabled': 'true'});
    };
})

$$('#login_btn').click(function(){
    var loginData = {
        userName:$$("input[name = 'userName']").val(),
        password:$$("input[name = 'password']").val()
    };
    API.login(loginData)
        .then(function(data){
            loadPage('./res/html/order.html');
            console.log(data)
            localStorage.jwt = data.data.jwt
        })
        .catch(function(error){
            if(error.msg.indexOf('passWord')> -1 || error.msg.indexOf('密码') > -1){
                $$("input[name = 'password']").val('')
            }else{
                $$("input[name = 'userName']").val('')
            }
        })
});

$$('#forget_pwd_btn').click(function () {
     loadPage('res/html/forget_passWord.html')
})


sellerApp.onPageInit('index_android',function () {
    console.log("回来了");
})







