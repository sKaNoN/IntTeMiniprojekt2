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


define(['jquery', 'modules/ui', 'modules/test_ui', 'sammy', 'socket.io'], function($, ui, test_ui, sammy, io) {

    ui.init();

    var socket = io.connect('http://localhost:4730');
    socket.on('message', function(message){
        //$.event.trigger({ type: message.action.toLowerCase(), what: message.type, id: message.id });
        console.log("Message recieved: " + message.action.toLowerCase());
        
        switch(message.action)
        {
        case "AddLink":
        case "AddComment":
        case "Rated":
        	ui.refresh();
        	break;
        case "connected":
        case "disconnect":
        default:
        	console.log("no refresh required");
        }
        
        
    });

	//test_ui.test();

    var app = sammy("body", function(){
        this.get("#/", function(context){ ui.showLinks();});
        this.get("#/login", function(context) {ui.logIn();});
        this.get("#/logout", function(context) {ui.logOut();});
        this.get("#/register", function(context) {ui.showRegister();});
        this.get("#/registered", function(context) {ui.register();});
        this.get("#/linkSubmit", function(context) {ui.showLinkSubmit();});
        this.get("#/addedLink", function(context) {ui.submitLink();});
        this.get("#/link/:id", function(context) {ui.showComments(this.params.id);});
        this.get("#/link/:id/voteUp", function(context) {ui.linkVoteUp(this.params.id);});
        this.get("#/link/:id/voteDown", function(context) {ui.linkVoteDown(this.params.id);});
        this.get("#/link/:id/comment", function(context) {ui.commentLink(this.params.id);});
        this.get("#/comment/:id/voteUp", function(context) {ui.commentVoteUp(this.params.id);});
        this.get("#/comment/:id/voteDown", function(context) {ui.commentVoteDown(this.params.id);});
        //this.get("#/comment/:id/comment", function(context) {ui.commentComment(this.params.id);});

        this.bind("register-success", function() {this.redirect("#/");});
        this.bind("register-failed", function() {this.redirect("#/register");});
        this.bind("login-success", function() {this.redirect("#/");});
        this.bind("login-failed", function() {this.redirect("#/");});
        this.bind("logout", function() {this.redirect("#/");});
        this.bind("link-created", function() {this.redirect("#/");});
    });

    app.run("#/");

});