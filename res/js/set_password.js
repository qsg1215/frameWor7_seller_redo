/**
 * Created by Administrator on 2017/12/11.
 */
import {tempaltePage,merageLanguage,loadPage,alert,Reg} from '../../libs/js/Util';
import {change_password} from '../../libs/js/API';
import  md5Hex  from 'md5-hex';
import {sellerApp,$$} from './init';
var set_password_scope = {};
set_password_scope.bindEvent =function () {
    $$('#confirm_pwd').off('click')
    $$('#confirm_pwd').click(function () {
       var oldPassword =  $$('#oldPwd').val();
       var newPassword =  $$('#newPwd').val();
      var  postData = {
            newPassword: md5Hex(newPassword).toUpperCase(),
              password: md5Hex(oldPassword).toUpperCase(),
             username: sellerApp.globalData.userInfo.info.username
        };
      //上线开启验证
     /* if(set_password_scope.check_password_be_same(oldPassword,newPassword)){
          set_password_scope.change_password(postData);
      }*/
      set_password_scope.change_password(postData);

    })
};

set_password_scope.change_password =function (postData) {
    change_password(postData).then(function (res) {
        if( res.code == 200){
            alert(tips.change_password_tips,function () {
                localStorage.jwt = res.data.jwt;
                //更新全局变量中的密码
                sellerApp.globalData.userInfo.info.password =res.data.info.password;
                loadPage('./res/html/order.html');
            })
        };
        if( res.code == 204){
            $$('#oldPwdAgain').val('');
        };
    })
};

set_password_scope.check_password_be_same =function (oldPassword,newPassword) {
    var same_check =  $$('#newPwd').val() == $$('#newPwdAgain').val();
    if(!same_check){
        $$('#newPwdAgain').val('');
        $$('#newPwdAgain').css('border','1px solid red')
    }else{
        $$('#newPwdAgain').css('border','none')
    }
   var newPwdchenck =   Reg('password', newPassword,function () {
        $$('#newPwd').val('');
        $$('#newPwdAgain').val('');
    });
    return  newPwdchenck && same_check;
};

sellerApp.onPageInit('set_password',function () {
    var set_password_page_data = merageLanguage('set_password',{});
    tempaltePage(set_password_page_data,'.page[data-page="set_password"]','set_password');
    set_password_scope.bindEvent()
})
