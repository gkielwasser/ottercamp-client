'use strict';

angular.module('Search',[])
.directive('search', 
	['searchBetweenFrapsDelay',
	'searchTimeBeforeSearch',
	'searchMinLengthWord',
	'$location', 
	'SearchService',
	'UserService',
	'GeolocService',
	'ErrorService',
	'$rootScope',
	'$q',
	'$timeout',
	'EventsService',
	'$filter',
	'OrganizationService',
	function(
		searchBetweenFrapsDelay,
		searchTimeBeforeSearch,
		searchMinLengthWord,
		$location, 
		SearchService,
		UserService,
		GeolocService,
		ErrorService,
		$rootScope,
		$q,
		$timeout,
		EventsService,
		$filter,
		OrganizationService
	){
	return{
		restrict : 'E',
		templateUrl : Config.templatesPublicURL + 'directives/search.html',
		scope: {

		},
		controller : function($scope){
			$scope.$watch("search", function(value){
				if(angular.isUndefined($scope.search) || $scope.search == ""){
					SearchService.removeParameter("q");
				}
			})
			
			$scope.$on("$stateChangeStart", function (event, next, current) {
				if($location.path() != "/")$scope.search = "";
	        })			
            
            $scope.initSearch = function(){
		    	if(SearchService.getParameters().q){
		    		console.log("init with",SearchService.getParameters().q)
		    		$scope.search = SearchService.getParameters().q;
		    	}
		    	$scope.searching = false;
				$scope.tags = [];
				$scope.cities = [];
				$scope.communities = [];
				$scope.organizations = [];
				$scope.lastKeywords=[];
	
	            $scope.lastChange = new Date().getTime();
	            $scope.ctimeout;
		    }
	
			$scope.isLoggedIn = function(){
				return (UserService.isLoggedIn()) ? true : false;
			}

			$scope.makeSearch = function(kind,tag, city){
				console.log("makeSearch",kind,tag,city);
				
				if(kind == "events"){			
					if(angular.isUndefined(UserService.getGeoloc()) || UserService.getGeoloc() == null){
						GeolocService.getGeoloc().then(
							function(){								
								$scope.addParameters(tag,city);
								$location.path("/").replace();
							},
							function(){
								ErrorService.showAlert("error", [{message:"no geoloc"}])
							}
						)
					}
					//Ajout des paramètres de la recherche
					$scope.addParameters(tag,city);
					
					//Recherche depuis une page autre que la page d'accueil
					if($location.path() != "/"){
						$location.path("/").replace();
						//$rootScope.$broadcast("newSearch", {q:value})
					}
					//Recherche depuis page d'accueil
					else{						
						$rootScope.$broadcast("newSearch", {refresh:true})
					}									
				}	
				else{
					SearchService.resetParameter();
					$location.path("search/" + kind + "/" + $scope.search).replace();
				}
				//Fermer le dropdown
				$scope.hideDropdown()			
			}
			
			$scope.addParameters = function(tag, city){
				if(tag && city){
					SearchService.addParameter("q", tag);
					SearchService.removeParameter("center");
					SearchService.addParameter("city", {latitude:city.location.lat,longitude:city.location.lng});
                    $scope.search = tag + " " + city.label.split(" ")[0];
				}	
				else if(tag){
					SearchService.removeParameter("city");
					SearchService.addParameter("q", tag);
                    $scope.search = tag;
				}
				else if(city){
					SearchService.removeParameter("q");
					SearchService.removeParameter("center");
					SearchService.addParameter("city", {latitude:city.location.lat,longitude:city.location.lng});
                    $scope.search = city.label.split(" ")[0];
				}
				else{
					SearchService.removeParameter("q");
					SearchService.removeParameter("city");
					SearchService.removeParameter("center");
				}
			}
			
			$scope.resetArrays = function(){
				//RAZ tableaux
				$scope.tags = [];
				$scope.cities = [];
				$scope.citiesUsed = [];
				$scope.tagsUsed = [];
				$scope.organizations = [];
                $scope.communities = [];
                $scope.communitiesUsed = [];
                $scope.organizationsUsed = [];
			}
			
			$scope.startSearching = function(){		
				$scope.resetArrays()						
				if(angular.isDefined($scope.search) && $scope.search != ""){
					var keywords = $scope.search.split(" ");
					$scope.lastKeywords = keywords;
					angular.forEach(keywords,function(value,key){
						
						$scope.add($scope.filterTags($scope.cachedTags,value), "tags",value)

						$scope.getCities(value).then(function(data){
							$scope.add(data.cities,"cities",value);
						})
						
						$scope.getOrganizations(value).then(function(data){
							$scope.add($filter('filter')(data.organizations,{asCommunity:true}),"communities",value);
							$scope.add(data.organizations,"organizations",value);
						})					
					})	
				}				
			}
					
			$scope.getTags = function() {
				var defered = $q.defer();
				EventsService.getTags().then(
					function(tags){						
						defered.resolve(tags);							
					}
			  	)
			  	return defered.promise;
			}			
			
			$scope.getCities = function(value) {
				var defered = $q.defer();
				EventsService.getCities(value).then(
					function(result){
						if(result.cities && result.cities.length > 0){
							defered.resolve(result);	
						}
					}
			  	)
			  	return defered.promise;
			}
			
			$scope.getOrganizations = function(value){
				var defered = $q.defer();
				OrganizationService.getOrganizations(value).then(
					function(organizations){
						defered.resolve(organizations);
					}
				)
				return defered.promise;
			}

            $scope.showDropdown = function(){
            	//Récupération des tags pour les mettres en cache au premier affichage du dropdown
            	if(angular.isUndefined($scope.cachedTags)){
            		$scope.getTags().then(
            			function(data){
            				$scope.cachedTags = data;
            			}	
            		)
            	}
                if(angular.isDefined($scope.search) && $scope.search.length > 0){
                    angular.element('.searchDir').dropdown();
                    angular.element('.searchDir').dropdown('toggle');
                }
                else{
                    if(angular.element('.searchDir').parent().hasClass('open')){
                        $scope.hideDropdown();
                    }
                }
            }
	
			$scope.onChange = function(){
                //RAZ tableaux
                $scope.tags = [];
                $scope.cities = [];
                $scope.organizations = [];
                $scope.communities = [];
                $scope.communitiesUsed = [];
                $scope.organizationsUsed = [];
                $scope.citiesUsed = [];
                $scope.tagsUsed = [];

                $scope.showDropdown()

                $timeout.cancel($scope.ctimeout);
                if($scope.search
                    && ($scope.search.split(' ')[0].length >= searchMinLengthWord)
                    && (new Date().getTime() - $scope.lastChange > searchBetweenFrapsDelay)){
                    console.log("recherche.....");
                    $scope.startSearching();
                }
                else{
                    console.log("too fast");

                    $scope.ctimeout = $timeout(function(){
                        console.log("recherche late!");
                        $scope.startSearching();
                    }, searchTimeBeforeSearch)
                }
                $scope.lastChange = new Date().getTime();
			}

            $scope.enterSearch = function(){
                if (angular.isDefined($scope.tags[0])){
                    $scope.makeSearch('events',$scope.tags[0].value,null)
                }
                else if(angular.isDefined($scope.cities[0])){
                    $scope.makeSearch('events',null,$scope.cities[0])
                }
                else{
                    $scope.makeSearch('events',$scope.search,null)
                }
            }
			
			$scope.hideDropdown = function(){
				angular.element('.searchDir').dropdown('toggle');
				angular.element('.searchDir').parent().removeClass('open');
			}
			
			/*
			$scope.showUnknownTag = function(){
				if($scope.search && $scope.search.split(" ")[0]){
					console.log("recherche",$scope.search.split(" ")[0], $scope.citiesUsed);
					var res = false;
					angular.forEach($scope.citiesUsed, function(value,key){
						if((value == $scope.search.split(" ")[0] )||value == $scope.search.split(" ")[1]){
							res = true;
						}
					})
					if(!res){
						return true
					}
					else{
						return false;
					}
				}	
				else{
					return false;
				}
			}
			*/
			
			//Ajout l'entrée si elle n'est pas déjà présente
			$scope.add = function(data,array,keyword){
				angular.forEach(data, function(value,key){
					if(!$scope.existKey(value.id,array)){
						switch(array){
							case "cities":
								$scope.citiesUsed.push(keyword);
							break;
							case "tags":
								$scope.tagsUsed.push(keyword);
							break;
							case "organizations":
								$scope.organizationsUsed.push(keyword);
							break;
							case "communities":
								$scope.communitiesUsed.push(keyword);
							break;
						}

						$scope[array].push(value);						
					}
				})
			}
			//Vérifie si l'id existe dans le tableau
			$scope.existKey = function(id,array){
				var res = false;
				angular.forEach($scope[array], function(value){
					if(value.id == id){
						res =  true;
					}
				})	
				return res;
			}

			$scope.$on("searchEvents", function(action, data){
				$scope.isSearching = false
			})
			
			$scope.filterTags = function(tagsToFilter,value){
				var res = [];
				angular.forEach(tagsToFilter, function(tag,key){
					if(tag.value.toLowerCase().indexOf(value.toLowerCase()) == 0){
						res.push(tag);
					}
				})
        		return res;
			}
			
			$scope.$on("changeSearch", function(action,data){
				console.log("CHANGE SEARCH",data)
				$scope.search = data;
			})
			
		}
	}
}]).directive('onEnter', function() {
    return function(scope, elm, attrs) {
        elm.bind('keydown keypress', function(evt) {
            if(evt.which === 13){
                scope.$apply(function() {
                	//Si la recherche n'est pas vide
                	if(angular.isDefined(scope.$eval(attrs.onEnter))){
                		scope.$eval(attrs.onEnter).call(scope, evt.which);	
                	}                   
                });
                evt.preventDefault();
            }
        });
    };
})    