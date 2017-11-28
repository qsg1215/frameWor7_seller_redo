import {merageLanguage,tempaltePage,back} from '../../libs/js/Util';
import {sellerApp} from './init';
sellerApp.onPageInit('forget_passWord',function (e) {
    var  forget_passWord_page =  merageLanguage('forget_passWord');
    tempaltePage(forget_passWord_page,'.page[data-page="forget_passWord"]','forget_passWord');
})

sellerApp.onPageBeforeAnimation('forget_passWord',function () {
    back('forget_passWord','./index.html')
})

