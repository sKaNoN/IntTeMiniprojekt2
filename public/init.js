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


define(['modules/ui', 'modules/test_ui', 'sammy', 'bootstrap'], function(ui, test_ui, sammy) {

	test_ui.test();

    var app = sammy("body", function(){
        this.get("#/", function(){ ui.showLinks();});
    });

    app.run("#/");

});

