(function () {
    requirejs.config({
        paths: {
            jquery: 'Libs/jquery-2.0.3',
            doT: 'Libs/doT',
            bootstrap: 'Libs/bootstrap/js/bootstrap.min',
            sammy: 'Libs/sammy',
        }
    });
})();


define(['modules/ui', 'sammy', 'bootstrap'], function(ui, sammy) {


    var app = sammy("body", function(){
        this.get("#/", function(){ ui.showLinks();});
    });

    app.run("#/");

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
