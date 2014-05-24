'use strict';

var notificationModule = angular.module('notifications.directives',[]).directive('notifications',
	['NotificationsService',
	'$timeout',
	'ErrorService',
	'$location',
	'$rootScope',
	'refreshNotificationDelay',
	'UserService',
	function(
		NotificationsService,
		$timeout,
		ErrorService,
		$location,
		$rootScope,
		refreshNotificationDelay,
		UserService
	){
	return{
		restrict : 'E',
		scope : {},
		templateUrl : Config.templatesPublicURL+'directives/notifications.html',
		controller : function($scope){
			$scope.$watch( UserService.isLoggedIn, function ( logged_in ) {
			    if ( !logged_in ) {
			    	$scope.notifications = [];
			    }		
			});
			
			$scope.initNotifications = function(){
				$scope.firstReception = true;
				$scope.notifications = [];

				var context = UserService.getContext();
					$scope.notifications = [];
					
					if(angular.isDefined(context) && angular.isDefined(context.notifications) && context.notifications.length > 0){
						angular.forEach(context.notifications, function(value,key){
							$scope.notifications.push(value);	
						})
					}	
					$scope.refreshNotifications();
			
				$scope.readedNotifications = false;
			}
			
			$scope.update = function(link){
				if($location.path().split("/")[1] == link.split("/")[0] 
				&& $location.path().split("/")[2] == link.split("/")[1] && link.split("/")[0] == "events"){
					console.log("refresh event",link)
					$rootScope.$broadcast("refreshEvent");
				}
				else{
					console.log("refresh event NO",link)
				}
			}
			
			$scope.isExist = function(id){
				var exist = false;
				angular.forEach($scope.notifications, function(value,key){
					if(value.id == id){
						exist = true;
						return exist;
					}
				})
				return exist;
			}
			
			$scope.setReaded = function(){
				angular.forEach($scope.notifications, function(value,key){
					$scope.notifications[key].readed = true;	
				})
			}
			
			$scope.countUnreaded = function(){
				
				var count = 0;
				angular.forEach($scope.notifications, function(value,key){
					if(!value.readed){
						count++;
					}	
				})
				if(count > 0){
					//MAJ title page
					$rootScope.updateTitle(count,"notifications");
					$scope.unReaded = count;
					return "btn-warning";
				}
				else{
					$rootScope.updateTitle(count,"notifications");
					$scope.unReaded = 0;
					return "";
				}	
			}

			$scope.notificationsNumber = function(){
				return (!$scope.readedNotifications) ? $scope.notifications.length : "0";
			}
			
			$scope.read = function(){
				//Fermeture des éventuelles notifications actives
				ErrorService.hideAlert();
				
				if($scope.unReaded > 0){
					NotificationsService.readedNotifications();
					$scope.setReaded()
				}	
			}			
			
			$scope.refreshNotifications = function(){
				if(UserService.isLoggedIn()){
					NotificationsService.lastNotifications().then(
						function(data){
							if(angular.isUndefined(data.errors)){
					    		var oldNotif = $scope.notifications;
					    		var newNotif = [];
								
					    		angular.forEach(data, function(value,key){
					    			if(!$scope.isExist(value.id)){
					    				//Empeche les notificaitons de poper au lancement de l'application
					    				if(!$scope.firstReception){
					    					//Notification
					    					ErrorService.showAlert("info", [{message:value.content, link:value.link}])
					    				}	
					    				
					    				//Update possible
					    				$scope.update(value.link);
					    				
					    				newNotif.push(value);
					    			}
					    			
					    		})
					    		$scope.notifications = newNotif.concat(oldNotif)	
					    		$scope.firstReception = false;
					    	}
					    	else{
					    		ErrorService.showAlert("error",data.errors);
					    	}
					    	
					    	//Refresh automatique
			    			$timeout(function(){
								$scope.refreshNotifications();
							}, refreshNotificationDelay);
						}
					)
				}	
			} 		
		}
	}
}]);