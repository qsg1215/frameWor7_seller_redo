/**
 * Created by Administrator on 2017/11/26.
 */
import  axios from 'axios';
import {sellerApp} from '../../res/js/init'
import {alert} from './Util';

import  md5Hex  from 'md5-hex';
import {requestConfig} from '../../libs/js/request';

var baseUrlConfigCommon = '/common/';
var baseUrlConfigCate = '/cate/';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    sellerApp.showIndicator()
    return config;
}, function (error) {
    alert(error)
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    console.log('======>接口地址',response.request.responseURL)
    console.log('======>返回数据',response.data)
    if(response.data.code >300 ){
        alert(response.data.msg)
       return Promise.reject(response.data);
    }
    sellerApp.hideIndicator();
    return response;
}, function (error) {
    alert(error)
    return Promise.reject(error);
});

//登录
export function login(data){
    data.password = md5Hex (data.password).toUpperCase();
    const promise = new Promise(function(resolve, reject){
        axios(baseUrlConfigCommon+'merchant_shop_user_login',requestConfig(data,'post'))
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            });
    });
    return promise;
};

//获取店铺列表
export function get_shop_list(data){
    //回到页面没有重新引入util,所以要手动更新
    if(localStorage.lang){
        var  lang = localStorage.lang == 'CH'? 'zh_CN' : 'en_US';
    }else{
        var lang  =  navigator.language == 'zh-CN' ? 'zh_CN' : 'en_US';
    }

    var token = localStorage.jwt;

    var config = requestConfig(data,'post',token);
    config.headers.language = lang
    const promise = new Promise(function(resolve, reject){
        axios(baseUrlConfigCommon+'shop/get_shops_list',config)
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            });
    });
    return promise;
};

/*var status = {
    waitOrder:'S_WAITRECEIVE', //'待结单'
    waitPay:'S_WAITINVOIC',  //'待结账'
    ing:'S_ING', //进行中
    complete: 'S_COMPLETE', //'已完成'
    cancel:'S_CANCLE'//已取消

}*/

/*
获取订单列表
* @parm
* orderType:订单类型
*     TAKEAWAY: 外卖;
*     MEAL: 点餐
*     BOOKING: 订座;
*
* */
export function get_order(orderType,data){
    //设置默认值
     data.status ? data.status = data.status :  data.status = 'S_WAITRECEIVE'
     data.start ? data.start = data.start : data.start = 0;
     data.limit ? data.limit = data.limit : data.limit = 10;

    var token = localStorage.jwt;
    var address ;
    switch(orderType)
    {
        case 'TAKEAWAY':
            address =  'takeOutOrder/byShop'
            break;
        case 'MEAL':
            address =  'mealOrder/byShop4Web'
            break;
        case 'BOOKING':
            address = 'bookingOrder/byShop'
            break;
        default:
    };
    const promise = new Promise(function(resolve, reject){
        axios(baseUrlConfigCate+address,requestConfig(data,'get',token))
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            });
    });
    return promise;
};

//获取验证码
export function get_SMScode(data){
    data.type = 'T_CHANGE_PWD';
    const promise = new Promise(function(resolve, reject){
        axios(baseUrlConfigCommon+'smsCode',requestConfig(data,'post'))
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function (error) {
               // reject(error);
            });
    });
    return promise;
};

//获取验证码
export function reset_password(data){
    data.type = 'T_CHANGE_PWD';
    const promise = new Promise(function(resolve, reject){
        axios(baseUrlConfigCommon+'auth/password',requestConfig(data,'put'))
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function (error) {
                 reject(error);
            });
    });
    return promise;
};

//获取电铺下的商品分类

export function get_goods_type(data) {
    const promise = new Promise(function(resolve, reject){
        axios(baseUrlConfigCate+'dishesType/shop/'+data.shopId,requestConfig(data,'get'))
            .then(function(response) {
                var lang = requestConfig(data,'get').headers.language;
                if(lang == 'en_US'){
                    response.data.data = response.data.data.map(function (item) {item.name  = item.nameEng;return item})
                }
                resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            });
    });
    return promise;
}
//统计电铺下面的菜品种类
export function get_category_number(data) {


    const promise = new Promise(function(resolve, reject){
        axios(baseUrlConfigCate+'dishes/count/shop/'+data.shopId,requestConfig(data,'get'))
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            });
    });
    return promise;
};

