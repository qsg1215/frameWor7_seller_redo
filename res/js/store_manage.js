/**
 * Created by Administrator on 2017/12/7.
 */
import {tempaltePage,merageLanguage,confirm} from '../../libs/js/Util';
import {modify_store_status} from '../../libs/js/API';
import templatePage from  './templatePage'
import {sellerApp,$$,mainView} from './init';
var store_manage_scope = {};
store_manage_scope.bindEvent = function (storeList) {
    $$('.changeStoreStatus').off('click')
    $$('.changeStoreStatus').click(function () {
        var status = $$(this).data('status');
        var id = $$(this).data('id');
        store_manage_scope.id = id;
        if(status != 'true'){
            store_manage_scope.reInitPage(storeList,'open')
        }else{
            store_manage_scope.reInitPage(storeList,'close')
        }

    })
};
//处理店铺列表数据
store_manage_scope.dealStorelist = function (storeList) {
    var store_manage_page_data = merageLanguage('store_manage',{storList:storeList});
    //处理营业状态的显示
    store_manage_page_data.storList =  store_manage_page_data.storList.map(function (item) {
        item.status == 'TYPE_OPEN' ?  item.isOpen = true : item.isOpen = false;
        item.open = store_manage_page_data.open;
        item.close = store_manage_page_data.close;
        return item
    });

    return store_manage_page_data
};
//发送请求重新渲染页面;
store_manage_scope.reInitPage = function (storeList,type) {
    var storetips = type == 'open' ? tips.open_store : tips.close_store
    confirm(storetips,function () {
        var newStoreList =   storeList.map(function (item) {
            if(item.id ==  store_manage_scope.id){
                store_manage_scope.currentEditStore = item;
               // item.status =   type == 'open' ?  'TYPE_OPEN' :  'TYPE_STOP'
            };
            return item;
        });
        console.log('原来的', store_manage_scope.currentEditStore);
        var postData = {
            id:store_manage_scope.currentEditStore.id,
            status:store_manage_scope.currentEditStore.status
        }
        modify_store_status(postData).then(function (res) {
            console.log('请求回来的数据',res);

        })
        //在这里写发送请求的方法;
        /*
         * 参数是状态;
         * 讲求回来的数据交给dealStorelist方法处理
         * */
        var store_manage_page_data =   store_manage_scope.dealStorelist(newStoreList)
        tempaltePage(store_manage_page_data,'.merchant_store_container',templatePage.storeManageList)
        store_manage_scope.bindEvent(store_manage_page_data.storList)
    })
}



sellerApp.onPageInit('store_manage',function () {
    //过滤禁用状态的店铺
    var    storList = sellerApp.globalData.shopList.filter(function (item) {
        if(item.status != 'TYPE_BAN'){
            return true
        };
        return true;//线上去掉这段
    });
    var store_manage_page_data =   store_manage_scope.dealStorelist(storList)
    tempaltePage(store_manage_page_data,'.page[data-page="store_manage"]','store_manage');
    store_manage_scope.bindEvent(store_manage_page_data.storList)
})
