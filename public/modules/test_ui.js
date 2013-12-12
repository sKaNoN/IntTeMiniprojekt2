
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
	      	
	      	'Create Link: ' +
	      	'<input type="button" value="Create Link" id="create_link_button">' + '</br>' +
	      	
	      	'Vote Link/Comment: ' +
	      	'<input type="button" value="Vote Up Link" id="voteup_link_button">' +
	      	'<input type="button" value="Vote Down Link" id="votedown_link_button">' +
	      	'<input type="button" value="Vote Up Comment" id="voteup_comment_button">' +
	      	'<input type="button" value="Vote Down Comment" id="votedown_comment_button">' +
	      	'Link/CommentId:' +
	      	'<input type="text" name="textbox" id="vote_textbox" value="0" >' + '</br>' +
	      	
	      	'Comment Link/Comment: ' +
	      	'<input type="text" name="textbox" id="comment_text_textbox" value="" >' +
	      	'<input type="button" value="Comment Link" id="comment_link_button">' +
	      	'<input type="button" value="Comment Comment" id="comment_comment_button">' +
	      	'Link/Comment Id:' +
	      	'<input type="text" name="textbox" id="comment_textbox" value="0" >' + '</br>'
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
			var id = $('#vote_textbox').val();
			console.log("Vote Up Link pressed: " + id);
	 		dataservice.links.voteup(id);
	 	});
		$("#votedown_link_button").click(function () {
			var id = $('#vote_textbox').val();
			console.log("Vote Down Link pressed: " + id);
	 		dataservice.links.votedown(id);
	 	});
		
		$("#comment_link_button").click(function () {
			console.log("Comment Link pressed");
			var id = $('#comment_textbox').val();
			var text = $('#comment_text_textbox').val();
			dataservice.comments.addToLink(id, text);
	 	});
		$("#comment_comment_button").click(function () {
			console.log("Comment Comment pressed");
			var id = $('#comment_textbox').val();
			var text = $('#comment_text_textbox').val();
			dataservice.comments.addToComment(id, text);
	 	});
		$("#voteup_comment_button").click(function () {
			var id = $('#vote_textbox').val();
			console.log("Vote Up Comment pressed: " + id);
	 		dataservice.comments.voteup(id);
	 	});
		$("#votedown_comment_button").click(function () {
			var id = $('#vote_textbox').val();
			console.log("Vote Down Comment pressed: " + id);
	 		dataservice.comments.votedown(id);
	 	});
	};
	
	var printLink = function(link, level) {
		console.log("Link (id:" + link.id + ") " + link.title + "; " + link.url);
	};
	
	var printComment = function(comment, level) {
		//TODO: do the effect in gui
		var padding = "";
		for (var i = 0; i < level; i++) {
			padding += "  ";
		}
		console.log(padding + "Comment from " + comment.author + ": " + comment.text + "(" + comment.rating.value + " rating)");
	};
	
	var printNode = function(node, level, printFunction) {
		printFunction(node, level);
		$.each(node.comments, function(index, c) {
			printNode(c, level+1, printComment);
        });
	};
	
	var showLinks = function(entries) {
		console.log("show links function");
		$.each(entries, function(index, link) {
			printNode(link, 0, printLink);
        });
	};
	
	var showUsers = function(users) {
		console.log("show users function");
		$.each(users, function(index, user) {
			console.log("User (" + user.id + "): " + user.name);
        });
	};
	
    var ui = {
        test : function() {
            console.log("ui test start");
            
            createLogin();
            
            console.log("foreach test");
            dataservice.links.foreach(showLinks);
            
            dataservice.users.foreach(showUsers);
        },
    };

    return ui;
});