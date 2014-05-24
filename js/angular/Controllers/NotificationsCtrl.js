'use strict'

var notificationsModule = angular.module('NotificationsCtrl',[]);

var notificationsCtrl = confirmModule.controller('NotificationsCtrl', ['$scope','$stateParams', '$location','ErrorService', 'NotificationsService', function($scope, $stateParams,$location,ErrorService, NotificationsService){
	
	$scope.loading = true;
	
	$scope.init = function(){
		console.log("init NotificationsCtrl");
		
		$scope.notifications = [];
		
		//récupération de toute les notifications
		NotificationsService.allNotifications();
	}
	
	$scope.$on("allNotifications", function(action,data){
    	if(angular.isUndefined(data.errors)){
    		$scope.notifications = data;
    		
    		//Dire que les notifications ont toutes été lues
    		NotificationsService.readedNotifications();
    	}
    	else{
    		ErrorService.showAlert("error",data.errors);
    	}
    	
    	$scope.loading = false;
	}); 
	
}])