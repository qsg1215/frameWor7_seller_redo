import {merageLanguage,tempaltePage,$$,alert} from '../../libs/js/Util';
import {sellerApp} from './init';
import {get_shop_list,get_order,get_goods_type,get_category_number,get_under_category_dishesList} from '../../libs/js/API';
import './change_language';
import './category_management';
import './store_manage';
import './set_password'
import templatePage from  './templatePage';


//存在店铺的情况
var orderPageScope = {};
orderPageScope.initPage = function (getData,currentShop,change_language_data) {
    var OrderNumber = {};
    var category = {}
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
        .then(function (data) {
            var shopId = sellerApp.globalData.currentShop.id;
            var postData = {shopId:shopId};
          return   get_goods_type(postData)
        })
        .then(function (res) {
            category.category = res.data.length ? res.data[0]: {name:'',id:''};
            var catrgoryId = res.data[0].id;
            return   get_under_category_dishesList({id:catrgoryId})
        })
        .then(function (res) {
            var  disesListOnSale = res.data.filter(function (item) {if(item.status == 1){return true;}});
            var  disesListNotSale = res.data.filter(function (item) {if(item.status == 0){return true;}});
            var data = {
                disesListOnSale:disesListOnSale,
                disesListNotSale:disesListNotSale,
                category:  category.category,
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
       /* get_under_category_dishesList({id:id}).then(function (res) {
            var  disesListOnSale = res.data.filter(function (item) {if(item.status == 1){return true;}});
            var  disesListNotSale = res.data.filter(function (item) {if(item.status == 0){return true;}});
            var data = {
                disesListOnSale: disesListOnSale,
                disesListNotSale: disesListNotSale,
            }
            var  dishesList =  merageLanguage('panel',data);
            tempaltePage(dishesList,'.goods_dishes_container',templatePage.dishesList);
        })*/



    })
}

sellerApp.onPageInit('order', function (e) {
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
                currentShopName:'无店铺',
                current_lang:change_language_data
            }
             var  orderPage =  merageLanguage('order',data);
             var noShopTemplate = templatePage.noShop;
            tempaltePage(orderPage,'.page[data-page="order"]',noShopTemplate);
        };

    })

});