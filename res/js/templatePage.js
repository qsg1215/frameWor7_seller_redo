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
                <li >
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
    `
}