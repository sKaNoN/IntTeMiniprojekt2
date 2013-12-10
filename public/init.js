(function () {
    requirejs.config({
        paths: {
            jquery: 'Libs/jquery-2.0.3',
            doT: 'Libs/doT',
            bootstrap: 'Libs/bootstrap/js/bootstrap.min',
            sammy: 'Libs/sammy',
            'socket.io': '/socket.io/socket.io'
        }
    });
})();


define(['modules/ui', 'sammy', 'socket.io'], function(ui, sammy, io) {

    var socket = io.connect('http://localhost:4730');
    socket.on('message', function(message){
        $.event.trigger({ type: message.action.toLowerCase(), what: message.type, id: message.id });
    });

    var app = sammy("body", function(){
        this.get("#/", function(ctx){ ui.showLinks(); });
    });

    app.run("#/");

});

