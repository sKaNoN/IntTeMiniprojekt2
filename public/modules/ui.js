define('modules/ui', ['modules/dataservice', 'ko', 'sammy', 'modules/core', 'bootstrap'], function(dataservice ,ko, sammy){

	var ui = {
		load: function() {
			console.log("ui log");
		}
	};
	
	return ui;
			
	
	/*
    return function ui() {
       var self = this;
        
       self.user.username = ko.observable('');
       self.user.password = ko.observable('');
       self.user.login = ko.computed(function() {
           return self.user.username() + " " + self.user.password();
       }, this);

       
    };
    */
    
});