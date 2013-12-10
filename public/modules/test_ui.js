define('modules/test_ui', ['modules/dataService', 'jquery'], function(dataservice, $){

	var showLinks = function(entries) {
		console.log("show links function");
		
		$.each(entries, function(index, link) {
			console.log("Link with id: " + link.id);
			console.log(link.title);
			console.log(link.url);
        });
	};
	
	
    var ui = {
        test : function() {
            console.log("in ui test");
            
            var testOut = dataservice.links.testFunction();
            console.log(testOut);
            
            var links = dataservice.links.getAll();
            links.then(function(entries) {
            	showLinks(entries);
            });
            
            dataservice.links.add("newLinkTitle", "New Link Url");
            
            console.log("foreach test");
            dataservice.links.foreach(showLinks);
            dataservice.links.foreach(function(entries) {
            	
            });
        },
    };

    return ui;
});