'use strict';

//Directives Jquery
var jqueryMod = angular.module('jquery.directives',[]).directive('fade', function () {
        return {
            restrict: 'A',
            link: function(scope, elm, attrs) {
                //var duration = parseInt(attrs.fadey);
                //if (isNaN(duration)) {
                var duration = 500;
                //}
                elm = jQuery(elm);
                elm.hide();
                elm.fadeIn(duration);

                scope.destroy = function(complete) {
                    elm.fadeOut(duration, function() {
                        if (complete) {
                            complete.apply(scope);
                        }
                    });
                };
            }
        }
})

.directive('tooltip', function() {
	return function(scope, element, attrs, ctrl) { 
	
		attrs.$observe('title', function(value){
			element.tooltip('hide')
          .attr('data-original-title', value)
          .tooltip('fixTitle')
		})

		if(attrs.container = "body"){
			element.tooltip({
				container:'body',
				animation:false	
			}).click(function(){
				element.tooltip('hide');
			})
		}
		else{
			element.tooltip({
				animation:false	
			}).click(function(){
				element.tooltip('hide');
			})
		}
		
     }   		
})

.directive('datetimepicker', ['$filter',function($filter) {
	return{
		require: '?ngModel',
		link: function(scope, element, attrs, ngModel) { 
			var startDate = new Date();

			element.parent().datetimepicker({
		        format: "dd MM yyyy - hh:ii",
		        autoclose: true,
		        pickerPosition: "bottom-left",
		        language:"fr",
		        startDate: startDate,
		        weekStart: 1,
		    }).on('changeDate', function(ev) {	
		    	scope.$apply(function(){
			    	if(ev.date && angular.isDefined(ev.date)){   
			   			var date = new Date(ev.date.getTime());
			   			date.setHours(date.getHours()-2);
			        	read(date.getTime());		        		
			        }	
			        else{
			        	if(ngModel.$name == "endTimestamp"){
			        		delete scope.endTimestamp
			        	}
			        	else{
			        		delete scope.startTimestamp
			        	}
			        }

	        		if(angular.isDefined(scope.startTimestamp) 
						&& angular.isDefined(scope.endTimestamp) 
						&& (scope.startTimestamp > scope.endTimestamp)){
							scope.incorrectDates = true;
						}
					else{
						scope.incorrectDates = false;
					}
				});	
		    });

		    function read(timeStamp) {
		       ngModel.$setViewValue(timeStamp);
		    }
     	}   	
	}
}])

.directive('price', ["$filter",function($filter) {
	return { 
		restrict : 'A',
		scope : {
			price: "="
		},
		templateUrl : Config.templatesPublicURL + 'directives/price.html',
		controller: function($scope){
			$scope.init = function(){
				$scope.$watch('price', function(newValue){
					if(angular.isDefined($scope.price) && $scope.price > 0){
						$scope.value = $filter("currency")(newValue)
					}
					else{
						$scope.value = "Gratuit";
					}
				})
			}
			$scope.init();
		}	
	}  		
}])

.filter('formatedDate', ["$filter",function ($filter) {

        return function (dates) {
        	var today = new Date();
        
        	//deux timestamps
        	if(angular.isArray(dates) && angular.isDefined(dates[0]) && angular.isDefined(dates[1])){
        		//jour identique?
        		var trad,format,date;
        		var t1 = new Date(dates[0])
        		var t2 = new Date(dates[1])
        		var sameDay = (t1.getDay() == t2.getDay())

				format = ""
				if(t1.getYear() != today.getYear()){
					trad = $filter('trad')('internationalization_fulldatehour')
				}
				else{
					trad = $filter('trad')('internationalization_datehour')
				}
				format += $filter('date')(dates[0], trad)
				format += " " + $filter('trad')('label_to') + " ";
				
				if(!sameDay){
					if(t2.getYear() != today.getYear()){
						trad = $filter('trad')('internationalization_fulldatehour')
					}
					else{
						trad = $filter('trad')('internationalization_datehour')
					}
				}
				else{
					trad = $filter('trad')('internationalization_hour')
				}	
				
				format += $filter('date')(dates[1], trad);
        	}
        	//Un seul timestamp
        	else{
				if(angular.isArray(dates) && angular.isDefined(dates[0])){
					var date = new Date(dates[0])
				}
				else{
					var date = new Date(dates);
				}
        		
				//Vérification année différente
				if(date.getYear() != today.getYear()){
					var trad = $filter('trad')('internationalization_fulldatehour')
				}
				else{
					var trad = $filter('trad')('internationalization_datehour')
				}

        		var format = $filter('date')(date, trad)
        	}

            return format;
        };
}])

