'use strict';

// eventList Event
var geolocModule = angular.module('geolocPicker.directives',[]).directive('geolocPicker', ['GooglemapService','$filter','UserService', function(GooglemapService,$filter,UserService){
	return{
		restrict :'E',
		
		scope: {
			addressLabel: "=",
			formatedAddress: "=", //Addresse sélectionnée
			myAddress: "@" //Affichage du bouton "mon addresse"
		},
		
		templateUrl : Config.templatesPublicURL + 'directives/geolocpicker.html',

		controller : function($scope, GooglemapService) {
		
			$scope.showMyAddress = function(){	
				if(angular.isDefined(UserService.getUser()) &&  UserService.getUser() != null && angular.isDefined(UserService.getUser().address) && $scope.myAddress){
					console.log("true")
					return true;
				}
				else{
					console.log("false")
					return false;
				}	
			}
			
			$scope.getMyAddress = function(){
	        	$scope.search = UserService.getUser().address.label;
	        	$scope.formatedAddress = {}
				  			
				var address = UserService.getUser().address;
	
				if(angular.isDefined(address.number))
					$scope.formatedAddress.number = address.number
	        	if(angular.isDefined(address.street))
	        		$scope.formatedAddress.street = address.street
	        	if(angular.isDefined(address.city))
	        		$scope.formatedAddress.city = address.city
	        	if(angular.isDefined(address.country))
	        		$scope.formatedAddress.country = address.country
	        	if(angular.isDefined(address.zipCode))
	        		$scope.formatedAddress.zipCode = address.zipCode
				
				$scope.formatedAddress.lat = address.location.lat;
				$scope.formatedAddress.lng = address.location.lng;
				
		    	$scope.addressLabel = $scope.search;
	        }

		
			$scope.initPicker = function(){
				//Nombre minimum de mots
				$scope.nbWords = 2;
				//Longueur du dernier mot
				$scope.lastWordLen = 2;
				//Nombre de résultats affichés
				$scope.nbResults = 6;
				//Nombre de caractères tappés
				$scope.nbCar = 3;
				//Débute la recherche
				$scope.beginSearch = false;
				$scope.currentPlaces = [];
				
				//Compteur caractères tappés
				$scope.typped = 0;
			}
			
			//Ouvre le dropdown s'il ya des villes à afficher
			$scope.showDropdown = function(){
				return ($scope.currentPlaces.length > 0) ? "open" : "";
			}
						
			//Selection d'une adresse dans la liste
			$scope.setPlace = function(index){								
				$scope.formatedAddress = $scope.currentPlaces[index];	
				$scope.addressLabel = $scope.places[index];
				$scope.search = $scope.places[index];
				$scope.currentPlaces = [];
				$scope.showDropdown();
			};			
			
			//Format l'adresse suivant les champs requis par l'API
			$scope.formatAddress = function(address){
                var administrative_area_level_2;
                var administrative_area_level_1;
                var sublocality;
                var neighborhood;
                var res = {};
                
                //Parcours des composantes de l'adresse
                angular.forEach(address.address_components, function (value, key) {
                    switch (value.types[0]) {
                        case "street_number":
                            res.number = value.long_name;
                            break;
                        case "route":
                            res.street = value.long_name;
                            break;
                        case "locality":
                            res.city = value.long_name;
                            break;
                        case "country":
                            res.country = value.long_name; 
                            break;
                        case "postal_code":
                            res.zipCode = value.long_name;
                            break;
                        case "neighborhood":
                            neighborhood = value.long_name;
                            break;
                        case "sublocality":
                            sublocality = value.long_name;
							break;	
						case "administrative_area_level_2":
							administrative_area_level_2 = value.long_name;
							break;
						case "administrative_area_level_1":
							administrative_area_level_1 = value.long_name;
							break;	
                    }
                });

                if(angular.isUndefined(res.street) && angular.isDefined(neighborhood)){
                    res.street = neighborhood;
                }
                if(angular.isUndefined(res.street) && angular.isDefined(sublocality)){
                    res.street = sublocality;
                }
                if(angular.isUndefined(res.zipCode) && angular.isDefined(administrative_area_level_2)){
                	res.zipCode = administrative_area_level_2;
                }
                if(angular.isUndefined(res.zipCode) && angular.isDefined(administrative_area_level_1)){
                	res.zipCode = administrative_area_level_1;
                }

                //Ajout de latitude longitude dans le formulaire
                res.lat = address.geometry.location.lat;
                res.lng = address.geometry.location.lng;			
				
                if (angular.isDefined(res.street)
                    && angular.isDefined(res.city)
                    && angular.isDefined(res.zipCode)
                    && angular.isDefined(res.country)
                    && angular.isDefined(res.lat)
                    && angular.isDefined(res.lng)) {
					return res;
                }
                else{
                	return false;
                }
		    }
		    
		    $scope.edit = function(){
		    	$scope.search = "";
		    	$scope.formatedAddress = {};
		    	delete $scope.addressLabel;
		    }
	
			//Mise à jour du dropdown			
			$scope.refresh = function(){
				if(angular.isDefined($scope.search) && $scope.search != ""){
					var words = $scope.search.split(' ');
					var nbWords = words.length;
					var lastWordLen = words[words.length - 1].length;
					
					if((nbWords > $scope.nbWords) && lastWordLen > $scope.lastWordLen){
						GooglemapService.getPlaces($scope.search).then(
							function(data){
								$scope.currentPlaces = [];
								var places = [];
								var address;
								angular.forEach(data.results, function(value,key){
									address = $scope.formatAddress(value);
									if(address)	{
										$scope.currentPlaces.push(address);
										places.push(value.formatted_address);
									}
								});
								
								$scope.currentPlaces = $filter('limitTo')($scope.currentPlaces,5);
								$scope.places = $filter('limitTo')(places,5);

								$scope.showDropdown();
							},
							function(error){
								$scope.currentPlaces = [];
								$scope.showDropdown();
							}
						);
						$scope.nbCar = 0;
					}		
				}					
			}
		}
	}
}])

