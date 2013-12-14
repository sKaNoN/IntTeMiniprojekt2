define('modules/ui', ['jquery', 'doT', 'sammy', 'modules/dataService', 'modules/core'], function ($, doT, sammy, dataservice) {

    var templates = {};
    templates.link = doT.template($("#templateLink").text());
    templates.comment = doT.template($("#templateComment").text());
    templates.commentEditor = doT.template($("#templateCommentEdit").text());


    function sortByRating(a, b) { // createTime is a string at this point - json ftw
        return a.rating.value == b.rating.value ? b.createTime.localeCompare(a.createTime) : b.rating.value - a.rating.value;
    }

    function hideAll() {
        $('#main >  div').addClass('hidden');
    }

    function hide(container) {
        $(container).addClass("hidden");
    }

    function show(container) {
        $(container).removeClass("hidden");
    }

    var ui = {

        logIn: function () {
            dataservice.users.login($('#loginUser').val(), $('#loginPwd').val());
        },

        logOut: function () {
            dataservice.users.logout();
            hide('#logout');
            show('#login');
        },

        showRegister: function () {
            hideAll();
            show('#register');
        },

        register: function () {
            dataservice.users.register($('#regUser').val(), $('#regPwd').val());
        },

        showLinks: function () {
            hideAll();
            dataservice.links.getAll().then(function (data) {
                $("#links").empty();
                $.each(data.sort(sortByRating), function (index, link) {
                    $("#links").append(templates.link(link));
                });
            });
            show('#links');
        },

        showLinkSubmit: function () {
            hideAll();
            show('#submitLink');
        },

        submitLink: function () {
            dataservice.links.add($('#linkTitle').val(), $('#linkURL').val());
        },

        linkVoteUp: function (id) {
            dataservice.links.voteup(id);
        },

        linkVoteDown: function (id) {
            dataservice.links.votedown(id);
        },

        /*
        showComments: function (linkId) {
            hideAll()
            dataservice.comments.getAll(linkId).then(function (data) {
                $("#comments").empty();
                $.each(data.sort(sortByRating), function (index, comment) {
                    $("#comments").append(commenttemplate(comment));
                });
            });
            show('#comments');
        },
        */
        
        //untested show comments (mir fehlt style.css)
        showComments: function (linkId) {
            hideAll();
        	var printComment = function(comment, level) {
        		//TODO: Einrücken über CSS oder HTML (level gibt an wie viel)
        		$("#comments").append(commenttemplate(comment));
        		$.each(node.comments, function(index, c) {
        			printComment(c, level+1);
                });
        	};
            var link = dataservice.links.get(linkId);
            link.then(function (data) {
            	$("#comments").empty();
            	$("#comments").append(templates.link(link));
            
                $.each(link.comments.sort(sortByRating), function (index, comment) {
                	printComment(comment, 1);
                });
            });
            show('#comments');
        },  
        //end untested

        comment: function (id) {
            dataservice.comments.addToLink(id, $('#submitComment').val());
        },

        commentVoteUp: function (id) {
            dataservice.comments.voteup(id);
        },

        commentVoteDown: function (id) {
            dataservice.comments.votedown(id);
        },

        init : function() {
            $(document).on("login-success", function (user) {
                $("#user_name").text(user.name);
                hide("#login");
                show("#logout");
                sammy("body").trigger("login-success");
            });

            $(document).on("login-failed", function () {
                alert("Login failed: Invalid username or password.");
                sammy("body").trigger("login-failed");
            })

            $(document).on("logout", function () {
                show("#login");
                hide("#logout");
                sammy("body").trigger("logout");
            });

            $(document).on("register-success", function () {
                alert("Registration successful")
                sammy("body").trigger("register-success");
            });

            $(document).on("register-failed", function () {
                alert("Registration failed: Make sure you provided both a username and a password, or try a different username.");
            });

            $(document).on("link-created", function () {
                sammy("body").trigger("link-created");
            })
        }
    }

    return ui;
});