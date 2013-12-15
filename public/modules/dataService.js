﻿define('modules/dataService', ['jquery', 'modules/core'], function ($) {

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
            	$.post("entry", { title: newTitle, url: newUrl }, function(newLink){
            		console.log("Created new Link: " + newLink.url);
                    $.event.trigger({ type: "link-created"});
            	});
            },
            voteup: function(id) {
            	$.post("entry/" + id + "/up", {}, function(){
            		console.log("Link voted up");
            	});
            },
            votedown: function(id) {
            	$.post("entry/" + id + "/down", {}, function(){
            		console.log("Link voted down");
            	});
            }
        },
        
        comments: {
        	addToLink: function(id, text) {
            	$.post("entry/" + id + "/comment", {text: text}, function(){
            		console.log("Link comment added");
            	});
        	},
        	addToComment: function(id, text) {
            	$.post("comment/" + id + "/", {text: text}, function(){
            		console.log("Comment comment added");
            	});
        	},
        	voteup: function(id) {
            	$.post("comment/" + id + "/up", {}, function(){
            		console.log("Comment voted up");
            	});
            },
            votedown: function(id) {
            	$.post("comment/" + id + "/down", {}, function(){
            		console.log("Comment voted down");
            	});
            }
        },

        users: {
            login: function(username, password) {
                console.log("Try login: " + username + " pw: " + password);
                $.post("login", { name: username, password: password }, function(success){
                    if (success === true) {
                        $.event.trigger({ type: "login-success", name: username });
                        console.log("Login success");
                    } else {
                        $.event.trigger({ type: "login-failed" });
                        console.log("Login failed");
                    }
                });
            },
            logout: function() {
            	$.post("logout", {}, function(success){
                    if (success === true) {
                        $.event.trigger({ type: "logout"});
                        console.log("Log Out success");
                    } else {
                        console.log("Log Out failed");
                    }
                });
            },
        	register: function(username, password) {
        		console.log("Register: " + username + " pw: " + password);
        		$.post("register", { name: username, password: password }, function(success){
                    if (success === true) {
                        $.event.trigger({ type: "register-success", name: username });
                        console.log("Register success");
                    } else {
                        console.log("Register failed");
                    }
                });
        	},
        	getAll: function() {
        		console.log("Read all Users");
        		return $.getJSON('/users');
        	},
            foreach: function(callback) {
            	var entries = $.getJSON('/users');
            	entries.then(callback);
            }
        }

    };

    return dataservice;
});