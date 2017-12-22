import {merageLanguage,tempaltePage,$$,alert} from '../../libs/js/Util';
import {sellerApp} from './init';
import {get_order_page_data,get_goods_type,get_category_number} from '../../libs/js/API';
import './change_language';
import './category_management';
import './store_manage';
import './set_password';
import './business_analysis';
import  './booking'
import templatePage from  './templatePage';
//存在店铺的情况
var orderPageScope = {};
orderPageScope.initPage = function (allData,change_language_data ) {
    var  disesListOnSale = allData.categoryListTypeData.data.filter(function (item) {if(item.status == 1){return true;}});
    var  disesListNotSale = allData.categoryListTypeData.data.filter(function (item) {if(item.status == 0){return true;}});
    var data = {
        disesListOnSale:disesListOnSale,
        disesListNotSale:disesListNotSale,
        category:  allData.categoryData.data.length ? allData.categoryData.data[0]: {name:'',id:''},
        currentShopName: sellerApp.globalData.currentShop.name,
        OrderNumber:{
            takeAwayOrderNumber:allData.TAKEAWAY.data.datalist.length  ? allData.TAKEAWAY.data.datalist.length :  0,
            mealOrderNumber:allData.MEAL.data.datalist.length   ? allData.MEAL.data.datalist.length :  0,
            bookingOrderNumber:allData.BOOKING.data.datalist.length   ?allData.BOOKING.data.datalist.length :  0,
        },
        current_lang:change_language_data,
        userLogo:sellerApp.globalData.userInfo.info.headImageUrl,
        userName:sellerApp.globalData.userInfo.info.nickname,
        role:sellerApp.globalData.userInfo.role
    };
    var  orderPage =  merageLanguage('order',data);
    tempaltePage(orderPage,'.page[data-page="order"]','orderPage');
    orderPageScope.bindEvent()
};
orderPageScope.bindEvent = function () {
    //侧边栏打开时;
    $$('.panel').off('opened');
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
            orderPageScope.bindPanelEvent()
        })
    });
    $$('a[href="#tab10"]').off('click')
    $$('a[href="#tab10"]').click(function (e) {
        console.log('you click me!')
    });
    $$('#switch_accont').off('click');
    $$('#switch_accont').click(function () {
        alert(tips.swtich_account,function () {
            location.href = 'http://localhost:8080/index.html?type=fromMe';
            $$('.loginInfo').val('');
        })
    })
}
//点击分类
orderPageScope.bindPanelEvent = function () {
    $$('.categoryItem').off('click')
    $$('.categoryItem').click(function () {
        var id =  $$(this).data('id')
        $$('.currentCategory').html( $$(this).data('name'));
        $$('.currentCategory').attr('data-id', id);
    })
}
sellerApp.onPageInit('order', function (e) {
    get_order_page_data().then((res)=>{
        console.log('恭喜你拿到了所有的数据',res)
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
        if( res.storeList.data.length) {
            orderPageScope.initPage(res,change_language_data)
        }else{
            var data = {
                currentShopName:'无店铺',
                current_lang:change_language_data
            }
            var  orderPage =  merageLanguage('order',data);
            var noShopTemplate = templatePage.noShop;
            tempaltePage(orderPage,'.page[data-page="order"]',noShopTemplate);
        };
    })
});