.directive('fileUpload', ["UserService","RouteService","ErrorService", "$stateParams","$filter",function(UserService, RouteService,ErrorService,$stateParams,$filter) {
	return {
  		restrict : 'A',
  		
		link : function(scope, element, attrs, ctrl) {
			console.log("init real",scope)
			if(attrs.csType == "ShowEventCtrl"){
				var path = RouteService.getRootPathAPI() + "events/" + $stateParams.eventId + "/photos" + "?token=" + UserService.token() 
			}
			else if(attrs.csType == "ParameterCtrl"){
				scope.d = new Date().getTime();
				var path = RouteService.getRootPathAPI() + "users/" + UserService.id() + "/photo" + "?token=" + UserService.token() 
			}
			else if(attrs.csType == "EventsSettingsCtrl"){
				var path = RouteService.getRootPathAPI() + "events/" + scope.eventSettings.id + "/photo" + "?token=" + UserService.token() 
			}
			else if(attrs.csType == "organizationSettingsCtrl"){
				console.log("scope",scope)
				var path = RouteService.getRootPathAPI() + "organizations/" + scope.$parent.organizationSettings.id + "/photo" + "?token=" + UserService.token() 
			}
						
			console.log("path",path)		
	   		var options = {
	    		url :  path,
				dataType : 'json',
				multipart : true,
				method: "POST",
				forceIframeTransport: false,

				success : function(data, status, headers, config) {
					if(angular.isUndefined(data.errors)){					
						if(attrs.csType == "ParameterCtrl"){
							ErrorService.showAlert("success",[data.success])
							
							scope.$apply(function(){
								//MAJ PHOTO
								scope.$parent.mySettingsForm.smallPhoto	= data.photo;						
								scope.$parent.d = new Date().getTime();
		            		})	
						}
						else if(attrs.csType == "ShowEventCtrl"){
							scope.$apply(function(){
								ErrorService.showAlert("success",[data.success])
			            		scope.photos.push(data.photo);          				
		            		})	
						}  
						else if(attrs.csType == "AddEventCtrl"){
							scope.$apply(function(){							
								//scope.d = new Date();
		            		})	
						} 
						else if(attrs.csType == "EventsSettingsCtrl"){
							ErrorService.showAlert("success",[data.success])	
							scope.$apply(function(){						
								scope.$parent.$parent.eventSettings.mediumPhoto = data.photo;
								scope.$parent.$parent.d = new Date().getTime();
							})	
						}	     	
						else if(attrs.csType == "organizationSettingsCtrl"){
							ErrorService.showAlert("success",[data.success])	
							scope.$apply(function(){					
								scope.$parent.$parent.organization.mediumPhoto = data.photo; 
								scope.$parent.$parent.d = new Date().getTime();
							})
						}
		            }
		            else{
		            	scope.$apply(function(){
		            		ErrorService.showAlert('error', data.errors)	
		            	})		            	
		            }
				},
				add: function (e, data) {
					var loadImage = function(){
						var _URL = window.URL || window.webkitURL;
		        		var img = new Image();
				        img.onload = function () {
				        	var l = 0, t = 0, w = 0, h = 0;
				        	var size = $('#preview-wrapper').width();
				        	
				            if (this.width != this.height) {
				            	var ratio = 0;
				            	
							   if (this.width > this.height) {
							  	 	ratio = this.height / size;
							  	 	h = size;
							  	 	w = this.width / ratio;
							  	 	l =  -((this.width - w) / 4 / ratio);
						       }
							   else {
					           		ratio = this.width / size;
					           		w = size;
					           		h = this.height / ratio;
					           		t = -((this.height - h) / 4 / ratio);
							   }
					        }

				        	$('#preview').width(w).height(h);
				        	$('#preview').css({'max-width': 'none', 'top': t,'left': l });
				        	
				        	$('#preview-wrapper').height(size);
				        	
				        	$('#preview').attr('src', this.src);
				        };
				        img.src = _URL.createObjectURL(data.files[0]);
					}
					
			        var goUpload = true;
			        var uploadFile;
			        var errors = [];
			        angular.forEach(data.files, function(value,key){
			        	uploadFile = data.files[0];
				        if (!(/(\.|\/)(jpe?g|JPE?G|png|PNG)$/i).test(uploadFile.name)) {
				            errors.push({message:$filter('trad')('error_file_type_invalid')});
				            goUpload = false;
				        }
				        if (uploadFile.size > 6000000) { // 6mb
				            errors.push({message:$filter('trad')('error_file_length_invalid')});
				            goUpload = false;
				        }
			        })
			        
			        if (goUpload == true) {

			        	if(attrs.csType == "AddEventCtrl" || attrs.csType == "OrganizationCtrl"){
			        		loadImage();

					        //Dimensions dispo -> this.width this.height     
			        		scope.$broadcast("fileSelected", { file: data.files[0], e:e });
			        	}
			        	else if(attrs.csType == "EventsSettingsCtrl"){
			        		data.submit();
			        	}
			        	else{
			        		data.submit();	
			        	}
			        }
			        else{
			        	ErrorService.showAlert('error', errors)
			        	scope.$apply()
			        }
				},
			    error : function(data, status, headers, config) {
			    	ErrorService.showAlert('error', [{message:$filter('trad')('error_upload')}])
			    },			   
		        fail : function(){
		        	ErrorService.showAlert('error', [{message:$filter('trad')('error_upload')}])
		        },
		        start : function(e, data) {
					scope.$apply(function(){
						scope.$parent.showProgress = true;
						scope.$parent.currentProgress = 0;
					})
			    },
			    progress: function(e,data){			    	
				    var progress = parseInt(data.loaded / data.total * 100, 10);
				    scope.$apply(function(){
				    	console.log("progress all",progress);
						scope.$parent.currentProgress = progress;
					})
			    },
			
			    progressall : function (e, data) {			    	
				    var progress = parseInt(data.loaded / data.total * 100, 10);
				    scope.$apply(function(){
				    	console.log("progress all",progress);
						scope.$parent.currentProgress = progress;
					})
			    },
				stop : function(e, data) {
					scope.$apply(function(){
						scope.$parent.showProgress = false;
					})
				}
			}
			element.fileupload();
			element.fileupload('option',options)
			
			/*
			Permet d'avoir des infos sur le taux de transferts
			.bind('fileuploadprogress', function (e, data) {
			    // Log the current bitrate for this upload:
			    console.log(data.bitrate);
			});
			*/
		} 
	}
}])

