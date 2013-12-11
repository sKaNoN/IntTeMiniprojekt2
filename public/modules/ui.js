define('modules/ui', ['jquery', 'doT', 'sammy', 'modules/dataService', 'modules/core'], function( $,  doT, sammy, dataservice){

    var linktemplate = doT.template($("#templateLink").text());

    function sortByRating(a, b) { // createTime is a string at this point - json ftw
        return a.rating.value == b.rating.value ? b.createTime.localeCompare(a.createTime) : b.rating.value - a.rating.value;
    }


    var ui = {

        hideAll : function() {
            $('#main >  div').addClass('hidden');
        },

        showLinks : function() {
            dataservice.links.getAll().then(function(data){
                $("#links").empty();
                $.each(data.sort(sortByRating), function(index, link) {
                    $("#links").append(linktemplate(link));
                });
            });
        },

        showComments : function() {
            dataservice.comments.getAll().then(function(data){
                $("#comments").empty();
                $.each(data.sort(sortByRating), function(index, link) {
                    $("#comments").append(commenttemplate(link));
                });
            });
        },

        logIn : function() {
            dataservice.users.login($('#loginUser').val(), $('#loginPwd').val());

            //provisorisch:
            $('#logout').removeClass('hidden');
            $('#login').addClass('hidden');

        },

        logOut : function() {
            dataservice.users.logout();
            $('#login').removeClass('hidden');
            $('#logout').addClass('hidden');
        },

       showRegister : function() {
           $("#register").removeClass("hidden");
       },

       showLinkSubmit : function() {
           $("#linkSubmit").removeClass("hidden");
       }
    }

    return ui;
});