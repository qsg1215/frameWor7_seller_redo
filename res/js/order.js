import {merageLanguage,tempaltePage,$$} from '../../libs/js/Util';
import {sellerApp} from './init';
import {get_shop_list,get_order,get_goods_type,get_category_number} from '../../libs/js/API';
import './change_language';
import './category_management'
import templatePage from  './templatePage'


//存在店铺的情况
var orderPageScope = {};
orderPageScope.initPage = function (getData,currentShop,change_language_data) {
    var OrderNumber = {}
    get_order('TAKEAWAY',getData)
        .then(function (data) {
            OrderNumber.takeAwayOrderNumber =  data.data  ? data.data.datalist.length :  0;
            return  get_order('MEAL',getData)
        })
        .then(function (data) {
            OrderNumber.mealOrderNumber =  data.data  ? data.data.datalist.length :  0;
            return  get_order('BOOKING',getData)
        })
        .then(function (data) {
            OrderNumber.bookingOrderNumber =  data.data  ? data.data.datalist.length :  0;
        })
        .then(function () {
            var data = {
                hasShop:true,
                currentShopName:currentShop.name,
                OrderNumber:OrderNumber,
                current_lang:change_language_data
            }
            var  orderPage =  merageLanguage('order',data);
            tempaltePage(orderPage,'.page[data-page="order"]','orderPage');
            orderPageScope.bindEvent()
        })
};

orderPageScope.bindEvent = function () {
    $$('.panel').on('opened',function () {
        var shopId = sellerApp.globalData.currentShop.id;
        var postData = {shopId:shopId};
        var  panelPage = {}
        get_category_number(postData).then(function (data) {
            panelPage.countOn = data.data.countOn;
            return get_goods_type(postData)
        }).then(function (data) {
            panelPage.panelData = data.data;
            panelPage.totalcategory = data.data.length;
            return panelPage
        })
        .then(function (panelPage) {
            var  panelPage =  merageLanguage('panel',panelPage);
            tempaltePage(panelPage,'.panel',templatePage.panneltemplate);
        })
    })
}



$$(document).on('pageInit', '.page[data-page="order"]', function (e) {
    var postData = {
        id: sellerApp.globalData.userInfo.info.id,
        role:sellerApp.globalData.userInfo.role
    }
    get_shop_list(postData).then(function (data) {
        var currentShop;
     //语言切换
        var lang = localStorage.lang,
            langType = localStorage.langType
        var change_language_data = {
            iSauto: !lang || langType ,
            iSchinese:lang && lang == 'CH',
            iSenglish:lang && lang == 'EN',
        };
        change_language_data.iSauto ?  change_language_data.iSauto = true :  change_language_data.iSauto = false;
        change_language_data.iSchinese ?  change_language_data.iSchinese = true :  change_language_data.iSchinese = false;
        change_language_data.iSenglish ?  change_language_data.iSenglish = true :  change_language_data.iSenglish = false;
        /*
     //测试没有店铺的情况
     data.data.length = 0
     */
        if( data.data.length) {
           //储存用户的店铺列表到全局
            sellerApp.globalData.shopList =  data.data ;
            //默认第一家为当前店铺
            sellerApp.globalData.currentShop = data.data[0];
            currentShop = sellerApp.globalData.currentShop;
            var getData = {
                shopId: currentShop.id
            };
            //渲染页面
            orderPageScope.initPage(getData,currentShop,change_language_data)
        }else{
            var data = {
                hasShop:false,
                currentShopName:'无店铺',
                current_lang:change_language_data
            }
            var  orderPage =  merageLanguage('order',data);
            tempaltePage(orderPage,'.page[data-page="order"]','orderPage');
        };

    })

});
