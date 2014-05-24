'use strict';

// eventList Event
var mapModule = angular.module('map.directives',[])
mapModule.directive('mapBoxSmall',
	function(){
		return{
			restrict: 'A',
			controller: function($scope){
				$scope.initMap = function(){
					$scope.minZoom = 15;
					$scope.maxZoom = 17;
					$scope.limit = 0.01;
					$scope.mapBoxID = Config.mapBoxID;
					$scope.map = mapbox.map('smap');
					//$scope.map.centerzoom({lat: $scope.eventSettings.address.location.lat,lon: $scope.eventSettings.address.location.lat}, 1);
					$scope.map.addLayer(mapbox.layer().id($scope.mapBoxID))
					
	                var markers = [{
	                	"geometry": {
	                		"type": "Point", 
	                		"coordinates": [$scope.eventSettings.address.location.lng, $scope.eventSettings.address.location.lat]
	                	},
	               		"properties": {"image": $scope.eventSettings.smallPhoto}
	                }]      
	                         
                	$scope.markerLayer = mapbox.markers.layer().features(markers).factory(function(f) {
	                	var elem = mapbox.markers.simplestyle_factory(f);
	                    elem.className = 'marker-image';
	                    elem.setAttribute('src', f.properties.image);
	                    return elem;       
	                })
	                $scope.map.addLayer($scope.markerLayer);
                	
                	//$scope.map.extent($scope.markerLayer.extent());
                	$scope.map.centerzoom({lat:$scope.eventSettings.address.location.lat, lon:$scope.eventSettings.address.location.lng}, $scope.minZoom);
                	$scope.map.setZoomRange($scope.minZoom, $scope.maxZoom);	
                	
                	$scope.map.addCallback('drawn', function() {
						//console.log("Zoom",$scope.eventSettings.address.location,$scope.map.zoom(),$scope.map.center())
			  		}); 
			  		
			  		
			  		$scope.map.coordLimits = [
				      $scope.map.locationCoordinate({ 
				      	lat: $scope.eventSettings.address.location.lat + $scope.limit, 
				      	lon: $scope.eventSettings.address.location.lng - $scope.limit
				      }).zoomTo($scope.minZoom),
				      $scope.map.locationCoordinate({ 
				      	lat: $scope.eventSettings.address.location.lat - $scope.limit, 
				      	lon: $scope.eventSettings.address.location.lng + $scope.limit
				      }).zoomTo($scope.maxZoom)
				    ];
				}
				$scope.initMap();
			}
		}	
	}
)
var mapboxDir = mapModule.directive('mapBox', 
	['popoverTimeBeforeHide',
	'$location',
	'$compile', 
	'$timeout', 
	'SearchService', 
	'UserService',
	function(popoverTimeBeforeHide,
		$location,
		$compile,
		$timeout,
		SearchService,
		UserService
	){
	
	return{
		restrict :'A',
		controller : function($scope){
			$scope.loading = true;
			$scope.initMapDir = function(){
				
				//ID mapbox
				$scope.mapBoxID = Config.mapBoxID;
				//Tant que l'on a pas d'événement la map n'est pas affichée
				$scope.mapReady = false;
				$scope.mapInitiated = false;
				/* Configuration map */	
				//Zoom minimum
				$scope.minZoom = 2;				
				//Zoom maximum	
				$scope.maxZoom = 17;
				//Zoom initial sur événement
				$scope.centerZoom = 15;
				//Zoom initial si pas d'évent
				$scope.initZoom = 2;	
				
				$scope.firstInit = false;			
				
				$scope.decreaseZoomRange = 0.5;
				
				$scope.eventsTemplate = UserService.getConfig().eventsTemplate;	
			}
			
			$scope.initMap = function(){
				console.log("init MAP");

				$scope.map = mapbox.map('map');
								
				//Boutons zoom
				$scope.map.ui.zoomer.add();	
				//Réglage zoom min max
				$scope.map.setZoomRange($scope.minZoom, $scope.maxZoom);		
					
				//Réglage zoom initial
				//$scope.map.zoom($scope.initZoom);

				$scope.mapInitiated = true;
			}
			

		    $scope.$watch("eventsTemplate", function(value){
		    	if(value == "events-cards"){    		
		    		//Afficher la carte
		    		$scope.mapReady = true;	    		
		    	}
		    	else{    		
		    		//Supprimer la carte;
		    		$scope.mapReady = false;
		    	}
		    	UserService.addConfig("eventsTemplate",value);
		    })
			
			$scope.$watch("mapReady", function(value){
				if(value && !$scope.mapInitiated){
					$scope.initMap();
				}
			})

			var checkVisible = function(){
				var inextent = [];
		      	var extent = $scope.map.extent();
		      	var evIndex;
		      	var foundNoVisible = false;
				for (var i = 0; i < $scope.markers.length; i++) {
		      		evIndex = $scope.findEventIndex($scope.markers[i].data.eventId );
		        	if (extent.containsLocation($scope.markers[i].location)) {
		           		
		          	}
		         	else{
		          		foundNoVisible = true;
		          	}	
		     	}
		     	return foundNoVisible;
			}
			
			$scope.makeMap = function(lat,lng){
				$scope.map.addLayer(mapbox.layer().id($scope.mapBoxID, function(){					
					 if(!$scope.$$phase) {
					 	$scope.$apply(function(){
					 		$scope.loading = false;
					 	})	
					 }
				}));

				//Suppression des markers
				if(angular.isDefined($scope.markerLayer))$scope.markerLayer.features([]);

				$scope.addMarkers();
				$scope.addPopover();
				
				if(angular.isDefined(SearchService.getParameters().center)){				
					console.log("Affichage: centre");
					$scope.dezoomTo(SearchService.getParameters().center.latitude,SearchService.getParameters().center.longitude);					
				}
				else if (angular.isDefined(SearchService.getParameters().city)){
					console.log("Affichage: dezoom")
					$scope.dezoomTo(SearchService.getParameters().city.latitude,SearchService.getParameters().city.longitude);					
				}
				else if($scope.eventsList.length > 0){
					console.log("Affichage: auto");
					$scope.map.extent($scope.markerLayer.extent());	
				}
				else{					
					var geoloc = SearchService.getParameters().geoloc;
					console.log("Affichage: autre", geoloc,UserService.getGeoloc());
					if(angular.isDefined(geoloc) && angular.isDefined(geoloc.latitude)){
						$scope.setCenterzoom(geoloc.latitude,geoloc.longitude);
					}
					else if(angular.isDefined(UserService.getGeoloc()) && UserService.getGeoloc()){
						$scope.setCenterzoom(UserService.getGeoloc().lat,UserService.getGeoloc().lng);
					}
				}
				$scope.mapReady = true;
				$scope.firstInit = true;
				$scope.addCallback();		
				$scope.refresh = false;	
			}
			
			$scope.dezoomTo = function(lat,lng){
				$scope.setCenterzoom(lat,lng);
					
		      	var count = 0;
		      	var continueS = true;
		      	while(continueS){		
			      	var extent = $scope.map.extent();
			      	var foundNoVisible = false;
					for (var i = 0; i < $scope.markers.length; i++) {
			        	if (extent.containsLocation($scope.markers[i].location)) {
			           		
			          	}
			         	else{
			          		foundNoVisible = true;
			          	}	
			     	}      		
		      		count++;
		      		if(count > 100) continueS = false;
			      	
			     	if(foundNoVisible && $scope.map.zoom() > $scope.minZoom){
						var newZoom = $scope.map.zoom() - $scope.decreaseZoomRange;
			     		$scope.map.zoom(newZoom);
			     	}				     	
			     	else{
			     		continueS = false;
			     	}
		     	}
			}
			
			$scope.setCenterzoom = function(lat, lng, zoom){	
				if(angular.isDefined(zoom)){
					$scope.map.centerzoom({lat: lat,lon: lng}, zoom);
				}	
				else{
					$scope.map.centerzoom({lat: lat,lon: lng}, 15);
				}									
			}
			
			$scope.findMarker = function(id){
				var el;
				
				angular.forEach($scope.markers, function(value, key){
					
					if(value.data.eventId == id){
						el = value;
					}
				})
				return el;
			}

			$scope.findEventIndex = function(id){
				var ev;
				var i = 0;
				angular.forEach($scope.eventsList, function(value, key){
					if(value.id == id){
						ev = i;
					}
					i++;
				})
				return ev;
			}
			
			$scope.addMarkers = function(){
				var eventsMarkers = [];
				
				//test
				/*
				var markers = new L.MarkerClusterGroup();

			    angular.forEach($scope.eventsList, function(value, key) {
					var marker = L.marker(new L.LatLng(value.address.location.lng, value.address.location.lat), {
						"geometry": {"type": "Point", "coordinates": [value.address.location.lng, value.address.location.lat]},
               			"properties": {"image": value.smallPhoto,"url":"/events/"+value.id,"id":value.id},
						"eventId": value.id
          			 });

			        markers.addLayer(marker);
   				})
				
			    $scope.map.addLayer(markers);
			    */
				//test au dessus
				
				
				angular.forEach($scope.eventsList, function(value, key) {
					eventsMarkers.push({
						"geometry": {"type": "Point", "coordinates": [value.address.location.lng, value.address.location.lat]},
               			"properties": {"image": value.smallPhoto,"url":"/events/"+value.id,"id":value.id},
						"eventId": value.id
          			 })
   				})
                               
                $scope.markerLayer = mapbox.markers.layer().features(eventsMarkers).factory(function(f) {
                	var elem = mapbox.markers.simplestyle_factory(f);
                    elem.className = 'marker-image';
                    elem.setAttribute('src', f.properties.image);
                           
                    MM.addEvent(elem, 'click', function(e) {
                    	//Affiche l'événement clické
                        $scope.$apply(function(){
                        	$('.block-card').removeClass("hover");
                        	$('#'+f.properties.id).addClass("hover")     						
                    	 	$("#events-cards").animate({scrollTop: $('#'+f.properties.id).offset().top});   
                        })
                    });                      
					return elem;
                });
               
				$scope.map.addLayer($scope.markerLayer);
				
                $scope.markers = $scope.markerLayer.markers();
                
            }
					
			$scope.closePopovers = function(){
				angular.forEach($scope.markers, function(value,key){
					$(value.element).popover('hide');
				})	
			}
			
			$scope.addPopover = function(){
				$scope.eventsPopover = [];

				angular.forEach($scope.markers, function(value,key){
					var eventIndex = $scope.findEventIndex(value.data.eventId)
					$scope.content = $compile('<card data-resource="eventsList[' + eventIndex + ']" data-type="events" data-format="medium"></card>')($scope);
					//$scope.content = $compile("<event-hovercard ev=\"eventsList["+eventIndex+"]\"></event-hovercard>")($scope);

					 //Ajout popover
				    angular.element(value.element).popover({
				    	html: true,
				    	placement: "top",
				    	trigger: "manual",
				    	content: $scope.content,
				    	animation:false,
						container : $("#map")
				    }).on('show', function(){
                       // $(value.element).attr("src","assets/images/marker-hover.png")
                        angular.element(value.element).css("z-index","20000")
                    }).on('hide', function(){
                            //$(value.element).attr("src","assets/images/marker.png")
                            angular.element(value.element).css("z-index","1")
                    })
                    
                    .mouseover(function(){
				    	$scope.closePopovers()
                            $timeout.cancel($scope.to);$scope.$apply()
                            angular.element(value.element).popover("show")

				    	//Ajoute une classe hover sur le marker	    	
				    	angular.element(value.element).addClass('hover');
				    	
				    	//Ajoute une classe hover sur les popover
				    	angular.element("#map").children('.popover')
                            .mouseenter(function() {
						      angular.element(this).addClass('hover');
						    })
                            .mouseleave(function(){
							    angular.element(this).removeClass('hover');
                                if(!$(value.element).hasClass("hover")){
                                    console.log("HIDE");
                                    angular.element(value.element).popover("hide")
                                }
						    })

				    }).mouseleave(function(){
				    	//Supprime la classe hover du marker
				    	angular.element(value.element).removeClass('hover');

						$scope.to = $timeout(function(){
							if(!angular.element("#map").children('.popover').hasClass("hover") && !angular.element(value.element).hasClass("hover")){
								console.log("hide");
                                angular.element(value.element).popover("hide")
							}						
						},popoverTimeBeforeHide)						
				    })
					
				    //Conservation des elements pour afficher les popovers
				    $scope.eventsPopover.push($(value.element));
				})
			}
			
			$scope.move = function(){
                $scope.closePopovers()
				//Passer en mode centre de la carte
				if($scope.mapInitiated){
					//$scope.$broadcast("setCenterMap");
					if(!($scope.map.center().lat == 0 && $scope.map.center().lon == 0)){
						SearchService.addParameter("center",{latitude:$scope.map.center().lat,longitude:$scope.map.center().lon});			
					}
				}				
			}
			
			$scope.addCallback = function(){
				$scope.map.addCallback('drawn', function() {

			      	var inextent = [];
			      	var extent = $scope.map.extent();
			      	var evIndex;
			      	for (var i = 0; i < $scope.markers.length; i++) {
			      		evIndex = $scope.findEventIndex($scope.markers[i].data.eventId );
			        	if (extent.containsLocation($scope.markers[i].location)) {
			            	inextent.push($scope.markers[i]);
							$scope.eventsList[evIndex].visible = false;
			          	}
			         	else{
			          		$scope.eventsList[evIndex].visible = true;
			          	}	
			     	}
			     	$scope.move();
			     	
			     	if(!$scope.$$phase) {
						$scope.$apply()
					}	
			        
			  	}); 
			}
			
			//Afficher un marker sur la carte
			$scope.showMarker = function(id){
				if($scope.mapReady){
					var el = $scope.findMarker(id);
					if(angular.isDefined(el))$(el.element).popover("show");
				}	
			}	
			
			$scope.hideMarker = function(id){
				if($scope.mapReady){
					var el = $scope.findMarker(id)
					if(angular.isDefined(el))$(el.element).popover("hide");
				}	
			}	
			
			$scope.$on('hideMarker', function(action, data){
				$scope.hideMarker(data);
			})
			
			//Centrer la map sur un marker
			$scope.centerMap = function(id){
				var marker = $scope.findMarker(id);

				$scope.map.ease.location({
	            	lat: marker.data.geometry.coordinates[1],
	              	lon: marker.data.geometry.coordinates[0]
	            }).zoom($scope.map.zoom()).optimal(null,null, function(){
	            	//Callback optimal : Afficher le popover
	           		$scope.$apply(function(){
	           			$scope.showMarker(id); 
	           		})	           		
	            });	      
			}				
			
			$scope.initMapDir()

			$scope.$watch("eventsList", function(value){
				if(value && $scope.mapReady){
					console.log("->Nouveaux résultats",$scope.mapReady,SearchService.getLastParameters(),$scope.map.center())
					//S'il y a des événements
					if(value.length > 0 || !$scope.firstInit || (value.length == 0 && SearchService.getLastParameters().latitude.toFixed(4) != $scope.map.center().lat.toFixed(4) && SearchService.getLastParameters().longitude.toFixed(4) != $scope.map.center().lon.toFixed(4))){
						$scope.makeMap();
					}
					else{
						if(angular.isDefined($scope.markerLayer))$scope.markerLayer.features([]);
						console.log("no events")
						$scope.refresh = false;
					}
				}	
			})
		}
	}
}])