.directive('ngFocus', ['$parse', function($parse) {
  return function(scope, element, attr) {
    var fn = $parse(attr['ngFocus']);
    element.bind('focus', function(event) {
    //console.log("focus",scope,attr)   ;
      scope.$apply(function() {
      	scope[attr.name+"show"] = true;
        fn(scope, {$event:event});
      });
    });
  }
}])

.directive('ngBlur', ['$parse', function($parse) {
  return function(scope, element, attr) {
    var fn = $parse(attr['ngBlur']);
    element.bind('blur', function(event) {
      scope.$apply(function() {
      	scope[attr.name+"show"] = false;
        fn(scope, {$event:event});
      });
    });
  }
}])

.directive('inputBlur', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elm, attr, ngModelCtrl) {
            if (attr.type === 'radio' || attr.type === 'checkbox') return;          
            elm.unbind('input').unbind('keydown').unbind('change');
            elm.bind('blur', function() {
                scope.$apply(function() {
                    ngModelCtrl.$setViewValue(elm.val());
                });         
            });
        }
    };
})

.directive('popover', function() {
	return function(scope, element, attrs, ctrl) { 
		element.popover({animation:false});
		
		attrs.$observe('title', function(value){
			element.data('popover').options.title = value;
		})
		attrs.$observe('content', function(value){
			element.data('popover').options.content = value;
		})	
		
		attrs.$observe('show', function(value){	
			if(value=="true"){
				element.popover('show')
			}
			else{
				element.popover('hide')
			}
		})
     }   		
})

