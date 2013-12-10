define('modules/dataService', ['jquery', 'modules/core'], function ($) {

    var dataservice = {
        links: {
            getAll: function() {
                return $.getJSON('/entries');
            },
            get: function(id) {
                return $.getJSON('entry/' + id);
            },
            add: function(newTitle, newUrl) {
            	$.post("login", { title: newTitle, url: newUrl }, function(newLink){
            		console.log(newLink.url);
            	});
            },
            testFunction: function() {
            	return "Text Return";
            },
        },

        user: {
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

    }

    return dataservice;
});