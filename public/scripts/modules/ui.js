
define('ui', ['dataservice', 'jquery', 'doT', 'sammy', 'core', 'bootstrap'], function(dataservice, $, doT, sammy){

    var templates = {};
    templates.link = doT.template($("#template-link").text());
    templates.message = doT.template($("#template-message").text());
    templates.comment = doT.template($("#template-comment").text());

    function showError(message) {
        $("#content").prepend($(templates.message(message)).addClass("alert-danger"));
    }

    function showInfo(message) {
        $("#content").prepend($(templates.message(message)).addClass("alert-info"));
    }
   
});