.directive('btClear', function(){
	return function(scope, elm, attrs) {
		elm.inputClear();
		$('.clear-text').click(function(d){
			console.log("click",d)
		});	
	}
})
.directive('classss', function(){
	return function(scope, elm, attrs) {
		console.log(elm.width(),elm.height());
	}		
})
.directive('nested', function(){
	return function(scope, elm, attrs) {
		elm.click(function(){
			elm.nested({selector: '.box'});
		})
		console.log("scope",scope.photos);
		scope.$watch("photos", function(){
			console.log("change!!");
		},true)
		
		//Make Box	
		var makeBoxes = function() {
			var boxes = [],
	      	count = Math.random()*15;
	      	if (count < 5) count = 5;
	
		  	for (var i=0; i < count; i++ ) {
		    	var box = document.createElement('div');
		    	box.className = 'box size' +  Math.ceil( Math.random()*3 ) +  Math.ceil( Math.random()*3 );
		    	// add box DOM node to array of new elements
		    	boxes.push( box );
		  	}
			
		  	return boxes;
		};
	}
})

.directive('angularHtmlBind', function($compile,$filter) {
    return function(scope, elm, attrs) {
    	attrs.$observe('angularHtmlBind',function(value){
    			elm.html($filter('trad')(value));
           		$compile(elm.contents())(scope);
    	})
    	/*
        scope.$watch(attrs.angularHtmlBind, function(newValue, oldValue) {
        	console.log("attrs",attrs,newValue,oldValue)
            if (newValue && newValue !== oldValue) {
            	//console.log("newValue",newValue,oldValue,$filter('trad')(newValue))
                elm.html($filter('trad')(newValue));
                $compile(elm.contents())(scope);
            }
        });
        */
    };
})

.directive('invite',
	[
	'$modal',
	'UserService',
	'ErrorService',
	'$rootScope',
	'$filter',
	 function(
	 	$modal,
		UserService,
		ErrorService,
		$rootScope,
		$filter
	){
	return{
		restrict:'EA',
		
		scope:{
			user:"="
		},

		controller:function($scope){
			$scope.Config = $rootScope.Config;

			$scope.available = function(){
				return (UserService.isLoggedIn() && angular.isDefined($scope.user)&&  UserService.getUser().id != $scope.user.id)?true:false;
			};
			
			$scope.show = function(){	
				$scope.events = [];		
				$scope.guestEvents = [];
				$scope.userEvents = [];
				$scope.userEventsReady = false;
				$scope.guestEventsReady = false;
					
				$modal({
			      template: Config.templatesPublicURL+'users/modals/invite.html',
			      show: true,
			      backdrop: 'static',
			      scope: $scope
				});
			}	
			
			//Vérifie si on a récupéré les 2 listes d'événements
			$scope.createList = function(){
				if($scope.userEventsReady && $scope.guestEventsReady){
					$scope.events = $scope.availableEvents();
					console.log("available events",$scope.events)
					$scope.loadingEvents = false;
				}
			}
			
			$scope.initNew = function(){
				console.log("init new")	
				$scope.loadingEvents = true;
				//Récupération des événements de l'utilisateur connecté
				console.log("1")
				UserService.getEvents(["opened_event"]).then(
					function(data){	
						$scope.userEvents = $scope.joinableEvents(data);
						$scope.userEventsReady = true;
						$scope.createList();
					}
				);
			
				//Récupération des événements de l'invité
				UserService.getEvents(["opened_event"], $scope.user.id).then(
					function(data){	
						$scope.guestEvents = $scope.joinableEvents(data);
						$scope.guestEventsReady = true;
						$scope.createList();
					}
				);
			}
			
			//invite l'utilisateur à tous les événements sélectionnés
			$scope.invite = function(hide){
				$scope.inviting(true);
				angular.forEach($filter('filter')($scope.events,{checked:true}), function(value, key){
					UserService.invite(value.id, $scope.user.id).then(
						function(data){
							if(angular.isUndefined(data.errors)){
								ErrorService.showAlert("success", [data.success]);
								$scope.inviting(false);
								hide();								
							}	
						},
						function(){
							$scope.inviting(false);
						}
					)
				})
			}
			
			//Renvoi les événements auquel l'invité ne participe pas déjà
			$scope.availableEvents = function(){
				var events = [];
				var available = true;
				angular.forEach($scope.userEvents, function(value, key){
					angular.forEach($scope.guestEvents, function(value2, key){
						console.log("id organizer",value.organizer.id,$scope.user.id)
						if((value2.participation && (value2.id == value.id) )|| (value.organizer.id == $scope.user.id)){
							console.log("!!!")
							available = false;
						}
					})	
					if(available){
						console.log("true",value)
						value.available = true;					
					}
					else{
						console.log("false",value)
						value.available = false;	
						available = true;
					}
					events.push(value);	
				})
				
				return events;
			}
			
			//N'ajoute que les événements avec de la place
			$scope.joinableEvents = function(data){				
				var events = [];
				angular.forEach(data, function(value, key){
					if(angular.isUndefined(value.places) || value.places >= 0){
						events.push(value);
					}
				})
				return events;
			}	
		
			$scope.inviting = function(val){
		    	if(val){
		    		angular.element(".inviting").button('loading');
		    	}
		    	else{
		    		angular.element(".inviting").button("reset");
					angular.element(".inviting").button("toggle");
					angular.element(".inviting").removeClass("active");
		    	}
		    }
		}
	}
}])

