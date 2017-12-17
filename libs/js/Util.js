/**
 * Created by Administrator on 2017/11/25.
 */
import 'framework7';
import  moment from 'moment';
import  language from   '../i18n/language';
import {sellerApp, mainView } from '../../res/js/init';
/*
* moment国际化
* */
if(localStorage.lang == 'CH'){
    moment.locale('zh-cn');
    moment.updateLocale('zh-cn', {
        months : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
    });
}

export  var  $$ = window.Dom7;
var  $$ = window.Dom7;
var Template7 = window.Template7;


/*
* @parm
*  pageName: 页面名称, String
*  pageData: 渲染的数据,String
*
* */
export function merageLanguage(pageName,pageData) {
    if(localStorage.langType){
        var lang  =  navigator.language == 'zh-CN' ? 'CH' : 'EN';
        lang == 'CH' ?moment.locale('zh_cn'):moment.locale('en')
        window.tips =language[lang].tips;
        pageData  = pageData ?  Object.assign(pageData,language[lang][pageName])  : Object.assign(language[lang][pageName]);
    };
    var deafultlang ;
    deafultlang =  navigator.language == 'zh-CN' ? 'CH' : 'EN';
    //挂载提示语到全局上面
    if( localStorage.lang){
        var lang =  localStorage.lang;
        lang == 'CH' ?moment.locale('zh_cn'):moment.locale('en')
        window.tips =language[lang].tips;
        pageData  = pageData ?  Object.assign(pageData,language[ lang][pageName])  : Object.assign(language[lang][pageName]);
    }else{
        deafultlang == 'CH' ?moment.locale('zh_cn'):moment.locale('en')
        window.tips =language[deafultlang].tips;
        pageData  = pageData ?  Object.assign(pageData,language[deafultlang][pageName])  : Object.assign(language[deafultlang][pageName]);
    }

    return pageData
}
/*
* @parm
* Data: 渲染的数据, Object
* domSelector:放置渲染的html容器, String
* templateID:template7模板ID,String
*
*
* */
export function tempaltePage(Data,domSelector,templateID) {
//依照传入的的三个参数的长短来判断传入的是Id还是模板字符串
    var scriptContent;
    templateID.length>40 ? scriptContent = templateID :  scriptContent = $$('#'+templateID).html();
   var templatedHtml = Template7(scriptContent,Data);
   $$(domSelector).html(templatedHtml);
}

/*
* 格式化时间
* @parm
* timeStamp: 时间戳 Number
*
* */
export function foramteDate(timeStamp) {
    timeStamp =  timeStamp.toString().length > 10  ? timeStamp/1000 : timeStamp
   return  moment.unix(timeStamp).format('MMMM Do YYYY, h:mm:ss');
}


/*
* 加载页面
* @parm
* pageUrl: 页面地址  String
* */
export  function loadPage (pageUrl) {
    mainView.router.loadPage(pageUrl)
}

/*
* 提示框
* @parm
* tips: 提示信息 String
* */

export  function alert (tips,success) {
    success ?  sellerApp.alert(tips,success) :  sellerApp.alert(tips)
}

/*
对话框
*@parm
*
* */
export  function confirm (title,confirmCallback,cancelCallback) {
    cancelCallback ? sellerApp.confirm(title, confirmCallback, cancelCallback) :sellerApp.confirm(title, confirmCallback)
}

/*
* 页面回退
* @
* pageName: 开始页面的page name, String;
* pageUrl: 回退页面的地址
* */

export  function back (pageName,pageUrl) {

    $$(document).on('click', '.page[data-page='+pageName+']  div.left', function (e) {
        pageName == 'forget_passWord'  ? location.href = 'http://localhost:8080/index.html' :  mainView.router.loadPage(pageUrl)
    });
}

/*
*  正则匹配
*  @params
*  type  string 匹配的类型
*  value string 匹配的值,
*  failed   function 匹配失败的回调
* */
export  function Reg (type,value,failed) {
    var phoneReg = new RegExp(/^((1[3,5,8][0-9])|(14[5,7])|(16[6])|(17[0,6,7,8])|(19[7,8,9]))\d{8}$/);
    var  coderReg = /^[0-9]{4}$/;
   // 检测密码由6-21字母和数字组成，不能是纯数字或纯英文
    var passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;


    switch(type)
    {
        case 'phone':
            if( !phoneReg.test(value)){
                failed ? sellerApp.alert(tips.phone_fromat,failed()) :  sellerApp.alert(tips.phone_fromat)
            }
           return phoneReg.test(value);
            break;
        case 'code':
            if( !coderReg.test(value)){
                failed ? sellerApp.alert(tips.code_check,failed()) :  sellerApp.alert(tips.code_check)
            }
            return coderReg.test(value)
            break;
        case 'password':
            if( ! passwordReg.test(value)){
                failed ? sellerApp.alert(tips.password_check,failed()) :  sellerApp.alert(tips.password_check)
            }
            return   passwordReg.test(value)
            break;
        default:
    };
}

/*
* 通知
* @params
* message string 通知信息
* */
export function notification (message) {
    sellerApp.addNotification({
        message: message,
        button: {
            text: tips.close,
            color: 'lightgreen'
        },
    });

}

/*
显示隐藏元素
@params
 DOMselector,css选择器,
 ishow boolean 是否显示
* */

export function show (DOMselector,isShow) {
    isShow? $$(DOMselector).css({display:'block'}) :  $$(DOmselector).css({display:'none'})
}

/*
* 编辑添加模态框
* @params
* title String 模态框标题
* text String 模板字符串 模板主体内容
* confirm, 确定回调
* cancel, 取消回调
* */

export function edittable_modal (title,text,confirm,cancel) {
    sellerApp.modal({
        title: title,
        text:text,
        buttons: [
            {
                text:tips.cancel,
                onClick: function () {
                   cancel ? cancel() : ''
                }
            },
            {
                text: tips.confirm,
                onClick: function () {
                    confirm ? confirm() : ''
                }
            },
        ]
    });

}

/*
*处理金额的数据格式
* @parmas
* number Number 待处理的数字
* */

export function formate_amount (number) {
    var number = Number(number);
    var  numberString =String(number.toFixed(3));
    var   NewNumber = parseFloat(Number(numberString.substr(0,numberString.length-1)).toFixed(2));
    return  NewNumber
}

/*
 *日期格式化
 * @parmas
 * number Number 待处理的数字
 * */

export function formate_time (timeStamp) {
    timeStamp = String(timeStamp).length > 10 ? timeStamp/1000 : timeStamp;
    console.log('当前日期的语言===>',moment.locale())
  var time =   moment.unix(timeStamp).format('YYYY-MM-DD HH:mm')
    return  time
}




