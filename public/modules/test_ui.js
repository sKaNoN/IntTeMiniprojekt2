define('modules/test_ui', ['modules/dataService', 'jquery'], function(dataservice, $){

    var ui = {
        test : function() {
            console.log("in ui test");
            
            var testOut = dataservice.links.testFunction();
            console.log(testOut);
        },
    };

    return ui;
});