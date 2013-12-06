define('ui', ['modules/dataservice', 'jquery', 'doT', 'sammy', 'modules/core', 'bootstrap'], function(dataservice, $,  doT, sammy){

    var linktemplate = doT.template($("templateLink").text());

    function sortByRating(a, b) { // createTime is a string at this point - json ftw
        return a.rating.value == b.rating.value ? b.createTime.localeCompare(a.createTime) : b.rating.value - a.rating.value;
    }


    var ui = {
        login : function() {
            dataservice.user.login($("#loginUser").val(), $("#loginPwd").val());
            $('.dropdown.open .dropdown-toggle').dropdown('toggle'); // close dropdown
            $("#login input[type!='submit']").val('');
        },

        showLinks : function() {
            dataservice.entry.getAll().then(function(data){
                $("#links").empty();
                $.each(data.sort(sortByRating), function(index, link) {
                    $("#links").append(linktemplate(link));
                });
            });
        }
    }

    return ui;
});