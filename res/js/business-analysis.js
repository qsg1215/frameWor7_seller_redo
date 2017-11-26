/**
 * Created by Administrator on 2017/11/25.
 */

sellerApp.onPageInit("business-analysis", function(e) {
    $$(".test").click(function () {
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
            toolbox: {
                feature: {
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            legend: {
                data:['销售量','销售额($)']
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['外卖','点餐','订座'],
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '销售量',
                    min: 0,
                    max: 250,
                    interval: 50,
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                {
                    type: 'value',
                    name: '销售额($)',
                    min: 0,
                    max: 1000,
                    interval: 100,
                    axisLabel: {
                        formatter: '{value}   '
                    }
                }
            ],
            series: [
                {
                    name:'销售量',
                    type:'bar',
                    data:[200, 100, 250],
                    label: {
                        normal: {
                            show: true,
                            position: 'insideTop'
                        }
                    }
                },
                {
                    name:'销售额($)',
                    type:'bar',
                    data:[30, 200, 100],
                    label: {
                        normal: {
                            show: true,
                            position: 'insideTop'
                        }
                    },
                }

            ]
        };
        // 为echarts对象加载数据
        myChart.setOption(option);
    })
});


