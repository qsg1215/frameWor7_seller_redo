import {merageLanguage,tempaltePage,$$,sellerApp} from '../../libs/js/Util';
$$(document).on('pageInit', '.page[data-page="order"]', function (e) {
    console.log('orderpage')
    var  orderPage =  merageLanguage('order',{name:"hahahaha"});
    tempaltePage(orderPage,'.page[data-page="order"]','orderPage');
});
