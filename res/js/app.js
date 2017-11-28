import 'framework7';
var $$ = window.Dom7;
import "./init";
import "./login";
import "./order";

//样式控制
$$(".popover").on('open',function(){
    $$(this).css({
        top: ' 5rem',
        width: '10rem'
    })
});





