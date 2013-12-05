define('dataservice', ['jquery', 'modules/core'], function ($) {

    var dataservice = {
        entry: {
            getAll: function() {
                return $.getJSON('entries');
            }
        }

    }

    return dataservice;
});