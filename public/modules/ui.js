define('modules/ui', ['jquery', 'doT', 'sammy', 'modules/dataService', 'modules/core'], function ($, doT, sammy, dataservice) {

    var templates = {};
    templates.link = doT.template($("#templateLink").text());
    templates.comment = doT.template($("#templateComment").text());
    templates.commentEditor = doT.template($("#templateCommentEdit").text());
    
    var currentLink = -1;


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

    function checkUser() {
        if (dataservice.users.loggedIn()) {
            show('#logout');
            hide('#login');
        } else {
            hide('#logout');
            show('#login');
        }
    }

    function showError(info, text) {
        $('#alert').removeClass('alert-success');
        $('#alert').addClass('alert-danger');
        $('#alert').empty();
        var message = "<p> <strong>" + info +"</strong>"+text+"</p>";
        $('#alert').append(message);
        show('#alert');
    }

    function showSuccess(info) {
        $('#alert').removeClass('alert-danger');
        $('#alert').addClass('alert-success');
        $('#alert').empty();
        var message = "<p> <strong>" + info +"</strong></p>";
        $('#alert').append(message);
        show('#alert');
    }

    var ui = {

        logIn: function () {
            dataservice.users.login($('#loginUser').val(), $('#loginPwd').val());
        },

        logOut: function () {
            dataservice.users.logout();
        },

        showRegister: function () {
            hideAll();
            checkUser();
            if (!dataservice.users.loggedIn()) {
                show('#register');
            }
        },

        register: function () {
            if ($('#regPwd').val() == $('#regPwd2').val()) {
                dataservice.users.register($('#regUser').val(), $('#regPwd').val());
            } else {
                sammy("body").trigger("register-failed");
                showError("Registration failed: ", "Passwords do not match!");
            }
        },

        showLinks: function () {
            hideAll();
            checkUser();
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
            checkUser();
            if (dataservice.users.loggedIn()) {
                show('#submitLink');
            }
        },

        submitLink: function () {
            dataservice.links.add($('#linkTitle').val(), $('#linkURL').val());
        },

        linkVoteUp: function (id) {
            dataservice.links.voteup(id);
            this.showLinks();
        },

        linkVoteDown: function (id) {
            dataservice.links.votedown(id);
            this.showLinks();
        },
        showComments: function (linkId) {
            hideAll();
            checkUser();
        	var printComment = function(comment, level) {
        		
        		comment.margin = level;
        		$("#comments").append(templates.comment(comment));
        		
        		$.each(comment.comments.sort(sortByRating), function(index, c) {
        			printComment(c, level+1);
                });
        	};
            var link = dataservice.links.get(linkId);
            link.then(function (link) {

            	$("#comments").empty();
            	$("#comments").append(templates.link(link));
                if (dataservice.users.loggedIn()) {
                 $("#comments").append(templates.commentEditor(link));
                }
            
                $.each(link.comments.sort(sortByRating), function (index, comment) {
                	printComment(comment, 1);
                });
            });
            currentLink = linkId;
            show('#comments');
        },  
        commentLink: function (id) {
            dataservice.comments.addToLink(id, $('#submitComment').val());
            this.showComments(currentLink);
        },

        commentVoteUp: function (id) {
            dataservice.comments.voteup(id);
            this.showComments(currentLink);
        },

        commentVoteDown: function (id) {
            dataservice.comments.votedown(id);
            this.showComments(currentLink);
        },

        commentComment: function (id) {
            dataservice.comments.addToComment(id, $('#submitComment').val());
            this.showComments(currentLink);
        },

        init : function() {
            $(document).on("login-success", function (user) {
                $("#user_name").text(user.name);
                sammy("body").trigger("login-success");
                showSuccess("Login successful");
            });

            $(document).on("login-failed", function () {
                sammy("body").trigger("login-failed");
                showError("Login failed: ", "Invalid username or password.");
            });

            $(document).on("logout", function () {
                sammy("body").trigger("logout");
            });

            $(document).on("register-success", function () {
                sammy("body").trigger("register-success");
                showSuccess("Registration successful");
            });

            $(document).on("register-failed", function () {
                sammy("body").trigger("register-failed");
                showError("Registration failed: ", "Make sure you provided both a username and a password, or try a different username.");
            });

            $(document).on("link-created", function () {
                sammy("body").trigger("link-created");
                showSuccess("Link submitted");
            });
        }
    }

    return ui;
});