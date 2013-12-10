define('modules/dataService', ['jquery', 'modules/core'], function ($) {

    var dataservice = {
        link: {
            getAll: function() {
                return $.getJSON('/entries');
            },
            get: function(id) {
                return $.getJSON('entry/' + id);
            }
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