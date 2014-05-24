'use strict'

var MapModule = angular.module('MapCtrl',[]);
var mapCtrl = MapModule.controller('MapCtrl',['$scope','EventsService','GeolocService','UserService','ErrorService', 'SearchService','$location','$filter', '$modal','$rootScope',function($scope,EventsService,GeolocService,UserService,ErrorService,SearchService,$location,$filter,$modal,$rootScope){
	
	$scope.initMapCtrl = function(){
        console.log("init MapCtrl",SearchService.getParameters());
        
        $scope.isLogged = UserService.isLoggedIn();

		$scope.searchParams = [];

		//Récupèration paramètre after
		$scope.initDate();

		$scope.eventsTemplateId = 'events-cards';
		$scope.eventsTemplateSpan = 5;
		
		if(UserService.showModal()){
			$scope.showPresentation = true;
		}
		
		$scope.refreshEvents(true);
		
		$scope.countRefresh = 0;
		
		$scope.$watch(function () { return $location.search(); }, function(value) {
			console.log("**New Parameters" ,value,$scope.countRefresh)
			if($location.path() == "/"){
				if($scope.countRefresh != 0 && !$scope.$root.ignoreRefresh){
					console.log("Rafraichissement de la recherche");
					SearchService.getUrlParameters();
					if($location.search() != null && angular.isDefined($location.search().q)){
						console.log("EMIT")
						$rootScope.$broadcast("changeSearch",$location.search().q)
					}
					else{
						$rootScope.$broadcast("changeSearch","")
					}
					$scope.refreshEvents(true,true);
				}
				else{
					console.log("INGORE REFRESH")
				}
				$scope.$root.ignoreRefresh = false;
				$scope.countRefresh ++;
			}	
		});
    }
  	
  	

  	
    //Ajoute le paramètre after
    $scope.initDate = function(){
    	if(SearchService.getParameters().after){ 	
    		$scope.searchDate = new Date(SearchService.getParameters().after)	
    	}
    }
       	
	//Suppression du paramètre after lorsque la date est vide
	$scope.updateDate = function(val){
		if(angular.isUndefined(val) || val == "" || val == null){
			SearchService.removeParameter("after");
		}
	}

    
    $scope.searchTag = function(tag){		
		SearchService.addParameter("q", tag);
		SearchService.search(false,"events")
	}
	
	$scope.updateSearch = function(value){
		if(angular.isDefined(value) && value.length > 0){
			SearchService.addParameter("q", value);
		}
		else{
			SearchService.removeParameter("q");
		}
	}
	
	$scope.removeFilterValue = function(){
		delete $scope.eventsFilter.filters.q;
		SearchService.removeParameter("q");
	}

	$scope.searching = function(val){
    	if(val){
    		//$('#brand').addClass("animate")
    		angular.element(".searching").button('loading');
    	}
    	else{
    		//$('#brand').removeClass("animate")
    		angular.element(".searching").button("reset");
			angular.element(".searching").button("toggle");
			angular.element(".searching").removeClass("active");
    	}
    }
    
    $scope.conditionalRefresh = function(){
    	if(!$scope.refresh)	$scope.refreshEvents();
    }
	
	//Rafraichir la liste des événements
	$scope.refreshEvents = function(urlParams,addAfter){
		//$scope.searching(true);
		$scope.refresh = true;
		if(angular.isDefined($scope.map)){
			var mapCenter = $scope.map.center();
			if(SearchService.getParameters().center == true){
				SearchService.addParameter("center", {latitude:mapCenter.lat,longitude:mapCenter.lon})
			}
		}
		
		if(!addAfter)	SearchService.addParameter("after", new Date().getTime());
		
		SearchService.search(true,'events');
	}	

	/******* Evénements ********/
	
	$scope.$on("newSearch", function(action,value){
		if(value.refresh){
			$scope.refreshEvents(true);
		}	
	})

    $scope.hidePresentation = function(){
    	UserService.closedDiscoverModal();	
    	$scope.showPresentation = true;
    }
    
    //Suppression des paramètres de l'url en quittant la page
    $scope.$on("$destroy", function(){
    	$scope.hidePresentation();
        SearchService.resetParameter();
    });
	
	//Changement de date
	$scope.$on('changeDate', function(action, timestamp){
		if(angular.isDefined(timestamp)){
			SearchService.addParameter("after", timestamp);
		}
		else{
			SearchService.removeParameter("after");
		}
	})

    //Réception de la liste des événements
	$scope.$on("searchEvents", function(action, data){
		//$scope.searching(false);
		//$scope.refresh = false;
		
    	if(angular.isUndefined(data.errors) && angular.isDefined(data.events)){
    		$scope.eventsList = data.events;
    		
    		//Préparation filtres
    		if(angular.isDefined(data.filters)){
    			//geoloc
    			/*
    			if(angular.isDefined(data.filters.longitude)&& angular.isDefined(data.filters.latitude)){
    				SearchService.addParameter("geoloc",{longitude:data.filters.longitude,latitude:data.filters.latitude})
    			}   					
				*/
    			//Distance
    			//if(angular.isDefined(data.filters.distance)){}
    			
    			//City
    			if(angular.isDefined(data.filters.city)){ 				
					if(angular.isDefined(data.filters.city)){
						SearchService.addParameter("city",data.filters.city)
					}
    			}
    			 			
    			//ZipCode
    			if(angular.isDefined(data.filters.zipCode)){
					if(angular.isDefined(data.filters.zipCode)){
						SearchService.addParameter("zipCode",data.filters.zipCode)
					}
    			}
    			
    			//After
    			if(angular.isDefined(data.filters.after)){
    				SearchService.addParameter("after",data.filters.after)
    				//MAJ date picker
    				$scope.initDate();
    			}

    			//Value
    			if(angular.isDefined(data.filters.q)){
    				SearchService.addParameter("q",data.filters.q);
    				//MAJ search
    				//$scope.initSearch();
    			}
    		}
    	}
	});
}]);

mapCtrl.resolve = {
	AuthGeo: function(UserService,GeolocService,$q,$rootScope){
		var defered = $q.defer();
		/*
		 $rootScope.$on('event:auth-loginConfirmed', function() {
		 	console.log("GETTING GEOLOC");
		    	GeolocService.getGeoloc().then(function(){
						defered.resolve();
					})    	
		    });
				*/	 
				GeolocService.getGeoloc().then(function(){
						defered.resolve();
					}) 
					return defered.promise
	}
};