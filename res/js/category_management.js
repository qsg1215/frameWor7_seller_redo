import {tempaltePage,merageLanguage,loadPage} from '../../libs/js/Util';
import {get_goods_type,sort_category_number} from '../../libs/js/API';
import {sellerApp,$$} from './init';

var category_management_scopr = {};
category_management_scopr.sortable = false;

category_management_scopr.bindEvent = function (categoryData) {
    //排序
    $$('.sort_good_type').click(function () {
        category_management_scopr.sortable =  !category_management_scopr.sortable;
       if( !category_management_scopr.sortable){
           $$( '.sortableItem').map(function (index,item) {
               var id = $$(item).data('id');
                 var currentItem =   categoryData.filter(function (categoryDataItem) {
                          if(categoryDataItem.id == id ){return true;}})[0];
                 currentItem.sort = index+1;
           });
           categoryData.map(function (item) {
               delete item['delete'];
               delete item.edit;
              return item
           });
           sort_category_number(categoryData).then(function (res) {
              //排序成功
           })
       }
    })
}


sellerApp.onPageInit('category_management',function () {

    var shopId = sellerApp.globalData.currentShop.id;
    var postData = {shopId:shopId};
    get_goods_type(postData).then(function (data) {
        return {
            currentShopName:sellerApp.globalData.currentShop.name,
            categoryData:data.data
        }
    }).then(function (data) {
        var  orderPage =  merageLanguage('category_management',data);
        //特殊处理循环内部的自字面翻译
        orderPage.categoryData =  orderPage.categoryData.map(function (item) {
            item.delete =  orderPage.delete;
            item.edit =  orderPage.edit;
           return item;
        })
        tempaltePage(orderPage,'.page[data-page="category_management"]','category_management');
        category_management_scopr.bindEvent(  orderPage.categoryData)
    })


})
