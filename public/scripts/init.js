//This function is called when scripts/helper/util.js is loaded.
//If util.js calls define(), then this function is not fired until
//util's dependencies have loaded, and the util argument will hold
//the module value for "helper/util".

//alert("init required");

(function ($) {
    $.support.cors = true;
    //TODO create DataService
    
    window.data = $.fn.DataService();  //exist till the site is changed
    //sessionStorage.dataService = $.fn.DataService();  //stores data for one session
    //localStorage.dataService = $.fn.DataService();  //stores data with no expiration date
    
    var links = window.data.getLinkEntries();
    links.then(function(entries){
    	$.each(entries, function(i, field){
    		console.log(field.url);
    	});
    });

    
    $.ajaxSetup({
        cache: false
    });

})(jQuery);
