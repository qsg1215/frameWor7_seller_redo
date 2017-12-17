/**
 * Created by Administrator on 2017/11/28.
 */

import 'framework7';
import '../../bower_components/Framework7 3D Panels/dist/framework7.3dpanels.min'
import {merageLanguage,tempaltePage} from '../../libs/js/Util';
if(navigator.language == 'zh-CN'){
    var  modalTitle = '本地通',
        modalButtonOk = '确定',
        modalButtonCancel = '取消'
}else{
    var  modalTitle = 'seller',
        modalButtonOk = 'ok',
        modalButtonCancel = 'cancel'
};

var $M = window.Dom7;
var  sellerAppInit = new Framework7({
    material: true,
    modalTitle: modalTitle,
    modalButtonOk:modalButtonOk,
    modalButtonCancel:modalButtonCancel,
    pushState:true,
    animateNavBackIcon: true,
    router: true,
    notificationHold:5000,
    init:false,
    swipePanel: 'left',
    onAjaxStart: function () {
        sellerAppInit.showIndicator();
    },
    onAjaxComplete: function () {
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
export var $$ = $M;