'use strict';

// eventList Event
var userbox = angular.module('userBox.directives',[]).directive('userBox', ['$location','UserService','ErrorService', '$rootScope',function($location,UserService,ErrorService,$rootScope){
	return{
		restrict :'E',
		templateUrl: Config.templatesPublicURL + 'directives/userBox.html',
        controller: function($scope){
        	$scope.userBoxTemplateUrl = {
        		connected : Config.templatesPublicURL + "users/userBoxConnected.html", 
        		disconnected : Config.templatesPublicURL +  "users/userBoxDisconnected.html"
        	}
        	$scope.init = function(){
        		console.log("init UserboxDir");

        		//Template dynamic suivant si l'utilisateur est connecté ou non
        		if(UserService.isLoggedIn()){
        			//Afficher userBox
        			$scope.userBoxTemplate = $scope.userBoxTemplateUrl.connected;
        		}
        		else{
        			//Afficher bouton connexion
        			$scope.userBoxTemplate = $scope.userBoxTemplateUrl.disconnected;
        		}
        	}

            $scope.logout = function(){
            	//Appel serveur
            	UserService.logout();
            	//RAZ notifications
            	//$rootScope.updateTitle();
		    }	
		    
		    $scope.init();
		    
		    //Si tentative de connexion à une page avec accès réservés
		    $scope.$on('event:auth-loginRequired', function(action,next) {
		    	console.log("LOGIN REQUIRED next",next);
		    	$location.path("/login");    	
		    });
		    
		    //Interceptor login confirmé
		    $scope.$on('event:auth-loginConfirmed', function() {
		    	//Rappel activation du compte
		    	//console.log("on-login-confirmed", UserService.getUser());  	
		    });
		    
		    //réception réenvoi email confirmation
		    $scope.$on("sendConfirmation", function(action,data){
		    	if(angular.isUndefined(data.errors)){
					ErrorService.showAlert("success", [{message: data.success.message}]);
		    	}
		    	//Erreur de connexion
		    	else{
		    		ErrorService.showAlert("error", data.errors);
		    	}	
    		});	
		    
		    //Mémorise la dernière route sur demande
		    $scope.$on('storePath', function(){
		    	$scope.previousPath = $location.path();	
		    });
		    
		    //Redirige sur dernière route, sinon sur home
		    $scope.$on('previousPath', function(){
		    	if(typeof($scope.previousPath) == 'undefined'){
		    		$location.path("/").replace();   	
		    	}
		    	else{
		    		$location.path($scope.previousPath).replace();   	
		    	}	
		    })
		    
		    //Changement de l'état de connexion du user
		    $scope.$watch( UserService.isLoggedIn, function ( logged_in ) {
			    if ( logged_in ) {
			    	$scope.user = UserService.getUser();
			    	$scope.userBoxTemplate = $scope.userBoxTemplateUrl.connected;	
			    }	
			    else {
			    	$scope.userBoxTemplate = $scope.userBoxTemplateUrl.disconnected;
			    	$scope.user = false;
			    }	
			 });
			 
			 $scope.$watch(UserService.getUser, function(value,v){
			 	console.log("change!!!")
			 })
			 
    		//réception déconnexion	
		    $scope.$on("logout", function(action,data){
		    	//Si le login est un succès....
		    	if(angular.isUndefined(data.errors)){
		    		$scope.previousPath = "/";

			    	$location.path("/").replace();	
		    	}
		    	//Erreur de connexion
		    	else{
		    		ErrorService.showAlert("error", data.errors);
		    	}	
    		});		    	
        }
	}
}]);