.directive('follow',
	['$modal',
	'UserService',
	'ErrorService',
	function(
		$modal,
		UserService,
		ErrorService
	){
	
		return{
			restrict: 'A',
			scope:{
				community:'='
			},
			link: function(scope, elm, attrs) {
				elm.click(function(){
					scope.$apply(function(){
						scope.follow();
					})
				})
			},	
			controller: function($scope){
				$scope.label="label_follow";
				
				$scope.isLogged = UserService.isLoggedIn();
				
				$scope.enable = function(){
					$scope.following = true;
					$scope.followed = "active";
					$scope.label = "label_unfollow";
				}
				
				$scope.disable = function(){
					$scope.following = false;
					$scope.followed = "";
					$scope.label = "label_follow";
				}
				
				$scope.initFollow = function(){
					if(UserService.isLoggedIn()){
						var communities = UserService.getUser().communities;
	
						var found = false;
						if(angular.isDefined(communities)){
							angular.forEach(communities, function(value, key){
								if($scope.community && $scope.community.id == value.id){
									found = true;
								}
							})
							if(found){
								$scope.enable();	
							}
							else{
								$scope.disable();
							}
						}
					}					
				}

				$scope.follow = function(){
					if(!$scope.following){
						$scope.enable();			
						UserService.addCommunity($scope.community).then(
							function(data){
								if(angular.isUndefined(data.errors)){
									ErrorService.showAlert("success",[data.success]);
								}
								else{
									ErrorService.showAlert("error",data.errors);
									$scope.disable();
								}
							}
						)
					}
					else{
						$scope.disable();
						
						UserService.deleteCommunity($scope.community.id).then(
							function(data){
								if(angular.isUndefined(data.errors)){
									ErrorService.showAlert("success",[data.success]);
								}
								else{
									ErrorService.showAlert("error",data.errors);
									$scope.enable();
								}
							}
						)
					}
				}
				
				$scope.initFollow();
			}
		}		
}])

.directive('embeded',
	['$modal',
	function(
		$modal
	){
	return{
		restrict:'A',
		scope:{
			id:'=',
			type:'@'
		},
		link: function(scope, elm, attrs) {
				elm.click(function(){
					scope.content = '<div class="otter-r otter-' + scope.type + '" id="' + scope.id + '"></div>';
					scope.content += '<script async src="' + Config.apiURL + '" charset="utf-8"></script>';
					
					scope.$apply(function(){
						scope.modal = $modal({
					    	template: Config.templatesPublicURL + 'modals/embeded.html',
					      	show: true,
					      	backdrop: 'static',
					      	scope: scope				      	
						});
					})
				})
		},	
		controller: function($scope){
			
		}
	}		
}])

