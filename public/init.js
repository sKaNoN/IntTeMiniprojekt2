﻿(function () {
    requirejs.config({
        paths: {
            jquery: 'Libs/jquery-2.0.3',
            doT: 'Libs/doT',
            bootstrap: 'Libs/bootstrap/js/bootstrap.min',
            sammy: 'Libs/sammy',
            ko: 'Libs/knockout-3.0.0'
        }
    });
})();


define(['modules/ui', 'ko', 'bootstrap'], function(ui, ko, bs) {
    bs.run();
    ko.applyBindings(new ui());
});

/*
    (function ($) {
    $.support.cors = true;
    //TODO create DataService
    //window.data = $.fn.DataService();  //exist till the site is changed
    //sessionStorage.dataService = $.fn.DataService();  //stores data for one session
    //localStorage.dataService = $.fn.DataService();  //stores data with no expiration date
    
//    alert("test");
    
    $.ajaxSetup({
        cache: false
    });

})(jQuery);
*/
