﻿(function ($) {
    $.support.cors = true;
    //TODO create DataService
    //window.data = $.fn.DataService();  //exist till the site is changed
    //sessionStorage.dataService = $.fn.DataService();  //stores data for one session
    //localStorage.dataService = $.fn.DataService();  //stores data with no expiration date
    
    alert("test");
    
    $.ajaxSetup({
        cache: false
    });

})(jQuery);
