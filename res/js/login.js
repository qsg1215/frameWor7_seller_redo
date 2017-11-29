/**
 * Created by Administrator on 2017/11/25.
 */
import {loadPage,$$} from '../../libs/js/Util';
import {login} from '../../libs/js/API';
import  './forget_passWord'
import {sellerApp} from './init'
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
    login(loginData)
        .then(function(data){
            loadPage('./res/html/order.html');
            localStorage.jwt = data.data.jwt;
            sellerApp.globalData = {};
            sellerApp.globalData.userInfo = data.data;
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







