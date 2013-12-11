
define('modules/test_ui', ['jquery', 'modules/dataService'], function($, dataservice){

	var createLogin = function() {
		var newTextBoxDiv = $(document.createElement('div'))
	     	.attr("id", "login_div");

		newTextBoxDiv.after().html(
			'Login: ' +
	      	'<input type="text" name="textbox" id="name_login_textbox" value="" >' +
	      	'<input type="text" name="textbox" id="password_login_textbox" value="" >' +
	      	'<input type="button" value="Login" id="login_button">' +
	      	'<input type="button" value="Logout" id="logout_button">' + '</br>' +
	      	
	      	'Register: ' +
	      	'<input type="text" name="textbox" id="name_register_textbox" value="" >' +
	      	'<input type="text" name="textbox" id="password_register_textbox" value="" >' +
	      	'<input type="button" value="Register" id="register_button">' + '</br>' +
	      	
	      	'Links: ' +
	      	'<input type="button" value="Create Link" id="create_link_button">' + 
	      	'<input type="button" value="Vote Up Link" id="voteup_link_button">' +
	      	'<input type="button" value="Vote Down Link" id="votedown_link_button">' +
	      	'<input type="text" name="textbox" id="vote_link_textbox" value="0" >' + '</br>'
		);
		
		
	
		newTextBoxDiv.appendTo("#main");
		
		$("#login_button").click(function () {
			console.log("Login pressed");
			var username = $('#name_login_textbox').val();
			var password = $('#password_login_textbox').val();
			dataservice.users.login(username, password);
	 	});
		$("#logout_button").click(function () {
			console.log("Logout pressed");
			dataservice.users.logout();
	 	});
		$("#register_button").click(function () {
			console.log("Register pressed");
			var username = $('#name_register_textbox').val();
			var password = $('#password_register_textbox').val();
	 		dataservice.users.register(username, password);
	 	});
		$("#create_link_button").click(function () {
			console.log("Create Link pressed");
	 		dataservice.links.add("My new awsome link", "new.bla.com");
	 	});
		$("#voteup_link_button").click(function () {
			var linkId = $('#vote_link_textbox').val();
			console.log("Vote Up Link pressed: " + linkId);
	 		dataservice.links.voteup(linkId);
	 	});
		$("#votedown_link_button").click(function () {
			var linkId = $('#vote_link_textbox').val();
			console.log("Vote Down Link pressed: " + linkId);
	 		dataservice.links.votedown(linkId);
	 	});
	};
	
	var showComments = function(comment, level) {
		//TODO: do the effect in gui
		var padding = "";
		for (var i = 0; i < level; i++) {
			padding += "  ";
		}
		
		var tmp = "Comment from " + comment.author + ": " + comment.text + "(" + comment.rating.value + " rating)";
		console.log(padding + tmp);
		$.each(comment.comments, function(index, c) {
			showComments(c, ++level);
        });
	};
	
	var showLink = function(link) {
		console.log("Link (id:" + link.id + ") " + link.title + "; " + link.url);
		$.each(link.comments, function(index, c) {
			showComments(c, 1);
        });
	};
	
	var showLinks = function(entries) {
		console.log("show links function");
		
		$.each(entries, function(index, link) {
			showLink(link);
        });
	};
	
    var ui = {
        test : function() {
            console.log("ui test start");
            
            createLogin();
            
            console.log("foreach test");
            dataservice.links.foreach(showLinks);
        },
    };

    return ui;
});