import {merageLanguage,tempaltePage,$$} from '../../libs/js/Util';

$$(document).on('pageInit', '.page[data-page="order"]', function (e) {

    var orderPageData = {
        name:'测试'
    };
    var  orderPage =  merageLanguage(orderPageData,'order');
    tempaltePage(orderPage,'.page[data-page="order"]','orderPage');

})