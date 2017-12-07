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
    `
}