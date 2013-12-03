
define('ui', ['dataservice', 'jquery', 'doT', 'sammy', 'core', 'bootstrap'], function(dataservice, $, doT, sammy){

    function showError(message) {
        $("#content").prepend($(templates.message(message)).addClass("alert-danger"));
    }

    function showInfo(message) {
        $("#content").prepend($(templates.message(message)).addClass("alert-info"));
    }


});
