(function ($) {
	
	var dataService = {
		getLinkEntries: function() {
			console.log( "get Link Entries");			
			return $.getJSON( "entries" );
	    }
	};
	
	$.fn.DataService = function() {
		return dataService;
	};
	
})(jQuery);
