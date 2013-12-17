define('modules/ui', ['jquery', 'doT', 'sammy', 'modules/dataService', 'modules/core'], function ($, doT, sammy, dataservice) {

    var templates = {};
    templates.link = doT.template($("#templateLink").text());
    templates.comment = doT.template($("#templateComment").text());
    templates.commentEditor = doT.template($("#templateCommentEdit").text());
    
    var currentLink = -1;
    
    var uiState = {
		VIEW_UNDEFINED: "viewUndefined",
    	VIEW_LINKS: "viewLinks",
    	VIEW_COMMENTS: "viewComments",
    	VIEW_REGISTER: "viewRegister",
    	VIEW_SUBMIT: "viewSubmit"
    };
    var currentState = uiState.VIEW_UNDEFINED;
    
    function sortByRating(a, b) { // createTime is a string at this point - json ftw
        return a.rating.value == b.rating.value ? b.createTime.localeCompare(a.createTime) : b.rating.value - a.rating.value;
    }

    function hideAll() {
        hide('#login');
        hide('#logout');
        $('#main >  div').addClass('hidden');
    }

    function hide(container) {
        $(container).addClass("hidden");
    }

    function show(container) {
        $(container).removeClass("hidden");
    }

    function checkUser() {
        if (dataservice.users.loggedIn() == 'true') {
            console.log("checked: User logged in: " + dataservice.users.getCurrentUser());
            $("#user_name").text(dataservice.users.getCurrentUser());
            show('#logout');
        } else {
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
    		
		refresh: function() {
    		console.log("refres ui called");
    		
    		switch (currentState) {

    		case uiState.VIEW_LINKS: //"viewLinks",
    			console.log("refreshing view links");
    			this.showLinks();
    			break;
    		case uiState.VIEW_COMMENTS: //"viewComments",
    			console.log("refreshing view comments");
    			this.showComments(currentLink);
    			break;
    		case uiState.VIEW_REGISTER: //"viewRegister",
    		case uiState.VIEW_SUBMIT: //"viewSubmit"
    		case uiState.VIEW_UNDEFINED: //"viewUndefined",
			default:
				console.log("no view refresh required!!!");
    		}
    	},
    	
    	showCurrentLink: function() {
    		showComments(currentLink);
    	},

        logIn: function () {
            dataservice.users.login($('#loginUser').val(), $('#loginPwd').val());
        },

        logOut: function () {
            dataservice.users.logout();
        },

        showRegister: function () {
            if (dataservice.users.loggedIn() == 'false') {
                hideAll();
                checkUser();
                currentState = uiState.VIEW_REGISTER;
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
            currentState = uiState.VIEW_LINKS;
            show('#links');
        },

        showLinkSubmit: function () {
        	if (dataservice.users.loggedIn() == 'true') {
	            hideAll();
	            checkUser();
                currentState = uiState.VIEW_SUBMIT;
                show('#submitLink');
            }
        },

        submitLink: function () {
            dataservice.links.add($('#linkTitle').val(), $('#linkURL').val());
            this.showLinks();
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
            currentState = uiState.VIEW_COMMENTS;
            show('#comments');
        },  
        commentLink: function (id) {
        	console.log("UI: comment Link");
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
            $(document).on("login-success", function() {
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
    };

    return ui;
});