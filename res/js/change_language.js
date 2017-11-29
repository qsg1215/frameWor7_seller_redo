import {tempaltePage,merageLanguage,loadPage} from '../../libs/js/Util';
import {login} from '../../libs/js/API';
import {sellerApp,$$} from './init';


sellerApp.onPageInit('change_language',function () {
    var lang = localStorage.lang,
        langType = localStorage.langType
    var change_language_data = {
        iSauto: !lang || langType ,
        iSchinese:lang && lang == 'CH',
        iSenglish:lang && lang == 'EN',
    };
    var  change_language_Page =  merageLanguage('change_language',change_language_data);
    tempaltePage(change_language_Page,'.page[data-page="change_language"]','change_language');
    $$('#confirm_lang').click(function () {
        var langType = $$("input[name='change_lang']:checked").val();
        console.log(langType);
        (langType == 'EN' ||  langType == 'CH') ? localStorage.lang = langType : localStorage.langType = langType;
        localStorage.removeItem('langType');
        if(langType == 'auto'){
            localStorage.removeItem('lang');
        }
        loadPage('./res/html/order.html');
    })
})
