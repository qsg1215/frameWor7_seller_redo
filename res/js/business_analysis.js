/**
 * Created by Administrator on 2017/11/25.
 */
import {tempaltePage,merageLanguage,formate_amount} from '../../libs/js/Util';
import {get_store_sale} from '../../libs/js/API';
import {sellerApp,$$} from './init';
import echarts from 'echarts';
import moment from 'moment'


var business_analysis_scope = {};
//计算比例尺(待优化算法)
business_analysis_scope.calculateScale = function (data) {

     var scaleMax = Math.max(data.sale[0],data.sale[1],data.sale[2]);
     var scaleInterval=Math.ceil(scaleMax/10);
     var newScaleMax = scaleInterval*10;

    var amountMax = Math.max(data.amount[0],data.amount[1],data.amount[2]);
    var amountInterval=Math.ceil(amountMax/10);
    var newAmountMax = amountInterval*10;

    return  {
        sale:{
            max: newScaleMax,
            interval:scaleInterval
        },
        amount:{
            max: newAmountMax,
            interval:amountInterval
        }
    }
};

business_analysis_scope.setEcharts = function (data) {

  var scale =    business_analysis_scope.calculateScale(data);
    console.log('销售额====>',data.amount,scale)
    var myChart = echarts.init(document.getElementById('main'));
    var  option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        legend: {
            data:[tips.sales,tips.sales_volume]
        },
        xAxis: [
            {
                type: 'category',
                data: [tips.takeaway,tips.reservation,tips.order],
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: tips.sales,
                min: 0,
                max: scale.sale.max,
                interval:  scale.sale.interval,
                axisLabel: {
                    formatter: '{value}'
                }
            },
            {
                type: 'value',
                name: tips.sales_volume,
                min: 0,
                max: scale.amount.max,
                interval: scale.amount.interval,
                axisLabel: {
                    formatter: '{value}   '
                }
            }
        ],
        series: [
            {
                name:tips.sales,
                type:'bar',
                data:data.sale,
                label: {
                    normal: {
                        show: true,
                        position: 'insideTop'
                    }
                }
            },
            {
                name:tips.sales_volume,
                type:'bar',
                data:data.amount,
                label: {
                    normal: {
                        show: true,
                        position: 'insideTop'
                    }
                },
            }

        ]
    };
    console.log('配置对象====>',option)
    // 为echarts对象加载数据
    myChart.setOption(option);
};
business_analysis_scope.initPage = function (days,shopId) {
   var  howDays =   days ?  days : 3;
   var shopId  =  shopId ? shopId : sellerApp.globalData.currentShop.id;
   var postData = {
       start: moment().unix(),
       end: moment().unix() -86400*howDays,
       shopId:business_analysis_scope.shopId
    }
    get_store_sale(postData).then(function (res) {
            var amountArr = [];
            var saleArr = [];
             for (var key in res.data){
                 amountArr.push(res.data[key].amount);
                 saleArr.push(res.data[key].count)
             };

              amountArr = amountArr.map(function (item) {
                    return   formate_amount(item);
               })
             return {
                 amount:amountArr,
                 sale:saleArr
             }
        })
        .then(function (data) {
            business_analysis_scope.setEcharts(data)
        });
}

sellerApp.onPageInit("business_analysis", function(e) {
    business_analysis_scope.initPage()
    var data = {};
    var  business_analysis_page =  merageLanguage('business_analysis',data);
    tempaltePage(business_analysis_page,'.page[data-page="business_analysis"]','business_analysis');


});


