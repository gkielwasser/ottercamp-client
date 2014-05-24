'use strict'

var searchMod = angular.module('SearchCtrl',[])
var searchCtrl = searchMod.controller('SearchCtrl', ['$scope','$stateParams','ErrorService', 'SearchService','UserService', 'GeolocService',function($scope,$stateParams,ErrorService,SearchService,UserService,GeolocService){
	$scope.loading = true;
	
    $scope.initSearchCtrl = function(){
        console.log("init SearchCtrl",$stateParams.kind);
		$scope.kind = $stateParams.kind;
        $scope.keyword = $stateParams.keyword;
        
        //Lancer la recherche
        $scope.search();
    }
    
    $scope.$on("$destroy", function(){
        SearchService.resetParameter();
    });

    $scope.search = function(){
    	console.log("Search",$stateParams.kind,$stateParams.keyword,UserService.getGeoloc());
    	if(angular.isDefined($stateParams.keyword)&& angular.isDefined($stateParams.kind)){
    		if(angular.isUndefined(UserService.getGeoloc()) || UserService.getGeoloc() == null){
				GeolocService.getGeoloc().then(
					function(){
						SearchService.resetParameter();
						SearchService.addParameter("q", $stateParams.keyword);
	    				SearchService.search(false, $stateParams.kind);
					}
				)
			}
			else{
				SearchService.resetParameter();
				SearchService.addParameter("q", $stateParams.keyword);
	    		SearchService.search(false, $stateParams.kind);
			}
    	} 
    	else{
    		console.log("no keyword, que faire?");
    	}	
    }
    
    $scope.$on('searchUsers', function(action,data){
    	if(angular.isUndefined(data.errors)){
    		$scope.userList = data;
    	}
    	else{
    		ErrorService.showAlert('error', data.errors);
    	}
    	$scope.loading = false;
    })
    
    $scope.$on('searchCommunities', function(action,data){
    	console.log("****searchCommunities****",data)
    	if(angular.isUndefined(data.errors)){
    		$scope.communitiesList = data;
    	}
    	else{
    		ErrorService.showAlert('error', data.errors)
    	}
    	$scope.loading = false;
    })
    
    $scope.$on('searchOrganizations', function(action,data){
    	console.log("****searchOrganizations****",data)
    	if(angular.isUndefined(data.errors)){
    		$scope.organizationsList = data;
    	}
    	else{
    		ErrorService.showAlert('error', data.errors)
    	}
    	$scope.loading = false;
    })
}])