.directive('geoloc',["GooglemapService","GeolocService", "$injector", 'ErrorService','$q', '$filter','$rootScope',function(GooglemapService,GeolocService,$injector,ErrorService,$q,$filter,$rootScope){
	return {
		restrict :'E',
		templateUrl : Config.templatesPublicURL + 'discover/citypicker.html',
		controller : function($scope){
			$scope.initGeolocDir = function(){
				$scope.SearchService = $injector.get("SearchService");
				$scope.getUserGeoloc();	
				$scope.geoloc = {};
				console.log("Initialisation geolocDir parameters",$scope.SearchService.getParameters());
				if($scope.SearchService.getParameters().near == true){
					console.log("Init with near");
					$scope.geoloc = "near";
					$scope.selectNear();
				}
				else if($scope.SearchService.getParameters().home == true){
					console.log("Init with home");
					$scope.geoloc = "home";
					$scope.selectHome();
				}
				else if($scope.SearchService.getParameters().center){
					console.log("Init with center");
					$scope.geoloc = "center";
					$scope.selectCenter($scope.SearchService.getParameters().center);
				}
				else if(angular.isDefined($scope.SearchService.getParameters().zipCode)){
					GooglemapService.getCitiesByZipCode($scope.SearchService.getParameters().zipCode).then(
						function(data){
							if(angular.isDefined(data.cities)&&angular.isDefined(data.cities[0])){
								$scope.geoloc = "city";
								$scope.selectCity();
								$scope.typeaheadValue = data.cities[0].label;								
							}
							else{
								console.log("unknown zipCode");
							}
						},function(){
						
						}
					)
				}
				else if(angular.isDefined($scope.SearchService.getParameters().city)){
					$scope.geoloc = "city";
					$scope.selectCity();
					$scope.typeaheadValue = $scope.SearchService.getParameters().city;	
				}
				else{
					$scope.geoloc = "near";
					$scope.selectNear();
				}	
			}
			
			$scope.$watch("geoloc",function(value){
				console.log("geoloc change",value);
				if(value == "near") $scope.selectNear();
				else if(value == "home") $scope.selectHome();
				else if(value == "city") $scope.selectCity();
				else if(value =="center") $scope.selectCenter();
			})
			
			$scope.findCityByLabel = function(label){
				var zipCode;
				angular.forEach($scope.cities, function(value,key){
					if(label == value.label){
						zipCode = value.zipCode;
					}
				})
				return zipCode;
			}

			$scope.selectedValue = function(label){
				var zipCode = $scope.findCityByLabel(label)
				if(angular.isDefined(zipCode)){					
					$scope.SearchService.addParameter("zipCode", zipCode);
					$scope.SearchService.removeParameter("center");
					$scope.SearchService.removeParameter("home");
					$scope.SearchService.removeParameter("near");
				}
				//Choix zipcode
				$scope.zipCodeValue = true;
			}			
			
			$scope.resetCity = function(){
				delete $scope.geoloc;	
				delete $scope.selected;		
				console.log("resetcity",$scope.typeaheadValue);
				if(!$scope.zipCodeValue && angular.isDefined($scope.typeaheadValue) && $scope.typeaheadValue != ""){
					$scope.SearchService.addParameter("city", $scope.typeaheadValue);
					$scope.SearchService.removeParameter("zipCode");
					$scope.SearchService.removeParameter("center");
					$scope.SearchService.removeParameter("home");
					$scope.SearchService.removeParameter("near");
				}
				$scope.zipCodeValue = false;
			}
			
			$scope.emptyInput = function(){
				$scope.typeaheadValue = "";
				$scope.SearchService.removeParameter("center");
				$scope.SearchService.removeParameter("home");
				$scope.SearchService.removeParameter("near");
				$scope.SearchService.removeParameter("zipCode");		
			}
			
			$scope.selectCity = function(){	
				$scope.disablePicker = false;	
				$scope.typeaheadValue = "";		
			}
			
			$scope.selectNear  = function(){
				$scope.getGeoloc().then(
					//Html5
					function(){		
						$scope.SearchService.addParameter("near", true);
						$scope.geoloc.home = false;
					},
					//geopip
					function(){
						ErrorService.showAlert("warning", [{message:$filter('trad')("warning_geolocation_disabled")}])
						$scope.geoloc.near = false;
					}
				)
				$scope.SearchService.removeParameter("center");
				$scope.SearchService.removeParameter("home");
				$scope.SearchService.removeParameter("zipCode");	
				$scope.disablePicker = true;
			}
			
			$scope.selectHome = function(){
				$scope.SearchService.addParameter("home", true);
				$scope.SearchService.removeParameter("near");
				$scope.SearchService.removeParameter("center");
				$scope.SearchService.removeParameter("zipCode");	
				$scope.disablePicker = true;
			}
			
			//Passe en mode centre de la carte lorsque l'on bouge la map
			$scope.$on('setCenterMap', function(){
				//$scope.selectCenter();
				//$scope.$apply()
			})
			
			$scope.selectCenter = function(center){
				/*
				if(angular.isDefined(center) && angular.isDefined(center.latitude) && angular.isDefined(center.longitude)){
					$scope.SearchService.addParameter("center", {
						latitude : center.latitude,
						longitude : center.longitude
					});
				}
				else{
					//$scope.SearchService.addParameter("center", true);
				}
				*/
				$scope.SearchService.removeParameter("near");
				$scope.SearchService.removeParameter("home");
				$scope.SearchService.removeParameter("zipCode");	
				$scope.disablePicker = true;
			}

			$scope.$watch("typeaheadValue", function(newValue){				
				if($scope.selected && newValue){
					angular.forEach($scope.cities, function(value, key){
						if(value.label == $scope.typeaheadValue){							
							$scope.searchParams.city = {city: value.city, zipCode: value.zipCode};
						}
					})
				}
			})
			
			$scope.focusOut = function(){
				if($scope.selected){		
				}
				else{
					$scope.city = "";
				}
			}
			
			$scope.getGeoloc = function(){	
				var defered = $q.defer();
							
				GeolocService.getGeoloc(true).then(
					function(data){
						if(data.type == "HTML5loc"){
							defered.resolve();
						}
						//Refus de geoloc HTML5
						else{
							defered.reject();
						}
					//Ajouter la geoloc dans la requete de recherche
					},
					function(){
						console.log("Attention, Erreur de récupération geoloc");
						defered.reject();
					}
				);
				
				return defered.promise;
			}
			
			$scope.getUserGeoloc = function(){
				var UserService = $injector.get("UserService");
				if(UserService.isLoggedIn() && angular.isDefined(UserService.getUser().address) && angular.isDefined(UserService.getUser().address.location)){					
					$scope.geolocUser = UserService.getUser().address.location;
					$scope.showUserGeoloc = true;
				}
				else{
					$scope.showUserGeoloc = false;
				}
			}

			$scope.typeaheadFn = function(query, callback) {
				GooglemapService.getCities(query).then(
					function(result){
						if(result.cities.length > 0){
							var cit = [];
							$scope.cities = result.cities ;
							angular.forEach(result.cities, function(value, key){
								cit.push(value.label);
							})
							callback(cit);
						}
						else{
							callback([$filter("trad")("discover_geoloc_no_events")])
						}
					}, 
					function(data){
				 		ErrorService.showAlert('error', data.errors)
			  		}
			  	)
			}
		}
	}
}])
/*
.directive('tagsPicker',["GooglemapService","GeolocService", "$injector", 'ErrorService','$q', '$filter','$rootScope',function(GooglemapService,GeolocService,$injector,ErrorService,$q,$filter,$rootScope){
	
	return {
		restrict :'E',
		templateUrl : Config.templatesPublicURL + 'directives/tagsPickerSearch.html',
		controller: function($scope){
			$scope.initTagsPicker = function(){
				$scope.SearchService = $injector.get("SearchService");				
			}	
			
			$rootScope.$on('newSearch', function(action, value){
				$scope.searchNav = value.q;
			})
			
			$scope.getTags = function(query, callback) {
				GooglemapService.getTags(query).then(
					function(result){
						console.log("result",result);
						if(angular.isDefined(result.tags) && result.tags.length > 0){
							var tagArray = [];
							$scope.tags = result.tags ;
							angular.forEach(result.tags, function(value, key){
								tagArray.push(value.value);
							})
							callback(tagArray);
							$scope.noTags = false
						}
						else{
							//callback([$filter("trad")("discover_no_tags")])
						}
					}, 
					function(data){
				 		ErrorService.showAlert('error', data.errors)
			  		}
			  	)
			}
		}
	}
}])

*/