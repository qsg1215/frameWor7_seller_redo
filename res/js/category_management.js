import {tempaltePage,merageLanguage,edittable_modal,confirm} from '../../libs/js/Util';
import {get_goods_type,sort_category_number,delete_dishesType} from '../../libs/js/API';
import {sellerApp,$$} from './init';
import templatePage from  './templatePage';

var category_management_scope = {};
category_management_scope.sortable = false;
//渲染页面
category_management_scope.initPage = function (postData) {
    get_goods_type(postData).then(function (data) {
        return {
            currentShopName:sellerApp.globalData.currentShop.name,
            categoryData:data.data
        }
    }).then(function (data) {
        var  orderPage =  merageLanguage('category_management',data);
        category_management_scope.categoryData =   orderPage.categoryData ;
        //特殊处理循环内部的字面翻译
        orderPage.categoryData =  orderPage.categoryData.map(function (item) {
            item.delete =  orderPage.delete;
            item.edit =  orderPage.edit;
            return item;
        });

        tempaltePage(orderPage,'.page[data-page="category_management"]','category_management');
        category_management_scope.bindEvent(  orderPage.categoryData)
    })
}


category_management_scope.bindEvent = function (categoryData) {
    //排序
    $$('.sort_good_type').off('click');
    $$('.sort_good_type').click(function () {
        category_management_scope.sortable =  !category_management_scope.sortable;
       if( !category_management_scope.sortable){
           $$('.sortableItem').each(function (index,item) {
               var id = $$(item).data('id');
               var currentItem =   categoryData.filter(function (categoryDataItem) {
                   if(categoryDataItem.id == id ){return true;}})[0];
               currentItem.sort = index+1;
           })
           categoryData.map(function (item) {
               delete item['delete'];
               delete item.edit;
              return item
           });

           sort_category_number(categoryData).then(function (res) {
              //排序成功时,储存局部变量;
               category_management_scope.categoryData = categoryData;
           })
       }
    });
    $$('.add_good_type').off('click')
    $$('.add_good_type').click(function () {
          function confirm () {
              console.log('you click add!')
          };
        edittable_modal(tips.add_goods_type,templatePage.addGoodsTypeMoadl,confirm)
        //模态框中的一点双语翻译
        var  orderPage =  merageLanguage('category_management',{});
        var goodsTypeName_CN = orderPage. goodsTypeName_CN ;
        var goodsTypeName_EN = orderPage. goodsTypeName_EN ;
        $$('#goodsTypeName_CN').html(goodsTypeName_CN);
        $$('#goodsTypeName_EN').html(goodsTypeName_EN);
    });
    $$('.deleteCurrentGoodstype').off('click');
    $$('.deleteCurrentGoodstype').click(function () {
        var currentDisesTypeId = $$(this).data('id');
        var currentDisesItem =   category_management_scope.currentDishesType(currentDisesTypeId);
        confirm(tips.delete_current_goods_type,function () {
            var urlData = {
                shopId :category_management_scope.shopId,
                id:currentDisesTypeId
            };
            currentDisesItem.isDelete = 1;
             delete_dishesType(urlData,currentDisesItem).then(function (res) {

                 category_management_scope.initPage({ shopId :category_management_scope.shopId,})
            });

         })
    });

};

//查询当前的项目
category_management_scope.currentDishesType = function(id){

   return  category_management_scope.categoryData.filter(function (item) {
        if(item.id == id){return true}
    })[0]

}


sellerApp.onPageInit('category_management',function () {


    category_management_scope.shopId = sellerApp.globalData.currentShop.id;
    var postData = {shopId:category_management_scope.shopId};
   /* get_goods_type(postData).then(function (data) {
        return {
            currentShopName:sellerApp.globalData.currentShop.name,
            categoryData:data.data
        }
    }).then(function (data) {
        var  orderPage =  merageLanguage('category_management',data);
        category_management_scope.categoryData =   orderPage.categoryData ;
        //特殊处理循环内部的字面翻译
        orderPage.categoryData =  orderPage.categoryData.map(function (item) {
            item.delete =  orderPage.delete;
            item.edit =  orderPage.edit;
           return item;
        });

        tempaltePage(orderPage,'.page[data-page="category_management"]','category_management');
        category_management_scope.bindEvent(  orderPage.categoryData)
    })*/
    category_management_scope.initPage(postData)


})
