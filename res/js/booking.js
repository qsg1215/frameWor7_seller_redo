/**
 * Created by Administrator on 2017/12/16.
 */
import {tempaltePage,merageLanguage,formate_time} from '../../libs/js/Util';
import {get_order} from '../../libs/js/API';
import {sellerApp,$$} from './init';
import pinyin from 'pinyin'
pinyin.STYLE_NORMAL =1
import moment from 'moment'
import templatePage from  './templatePage';


var booking_scope = {};
booking_scope.bindEvent = function () {

}


sellerApp.onPageInit("booking", function(e) {
    var data = {};
    var  booking__page =  merageLanguage('booking',data);
    tempaltePage(booking__page,'.page[data-page="booking"]','booking');
    //请求待结单的数据
   var currentShop = sellerApp.globalData.currentShop;
    var getData = {
        shopId: currentShop.id
    };
    get_order('BOOKING',getData).then(function (res) {
      return res.data.datalist;
    })
    .then(function (data) {
        var data = data.map(function (item) {
            item.bookingName  = pinyin(item.bookingName,{style: pinyin.STYLE_NORMAL, // 设置拼音风格
                heteronym: false});

            item.formateMealAt = formate_time(item.mealAt)
            item.hasSex =  item.sex ? true : false;
            item.isFemale =   item.sex && item.sex == 'S_FEMALE' ? true : false;
            return item;
        });
        console.log('处理后的数据',data);
        console.dir()
        var booking_order_list = sellerApp.virtualList('.list-block.virtual-list', {
            items: data,
            template: templatePage.booking_order_template
        });
    })


});


