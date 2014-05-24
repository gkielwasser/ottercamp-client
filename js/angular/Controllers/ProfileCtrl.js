'use strict'

var profileMod = angular.module('ProfileCtrl',[])
var ProfileCtrl = profileMod.controller('ProfileCtrl', ['$scope','$stateParams','UserService','$location','ErrorService','$route', '$rootScope','User','$state',function($scope,$stateParams,UserService,$location,ErrorService,$route,$rootScope,User,$state){
	$scope.getSimilarUsers = function(){
		UserService.getSimilar($scope.userInfos.id).then(
			function(data){
				$scope.similarUsers = data;
			}
		)
	}

    $scope.goToUser = function(path){
    	console.log("goto",path);
    	$scope.loc = true;
    	$location.path("/users/"+ path).replace();
    }
  
    $scope.initUser = function(data){
    	if(UserService.isLoggedIn()){
    		$scope.isLoggedIn = true;
    	}
    	
    	//Si la récupération est un succès....
    	if(angular.isUndefined(data.errors)){
    		if(data.type == "anotherUser"){
    			$scope.anotherUser = true;
    		}
    		$scope.userInfos = data.user;
    		
    		//Récupération des utilisateurs similaires
    		$scope.getSimilarUsers();
    	}
    	//Si la récupération est un échec....
    	else{
			ErrorService.showAlert('error', data.errors)
    	}
    }
    
    $scope.init = function(){
        console.log("init ProfileCtrl");
        $scope.params = $stateParams.userId;
        $scope.initUser(User)
    }

    $scope.isPageActive = function(page){
    	return (page == $state.current.name)?'active':'';
    }

    $scope.showInfo = function(field){
    	return (angular.isDefined($scope.userInfos) && angular.isDefined($scope.userInfos[field]) && $scope.userInfos[field] != "") ? true : false;
    }

	$scope.getEventLabel = function(abbreviation){
		if(abbreviation == "withdrawal_error" 
			|| abbreviation == "failed_withdrawal"
			|| abbreviation == "refund_error"
			|| abbreviation == "failed_refund"
			|| abbreviation == "failed_payment"
		){
			//Rouge
			return "important";
		}
		else if(abbreviation == "refused_participation" 
			|| abbreviation == "cancelled_participation"
			|| abbreviation == "cancelled_event"
			|| abbreviation == "pending_payment"
		){
			//Orange
			return "warning";
		}
		else if(abbreviation == "completed_event" || abbreviation == "accepted_participation"){
			//Vert
			return "success";
		}
		else{
			//Bleu
			return "info";
		}
    }
    
    $scope.sortEvents = function(events){
    	$scope.importantEvents = [];
    	$scope.archivedEvents = [];
    	$scope.nextEvents = [];
    	var list;
    	angular.forEach(events, function(value,key){
    		//Organizer
    		if(value.organizer.id == $scope.userInfos.id){
    			//Vérifier statut événement
    			//Important
    			if(value.currentStatus.abbreviation == "withdrawal_error" 
    				|| value.currentStatus.abbreviation == "failed_withdrawal"){
    				list = "importantEvents";
    			}
    			//archive
    			else if(value.currentStatus.abbreviation == "completed_event" 
    				|| value.currentStatus.abbreviation == "cancelled_event"){
    				list = "archivedEvents";
    			}
    			//Next
    			else{
    				list = "nextEvents";
    			}	
    			value.cLabel = value.currentStatus.label;
    			value.cDescription = value.currentStatus.description;
    			value.cColor = $scope.getEventLabel(value.currentStatus.abbreviation);
    			$scope[list].push(value);
    		}
    		//Participant
    		else{
    			//Vérifier statut participation
    			//important
    			if(value.participation.currentStatus.abbreviation == "refund_error" 
    				|| value.participation.currentStatus.abbreviation == "failed_refund" 
    				|| value.participation.currentStatus.abbreviation == "pending_payment" 
    				|| value.participation.currentStatus.abbreviation == "failed_payment"){
    				list = "importantEvents";
    			}
    			//archive
    			else if(value.participation.currentStatus.abbreviation == "cancelled_participation" 
    				|| value.participation.currentStatus.abbreviation == "refused_participation"
    				|| value.currentStatus.abbreviation == "completed_event"
    				|| value.currentStatus.abbreviation == "cancelled_event"){
    				list = "archivedEvents";
    			}
    			//next
    			else{
    				list = "nextEvents";
    			}
    			value.cLabel = value.participation.currentStatus.label;
    			value.cDescription = value.participation.currentStatus.description;
    			value.cColor = $scope.getEventLabel(value.participation.currentStatus.abbreviation);
    			$scope[list].push(value);
    		}
    	})
    	
    	console.log($scope.importantEvents,$scope.archivedEvents,$scope.nextEvents);
    }   
    
	$scope.showImages = function(itemsType){	
		return (angular.isDefined($scope.userInfos) && angular.isDefined($scope.userInfos[itemsType]) && $scope.userInfos[itemsType].length > 0)? false:true;
	}
}])

