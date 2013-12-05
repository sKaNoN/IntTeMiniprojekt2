
$( document ).ready(function() {

	console.log("in ui before");
	

	window.data.getLinkEntries().then(function(entries){
    	$.each(entries, function(i, field){
    		console.log(field.url);
    	});
    });

	
	console.log("in ui after");
});
