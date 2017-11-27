import 'framework7';
 var $$ = window.Dom7;
var  sellerAppInit = new Framework7({
    material: true,
    modalTitle: 'seller',
    animateNavBackIcon: true,
    router: true,
    swipePanel: 'left',
    onAjaxStart: function (xhr) {
        sellerAppInit.showIndicator();
    },
    onAjaxComplete: function (xhr) {
        sellerAppInit.hideIndicator();
    }
});

import "./login";
sellerAppInit.addView('.view-main',{});
import "./order";
sellerAppInit.__proto__.device.android ? localStorage.platform == 'ANDROID' : undefined
sellerAppInit.__proto__.device.ios ? localStorage.platform == 'IOS' : undefined
//样式控制
$$(".popover").on('open',function(){
    $$(this).css({
        top: ' 5rem',
        width: '10rem'
    })
});