.directive('subscribe', 
	['$modal',
	'UserService',
	'ErrorService',
	function(
		$modal,
		UserService,
		ErrorService
	){
		return{
			restrict :'A',
			scope:{},
        	controller: function($scope){	
        		$scope.isLogged = UserService.isLoggedIn();
        		
        		$scope.initSubscribe = function(){
        			
        			if(UserService.getUser().tags){
	        			$scope.tags = UserService.getUser().tags;
	        		}
	        		else{
	        			$scope.tags = [];
	        		}
        		}
        		      		       		
        		$scope.checkAddress = function(){
        			if(angular.isUndefined(UserService.getUser().address))	$scope.noAddress = true;
        			else	$scope.noAddress = false;
        		}
        		
        		$scope.saveAddress = function(address){
        			
        			$scope.formSent = true;
        			if(angular.isDefined(address) && angular.isDefined(address.lat)){
        				$scope.loading("addressing",true);
	        			UserService.updateParameter(address).then(
	        				function(data){
	        					if(angular.isUndefined(data.errors)){
		        					ErrorService.showAlert("success", [data.success]);
		        					//update user
		        					UserService.loadUser(data.member,true);	
		        					$scope.loading("addressing",false);
		        					$scope.checkAddress();
	        					}
	        					else{
	        						ErrorService.showAlert("error", data.errors);
	        						$scope.loading("addressing",false);
	        					}      					
	        				}
	        			);
	        		}	
        		}

        		$scope.initTags = function(){
        			if(angular.isDefined(UserService.getUser().tags)){
        				console.log("user have tags",UserService.getUser().tags)
        				$scope.tags = UserService.getUser().tags;
        			}
        			else{
        				console.log("user do not have tags")
        				$scope.tags = [];
        			}
        		}
        		
        		$scope.createTags = function(){
			    	//Parsage des tags
					if($scope.tags.length > 0){
						var tags = "";
						angular.forEach($scope.tags, function(value,key){
							tags += value + ",";
						});
						tags = tags.slice(0,-1);
						return tags;
					}
			    }

        		$scope.show = function(){	
        			$scope.initSubscribe();
        			$scope.checkAddress();
					
					$scope.modal = $modal({
				      template: Config.templatesPublicURL+'events/modals/subscribe.html',
				      show: true,
				      backdrop: 'static',
				      scope: $scope,
				      persist:true
					});
				}	
				
				$scope.subscribe = function(hide){
					$scope.loading("subscribing",true);
					UserService.updateParameter({tags: $scope.createTags()}).then(
						function(data){
							ErrorService.showAlert("success", [data.success]);
							UserService.loadUser(data.member, true);
							$scope.loading("subscribing",false);
							hide()
						},
						function(data){
							ErrorService.showAlert("error", data.errors);
							$scope.loading("subscribing",false);
						}
					)
				}
				
				$scope.loading = function(type,val){
			    	if(val){
			    		angular.element("." + type).button('loading');
			    	}
			    	else{
			    		angular.element("." + type).button("reset");
						angular.element("." + type).button("toggle");
						angular.element("." + type).removeClass("active");
			    	}
		    	}
		    	
        	}	
		}
}]).directive('tagsPicker',
	['UserService',
	'ErrorService',
	'memberTagsLimit',
	'EventsService',
	function(
		UserService,
		ErrorService,
		memberTagsLimit,
		EventsService
	){
	return{
		restrict:'AE',
		scope:{
			tags: '='
		},
		templateUrl: Config.templatesPublicURL+'directives/tagsPicker.html',
		controller:function($scope){
			console.log("init TagsPicker")

			$scope.selectedValue = function(value){
				$scope.newTag = value;
				$scope.addTag();			
			}
			
			$scope.initTags = function(){	
				console.log("initTagss",$scope.typeahead)						
				EventsService.getTags().then(
					function(tags){								
						$scope.typeahead = [];
						angular.forEach(tags,function(value,key){						
							$scope.typeahead.push(value.value);
						})						
					}
			  	)
			}
			
			$scope.initTags();
					
			//Vérifier l'existence d'un tag dans liste des tags
			$scope.existTag = function(){
				var exist = false;
				angular.forEach($scope.tags, function(value,key){
					if(value == $scope.newTag){
						exist = true;
					}
				});
				return exist
			}

			//Ajoute un tag dans la liste des tags
		    $scope.addTag = function(key){
		    	if($scope.tags.length < memberTagsLimit){
		            if($scope.newTag && !$scope.existTag()){
		                $scope.tags.push($scope.newTag)
		            }
		        }
		        else{
		        	$scope.showTagsLimit = true;         	
		        }
		
		        $scope.newTag = "" ;		           	
		    }
			
			//Suppression tag liste des tags
		    $scope.deleteTag = function(name){
		    	$scope.showTagsLimit = false;  
		    	//masquer erreurs
		    	if($scope.tags.length == memberTagsLimit){
		    		ErrorService.hideAlert();
		    	}
		    	angular.forEach($scope.tags, function(value, key){
					if(name == value){
						$scope.tags.splice(key, 1);
					}
				});
		    }  
		    
  		}  
  	}	
}])	

