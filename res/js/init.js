/**
 * Created by Administrator on 2017/11/28.
 */

import 'framework7';
import {merageLanguage,tempaltePage,$$} from '../../libs/js/Util';
var $$ = window.Dom7;
var  sellerAppInit = new Framework7({
    material: true,
    modalTitle: 'seller',
    animateNavBackIcon: true,
    router: true,
    init:false,
    swipePanel: 'left',
    onAjaxStart: function (xhr) {
        sellerAppInit.showIndicator();
    },
    onAjaxComplete: function (xhr) {
        sellerAppInit.hideIndicator();
    }
});
sellerAppInit.init()
var  loginData =  merageLanguage('index');
tempaltePage(loginData,'body','index_android');
var View = sellerAppInit.addView('.view-main',{});
sellerAppInit.__proto__.device.android ? localStorage.platform = 'ANDROID' : undefined
sellerAppInit.__proto__.device.ios ? localStorage.platform = 'IOS' : undefined;
export var sellerApp = sellerAppInit;
export var mainView = View;