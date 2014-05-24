'use strict'

//Controller principal
var mainMod = angular.module('mainCtrl',[]);
var mainCtrl = mainMod.controller('MainCtrl', 
	[
	'$scope',
	'$location',
	'UserService',
	'$q',
	'ErrorService', 
	'$rootScope',
	'$filter',
	'$state',
	'MetaData',
	'SearchService',
	function(
		$scope,
		$location,
		UserService,
		$q,
		ErrorService,
		$rootScope,
		$filter,
		$state,
		MetaData,
		SearchService
	){
	$scope.MetaData = MetaData;	

    $scope.init = function(){
        console.log("init MainCtrl");
        $scope.ErrorService = ErrorService;     
    }
    
    $scope.$on("searchTag",function(action,data){
    	console.log("SEARCH!!!!!!!!!!!!!!!!!!!",data.tag)
    	if($location.path() != "/"){
    		console.log("should add p",data.tag)
    		SearchService.addParameter("q", data.tag);
    		$location.path("/").replace();
    	}
    	else{
    		$scope.$broadcast('hideMarker', data.id); //a destination de mapDir.js
    		SearchService.addParameter("q", data.tag);
			SearchService.search(false,"events");
    	}
    	$scope.$broadcast('changeSearch',data.tag)
    })
      
    $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    	$scope.state = toState.name;
    })  
        
    $scope.changeView = function(view){
        $location.path(view); // path not hash
    }

    //Permet de retourner sur la dernière page consulté avant l'erreur
    $scope.refresh = function(){
    	$location.path($scope.retryPath).replace();
    }
   
    $scope.$on( "$locationChangeStart", function(scope, next, current) {
		//Supprimer les paramètres
		if($location.path() != "/")	$location.search(null)	
    })
    
    $scope.$on( "e500", function() {
    	$scope.retryPath = $location.path();
    	if($location.path() != "/500"){
    		$rootScope.waiting = false; 		
    		$location.path("/500").replace();
    	}	
    })
    
    $scope.$on( "maintenance", function() {
    	$rootScope.waiting = false;
    	$location.path("/maintenance").replace();
    })
    
    $scope.$on( "e404", function() {
    	$rootScope.waiting = false;
    	if($state.current.name != "changePasswordForgotten"){
    		$location.path("/404").replace();
    	}	
    })
}])