var ProfilePhotosCtrl = profileMod.controller('ProfilePhotosCtrl',
	[
	'$scope',
	'UserService',
	'$location',
	function($scope,UserService,$location){
		$scope.initUserPhotos = function(){
			$scope.loading = true;
					
			if($scope.anotherUser){
				$location.path('/404').replace();
			}
			else{
				UserService.getUserPhotos().then(
					function(data){
						$scope.userPhotos = data;
						$scope.token = UserService.token();	
						$scope.loading = false;
					}
				);	
			}	
		}
	
}])

var ProfileEventsCtrl = profileMod.controller('ProfileEventsCtrl',
	[
	'$scope',
	'UserService',
	'$location',
	function($scope,UserService,$location){
		$scope.initAgenda = function(){
    		if($scope.anotherUser){
				$location.path('/404').replace();
			}
			else{
				$scope.loading = true;
				UserService.getEvents().then(
					function(data){
						$scope.loading = false;
						$scope.sub = [];    
    					$scope.sortEvents(data); 
					}
				);
				
			}	  
    	}
}])

var ProfileCommentsCtrl = profileMod.controller('ProfileCommentsCtrl',
	[
	'$scope',
	'UserService',
	'$location',
	function($scope,UserService,$location){
		$scope.initUserComments = function(){					
			if($scope.anotherUser){
				$location.path('/404').replace();
			}
			else{
				$scope.loading = true;	
				UserService.getUserComments().then(
					function(data){
						$scope.userComments = data;
						$scope.loading = false;
					}
				);	
			}
		}	
}])

var ProfileCommunitiesCtrl = profileMod.controller('ProfileCommunitiesCtrl',
	[
	'$scope',
	'UserService',
	'$location',
	function($scope,UserService,$location){
		$scope.initCommunities = function(){					
			if($scope.anotherUser){
				$location.path('/404').replace();
			}
			else{
				$scope.communities = UserService.getUser().communities;
			}
		}	
}])

ProfileCtrl.resolve = {
	User: function($q,UserService,$stateParams,$rootScope,$location){
		var defered = $q.defer();
		
		var user = UserService.getUser();
		
    	//Consultation du profile de l'utilisateur connecté
    	if(angular.isDefined(user) && user != null && (user.id == $stateParams.userId)){
    		//Utilisateur connecté
    		if(UserService.isLoggedIn()){
    			UserService.getUserInfos(UserService.id()).then(
    				function(data){
    					defered.resolve({user:data,type:"current"});
    				},
					function(data){
						if(data.status == 400){
							$rootScope.$broadcast("e404");
						}				
					}
				);
    		}	
    		//Utilisateur non connecté -> redirection page login
    		else{
    			$location.path("/login").replace();
    		}
    				
    	}
    	//Consultation profile utilisateur X
    	else{
    		if(angular.isDefined($stateParams.userId)){
    			UserService.getUserInfos($stateParams.userId).then(
    				function(data){
    					defered.resolve({user:data,type:"anotherUser"});
    				},
					function(data){
						if(data.status == 400){
							$rootScope.$broadcast("e404");
						}				
					}
    			);
    		}
    		else{   			
    			$location.path('/404').replace();
    		}
    	}  	
		
		return  defered.promise;
	}		
	
};


