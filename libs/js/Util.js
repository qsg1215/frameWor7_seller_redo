/**
 * Created by Administrator on 2017/11/25.
 */
import 'framework7';
import  moment from 'moment';
if(localStorage.lang == 'CH'){
    moment.locale('zh-cn');
    moment.updateLocale('zh-cn', {
        months : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
    });
}

export  var  $$ = window.Dom7;
var  $$ = window.Dom7;
var Template7 = window.Template7;
import  language from   '../i18n/language';

export function merageLanguage(pageData,pageName) {
    localStorage.lang =  navigator.language == 'zh-CN' ? 'CH' : 'EN'
    var  lang = localStorage.lang ;
    var   pageData =Object.assign(pageData,language[lang][pageName]);
    return pageData
}
export function tempaltePage(Data,domSelector,templateID) {
   var scriptContent = $$('#'+templateID).html();
   var templatedHtml = Template7(scriptContent,Data);
   $$(domSelector).html(templatedHtml);
}

export function foramteDate(timeStamp) {
    timeStamp =  timeStamp.toString().length > 10  ? timeStamp/1000 : timeStamp
   return  moment.unix(timeStamp).format('MMMM Do YYYY, h:mm:ss');
}

