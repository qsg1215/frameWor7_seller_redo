import {merageLanguage,tempaltePage,back,alert,Reg,notification,show} from '../../libs/js/Util';
import {sellerApp,$$} from './init';
import  md5Hex  from 'md5-hex';
import {get_SMScode,reset_password} from '../../libs/js/API';
sellerApp.onPageInit('forget_passWord',function (e) {
    var  forget_passWord_page =  merageLanguage('forget_passWord');
    tempaltePage(forget_passWord_page,'.page[data-page="forget_passWord"]','forget_passWord');
})
var forget_password_page = {};
//匹配电话
forget_password_page.checkPhone = function () {
    var telephoneCode;
    var phone = $$('#reset_phone').val();
    var flag = Reg('phone',phone,function () {
        $$('#reset_phone').val('');
    })
    telephoneCode = flag ? '+86' : '+64';
    if(flag){
        var postData = {
            telephoneCode: telephoneCode,
            phone:phone
        };
        return postData
    };

};

forget_password_page.countDown  = function () {
    var time = 60;
    $$('#getSMScode').attr("disabled", true);
    show('.SHJ_send_code_buttom',true);
    show('#getSMScode',false)
    var timer = setInterval(function () {
        time--;
        localStorage.lang == 'CH' ?  $$('.SHJ_send_code_buttom').html(time + ' s 后重新获取') :   $$('.SHJ_send_code_buttom').html('Resend after '+time + ' s');
        if (time == 0) {
            clearInterval(timer);
            $$('#getSMScode').removeAttr("disabled");
            show('.SHJ_send_code_buttom',false);
            show('#getSMScode',true)
            localStorage.lang == 'CH' ?  $$('#getSMScode').html('获取验证码') :  $$('#getSMScode').html('Send')
        }
    }, 1000)

}

sellerApp.onPageBeforeAnimation('forget_passWord',function () {
    $$('#getSMScode').click(function () {
       var postData =  forget_password_page.checkPhone()
        if(postData){
            get_SMScode(postData).then(function () {
                notification(tips.sendCode);
                forget_password_page.countDown()
            })
        };
    });

    $$('#resetpwd_confirm').click(function () {
        var postData =  forget_password_page.checkPhone();
        //匹配验证码
        var verification_code =  $$('#verification_code').val();
        var verification_code_CheckResult =   Reg('code',verification_code,function () {
            $$('#verification_code').val('');
        });
        //匹配新密码
        var newPwd =  $$('#newPwd').val();
        var passwordCheckResult =   Reg('password',newPwd,function () {
            $$('#verification_code').val('');
        });
        if(postData  && passwordCheckResult && verification_code_CheckResult){
            postData.code = verification_code;
           postData.password = md5Hex(newPwd).toUpperCase();
            reset_password(postData).then(function () {
                location.href = 'http://localhost:8080/index.html'
            })
        }
    });
    back('forget_passWord','./index.html')

})

