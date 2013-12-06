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

