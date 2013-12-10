define('modules/dataService', ['jquery', 'modules/core'], function ($) {

    var dataservice = {
        links: {
            getAll: function() {
                return $.getJSON('/entries');
            },
            foreach: function(callback) {
            	var entries = $.getJSON('/entries');
            	entries.then(callback);
            },
            get: function(id) {
                return $.getJSON('entry/' + id);
            },
            add: function(newTitle, newUrl) {
            	console.log("start add new Link (tuet nöd wil nöd igloggt");
            	$.post("entry", { title: newTitle, url: newUrl }, function(newLink){
            		console.log("Created new Link: " + newLink.url);
            	});
            },
            voteup: function(id) {
            	$.post("entry/" + id + "/up", {}, function(){
            		console.log("Link voted up");
            	});
            },
            testFunction: function() {
            	return "Text Return";
            }
        },

        users: {
            login: function(username, password) {
                $.post("login", { name: username, password: password }, function(success){
                    if (success === true) {
                        $.event.trigger({ type: "login", name: username });
                    } else {
                        $.event.trigger({ type: "login-failed" });
                    }
                });
            }
        }

    };

    return dataservice;
});