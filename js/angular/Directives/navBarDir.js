'use strict';

// eventList Event
var userbox = angular.module('userBox.directives',[]).directive('navBar', ['$scope','UserService', function($scope,UserService){
	return{
		restrict :'E',
		templateUrl: Config.templatesPublicURL + 'directives/navBar.html',
        controller: function($scope){
        	$scope.navBarTemplateUrl = {connected : "navBar/Connected", disconnected : Config.templatesPublicURL +  "navBar/Disconnected.html"}
        	$scope.init = function(){

	    		if(UserService.isLoggedIn()){
	    			//Afficher userBox
	    			$scope.navBarTemplate = $scope.navBarTemplate.connected;
	    		}
	    		else{
	    			//Afficher bouton connexion
	    			$scope.navBarTemplate = $scope.navBarTemplate.disconnected;
	    		}
		    }
		    
		    $scope.init();
		    
		    $scope.$watch( UserService.isLoggedIn, function ( logged_in ) {
			    if ( logged_in ) {
			    	$scope.navBarTemplate = $scope.navBarTemplateUrl.connected;
			    }	
			    else {
			    	$scope.navBarTemplate = $scope.navBarTemplateUrl.disconnected;
			    }	
			 });	
        }
		
	}
}]);