(function ($) {
	
	$( document ).ready(function() {
		
		alert("data service rdy");
	
	
		var serverAPI = "http://localhost:4730/entries";
		  $.getJSON( serverAPI, function( result ) {
			  
			  $( "#main" ).html( "Entries:" );
			  //$( "#main" ).append("<br/>");
			  
		      $.each(result, function(i, field){
		    	  alert(field.url);
		          //$("#main").append(  field.id + " ");
		          //$("#main").append(  field.title + " ");
		          //$("#main").append(  field.url + " ");
		      });
		  });
	  
	});
  
})(jQuery);
