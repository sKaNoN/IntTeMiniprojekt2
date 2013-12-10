(function () {
    requirejs.config({
        paths: {
            jquery: 'Libs/jquery-2.0.3',
            doT: 'Libs/doT',
            bootstrap: 'Libs/bootstrap/js/bootstrap.min',
            sammy: 'Libs/sammy',
            'socket.io': '/socket.io/socket.io'
        },
        shim: {
            "bootstrap": { deps: ['jquery'], exports: '$.fn.dropdown' }
        }
    });
})();


define(['modules/ui', 'modules/test_ui', 'sammy', 'socket.io'], function(ui, test_ui, sammy, io) {

    var socket = io.connect('http://localhost:4730');
    socket.on('message', function(message){
        $.event.trigger({ type: message.action.toLowerCase(), what: message.type, id: message.id });
        console.log("Message recieved: " + message.action.toLowerCase());
    });

	test_ui.test();

    var app = sammy("body", function(){
        this.get("#/", function(){ ui.showLinks();});
    });

    app.run("#/");

});