//一次拿取所有数据
export function get_order_page_data() {
    const promise = new Promise(function(resolve, reject){
    var allData = {};
    function get_shop_List() {
    var postData = {
        id: sellerApp.globalData.userInfo.info.id,
        role:sellerApp.globalData.userInfo.role
    };
    if(localStorage.lang){
        var  lang = localStorage.lang == 'CH'? 'zh_CN' : 'en_US';
    }else{
        var lang  =  navigator.language == 'zh-CN' ? 'zh_CN' : 'en_US';
    }
    var token = localStorage.jwt;
    var config = requestConfig(postData,'post',token);
    config.headers.language = lang
    const promise = new Promise(function(resolve, reject){
        axios(baseUrlConfigCommon+'shop/get_shops_list',config)
            .then(function(response) {
                 //储存用户的店铺列表到全局
                sellerApp.globalData.shopList = response.data.data;
                sellerApp.globalData.currentShop = response.data.data[0];
                resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            });
    });
    return promise;
  };
    function get_order_number_and_category(getData) {
        function get_order_number(data,orderType) {
            //设置默认值
            data.status ? data.status = data.status :  data.status = 'S_WAITRECEIVE'
            data.start ? data.start = data.start : data.start = 0;
            data.limit ? data.limit = data.limit : data.limit = 10;

            var token = localStorage.jwt;
            var address ;
            switch(orderType)
            {
                case 'TAKEAWAY':
                    address =  'takeOutOrder/byShop'
                    break;
                case 'MEAL':
                    address =  'mealOrder/byShop4Web'
                    break;
                case 'BOOKING':
                    address = 'bookingOrder/byShop'
                    break;
                default:
            };
            return axios(baseUrlConfigCate+address,requestConfig(data,'get',token))
                .then(function(response) {
                    allData[orderType] =   response.data;
                })
                .catch(function (error) {
                    reject(error);
                });
        };
        function get_goods_type(data) {
            return  axios(baseUrlConfigCate+'dishesType/shop/'+data.shopId,requestConfig(data,'get'))
                .then(function(response) {
                    var lang = requestConfig(data,'get').headers.language;
                    if(lang == 'en_US'){
                        response.data.data = response.data.data.map(function (item) {item.name  = item.nameEng;return item})
                    }
                    allData.categoryData = response.data;
                })
                .catch(function (error) {
                    reject(error);
                });
        };
        const promise = new Promise(function(resolve, reject){
            axios.all([get_order_number(getData,'TAKEAWAY'),get_order_number(getData,'MEAL'),get_order_number(getData,'BOOKING') ,get_goods_type({shopId:getData.shopId})])
                .then(axios.spread(function (acct, perms) {
                   resolve(allData) // 两个请求现在都执行完成
                }))
                .catch(function (error) {
                    reject(error);
                });;
        });
        return promise;
    }
    function get_category_number(data) {
        const promise = new Promise(function(resolve, reject){
            axios(baseUrlConfigCate+'dishes/dishType/'+data.id,requestConfig(data,'get'))
                .then(function(response) {
                    allData.categoryListTypeData =  response.data;
                    resolve(allData);
                })
                .catch(function (error) {
                    reject(error);
                });
        });
        return promise;
    };
    get_shop_List().then((res)=>{
        allData.storeList = res;
        return res.data[0].id;
    })
    .then((res)=>{
       var getData = {shopId:res}
        return  get_order_number_and_category(getData)
    })
    .then((res)=>{
      var postData = {
          id:res.categoryData.data[0].id
      };
      return get_category_number(postData)
    }).
        then((allData)=>{
        resolve(allData)
    }).catch(function (error) {
        reject(error);
    });
    });
    return promise;
};

//排序后的结果统计
export function sort_category_number(data) {
    const promise = new Promise(function(resolve, reject){
        axios(baseUrlConfigCate+'dishesType/batch',requestConfig(data,'put'))
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            });
    });
    return promise;
}

//修改营业状态
export  function modify_store_status(data) {
    const promise = new Promise(function(resolve, reject){
        axios(baseUrlConfigCommon+'shop/modify/status',requestConfig(data,'put'))
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            });
    });
    return promise;
}

//获取分类下面的菜品列表
export  function get_under_category_dishesList(data) {
    const promise = new Promise(function(resolve, reject){
        axios(baseUrlConfigCate+'dishes/dishType/'+data.id,requestConfig(data,'get'))
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            });
    });
    return promise;
}

//修改密码
export  function change_password (data) {
    const promise = new Promise(function(resolve, reject){
        axios(baseUrlConfigCommon+'user/modifyPasswordByOld',requestConfig(data,'put'))
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            });
    });
    return promise;
}

//删除菜分类
export function delete_dishesType(urldata,data) {
    const promise = new Promise(function(resolve, reject){
        axios(baseUrlConfigCate+'dishesType/' + urldata.shopId + "/shop/" + urldata.id,requestConfig(data,'put'))
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function (error) {
                sellerApp.hideIndicator();
               // reject(error);
            });
    });
    return promise;
}
//获取外卖店铺统计情况
export function get_store_sale(data) {
    const promise = new Promise(function(resolve, reject){
        axios(baseUrlConfigCate+'takeOutOrder/stat4shop',requestConfig(data,'get'))
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function (error) {
               reject(error);
            });
    });
    return promise;
}