.directive('share',
	[
	'$modal',
	'$location',
	 function(
	 	$modal,
		$location
	){
	return{
		restrict:'EA',
		scope:{
			url:"=",
			description:"=",
			atitle:"="
		},

		link: function(scope, elm, attrs) {
			scope.Config = Config;

			if(angular.isUndefined(attrs.url)){
				//Récupéraiton de l'url absolue
				scope.currentUrl = $location.absUrl();	
				//Maintiens le liens à jours même si l'url change
				scope.$watch(function(){
					return $location.absUrl();
				}, function(value,c){
					scope.currentUrl = value;		
				})
			}
			else{
				scope.$watch("url",function(value){
					scope.currentUrl = scope.url;
				})
			}

			elm.click(function(){
				scope.$apply(function(){								
					$modal({
				      template: Config.templatesPublicURL + 'modals/share.html',
				      show: true,
				      backdrop: 'static',
				      scope: scope
					});
				})
			})
		}
	}	
}]).directive('addthisToolbox', function() {
    return {
        restrict: 'A',

        link: function ($scope, element, attrs) {
        	$scope.$watch("currentUrl", function(value){
	            // Dynamically init for performance reason
	            // Safe for multiple calls, only first call will be processed (loaded css/images, popup injected)
	            // http://support.addthis.com/customer/portal/articles/381263-addthis-client-api#configuration-url
	            // http://support.addthis.com/customer/portal/articles/381221-optimizing-addthis-performance
	       
	            addthis.init();
	            // Ajax load (bind events)
	            // http://support.addthis.com/customer/portal/articles/381263-addthis-client-api#rendering-js-toolbox
	            // http://support.addthis.com/customer/portal/questions/548551-help-on-call-back-using-ajax-i-lose-share-buttons
	            //addthis.button('.addthis_button_tweet', {}, {url: $scope.currentUrl, text: "voila mon texte",title:"voila mon texte"});
	            console.log("addthis",addthis)
	            addthis.button('.textbt', {}, {url: $scope.currentUrl, text: "voila mon texte",title:"voila mon texte"});
				
	            console.log("element",$(element).get())
				addthis.toolbox($(element).get());
        	})
        	
        }
    }
}).directive('fileUpload', function () {
    return {
        scope: true,        //create a new scope
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var files = event.target.files;
                //iterate files since 'multiple' may be specified on the element
                for (var i = 0;i<files.length;i++) {
                    //emit event upward
                    scope.$emit("fileSelected", { file: files[i] });
                }                                       
            });
        }
    };
}).directive('loader', function(){
	return{
		restrict:'E',
		templateUrl: Config.templatesPublicURL + 'directives/loader.html',
		replace:true,
		scope:{
			sending : '=',
			action: '=',
			label:'@',
			active:'='	
		},
		link: function(scope, elm, attrs) {
		
			if(!attrs.classes){
				scope.loaderClass = "btn btn-primary";
			}
			else{
				scope.loaderClass = attrs.classes;
			}
		},
		controller: function($scope){
			$scope.getClass = function(){
				return ($scope.sending)? "disabled": "";
			}
		}	
	}	
})

