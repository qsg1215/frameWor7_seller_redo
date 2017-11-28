/**
 * Created by Administrator on 2017/11/25.
 */
import 'framework7';
import  moment from 'moment';
import  language from   '../i18n/language';
import {sellerApp, mainView} from '../../res/js/init'
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
    localStorage.lang =  navigator.language == 'zh-CN' ? 'CH' : 'EN'
    var  lang = localStorage.lang ;
    var   pageData;
    pageData  = pageData ?  Object.assign(pageData,language[lang][pageName])  : Object.assign(language[lang][pageName]);
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
   var scriptContent = $$('#'+templateID).html();
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

export  function alert (tips) {
    sellerApp.alert(tips)
}


