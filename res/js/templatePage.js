export default {
    panneltemplate:`
     <div class="list-block">
            <ul>
                <li >
                    <a class=" item-content">
                        <div class="item-inner">
                            <div>{{goods_type}}({{category}}：{{totalcategory}},{{saleIng}}：{{countOn}})</div>
                        </div>
                    </a>
                </li>
            </ul>
        </div>

        <div class="list-block">
            <ul>
             {{#each panelData}}
                <li data-name="{{name}}" data-id="{{id}}" class="categoryItem" >
                    <a class="item-link item-content">
                        <div class="item-inner">
                            <div class="item-title">{{name}}</div>
                            <div class="item-after"><span class="badge">{{count}}</span></div>
                        </div>
                    </a>
                </li>
                  {{/each}}
            </ul>
        </div>
        <div class="list-block SHJ_manage_catg">
            <ul>
                <li >
                    <a href="res/html/category_management.html" class=" item-content">
                        <div class="item-inner">
                            <div>{{manage_category}}</div>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    `,
    storeManageList:`
     <ul>
        {{#each storList}}
        <li>
            <div class=" SHJ_border">
                <div class="item-content">
                    <div class="item-media">
                        <img width="100" height="100" class="item_img" src="{{logo}}">
                    </div>
                    <div class="item-inner">
                        <div class="item-title-row">
                            <div class="item-title">{{name}}</div>
                        </div>
                        <div class="item-text"></div>
                        <div class="item-subtitle">
                            <div>
                                <i class="icon iconfont icon-wodeshj-icon-me-un"></i>
                                <label >{{peopleNum}}</label>
                                <div class="row SHJ_float_right">
                                    <div class="content-block">
                                        {{#if isOpen}}
                                         <a class="button  button-raised changeStoreStatus" data-status ="{{isOpen}}" data-id ="{{id}}" >{{open}}</a>
                                        {{else}}
                                        <a class="button  button-raised changeStoreStatus"  data-status ="{{isOpen}}"  data-id ="{{id}}" >{{close}}</a>
                                        {{/if}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
        {{/each}}

    </ul>
    `,
    noShop:`
       <div class="navbar">
                <div class="navbar-inner">
                    <div class="left"></div>
                    <div class="center">{{no_shop}}</div>
                </div>
            </div>
            <div class="item-content">
                <div class="item-media SHJ_padding_left_1em">	<i class="icon iconfont icon-wodeshj-icon-me-un SHJ_big_icon"></i></div>
                <div class="item-inner">
                    <div class="item-input ">
                        <input class="SHJ_border loginInfo" value="18328412017" type="text" name="userName">
                    </div>
                </div>
            </div>
            <div class="page-content">
                 <div class="content-block">
                    <a  id="change_user" class="button button-big button-raised button-fill ">{{switch_accont}}</a>
                </div>
                <div class="content-block">
                    <a  id="check_out-app"    class="button button-big button-raised button-fill " >{{log_out}}</a>
                </div>
            </div>
           
    `,
    addGoodsTypeMoadl:`
   
            <ul class="SHJ_padding0">
                <li class="SHJ_delete_listStyle SHJ_margin_bottom_1rem">
                  <div class="item-content">
                    <div class="item-inner">
                      <div class="item-title label" id="goodsTypeName_CN"></div>
                      <div class="item-input SHJ_border">
                        <input class="SHJ_input_style " type="text" name="typeName" >
                      </div>
                    </div>
                  </div>
                </li>
                <li class="SHJ_delete_listStyle">
                  <div class="item-content">
                    <div class="item-inner">
                      <div class="item-title label" id="goodsTypeName_EN"></div>
                      <div class="item-input SHJ_border">
                         <input class="SHJ_input_style" type="text" name="typeName" >
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
    `,
    //定做订单列表单条记录模板
    booking_order_template: `
     <li>
            <ul class="SHJ_padding0">
                <li class="item-content">
                    <div class="item-inner">
                        <div class="item-title"><span>预约</span>:{{formateMealAt}}</div>
                        <div class="item-after">待结单</div>
                    </div>
                </li>
                <li class="item-content">
                    <div class="item-inner">
                      {{#if hasSex}}
                         {{#if isFemale}}
                          <div class="item-title">{{bookingName}}<span>女士</span></div>
                          {{else}}
                           <div class="item-title">{{bookingName}}<span>先生</span></div>
                          {{/if}}
                      {{else}}
                       <div class="item-title">{{bookingName}}</div>
                       {{/if}}
                        <div class="item-after">
                            <a href="tel:{{mobile}}">
                                <div class="SHJ__phone_style">
                                    <i class="icon  iconfont  icon-dianhuashj-icon-tel"></i>
                                </div>
                            </a>
                        </div>
                    </div>
                </li>
                <li style="padding-left:16px;padding-right: 16px;">
                    <p class="buttons-row" >
                        <a href="#" class="button button-raised" data-id="{{id}}">接单</a>
                        <a href="#" class="button button-raised" data-id="{{id}}">拒单</a>
                    </p>
                </li>
            </ul>
        </li>
    `
}