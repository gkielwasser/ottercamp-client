'use strict'

var AddEventCtrlModule = angular.module('AddEvent',[]).filter('fullPrice', ['eventPriceLimit',function(eventPriceLimit){
	return function(HTPrice){
		HTPrice = Number(HTPrice);
		if(!angular.isNumber(HTPrice) || !HTPrice || HTPrice == 0){ return '';}
		if(HTPrice <= eventPriceLimit){
	    	var percent = 0.10;
	    	var level = 5;
	    	var inc = Math.ceil(HTPrice);

			while (inc % level != 0) {
				inc++;
			}
			return (inc * percent) + HTPrice;
		}
		else{
			return 0;
		}
	}
}])

.directive('iban', function(){
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {

       modelCtrl.$parsers.push(function (inputValue) {
			console.log("inputvalue",inputValue)
         //var transformedInput = inputValue.replace(/(.{5})/g,"$1$")
			var transformedInput = inputValue.toLowerCase();
			if(transformedInput && (transformedInput.length %3) == 0){
				
				transformedInput +="a";
				return transformedInput; 
			}
    	});
		
		modelCtrl.$formatters.push(function(data) {
			console.log("data",data)
	      //convert data from model format to view format
	      return data; //converted
	    }  )	
                 
       
     }
   };
})

.directive('priceControl', ['eventPriceLimit',function(eventPriceLimit) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elm, attr, ngModelCtrl) {
			modelCtrl.$parsers.push(function (inputValue) {
			 if(inputValue <= 0 || inputValue > eventPriceLimit){
			 	var transformedInput = "";
			 }
			 else	{}
	         var transformedInput = inputValue.toLowerCase().replace(/ /g, '');

	         if (transformedInput !=inputValue) {
	           modelCtrl.$setViewValue(transformedInput);
	           modelCtrl.$render();
	         }

	         return transformedInput;
	       });

        }
    };
}]);

var AddEventCtrl = AddEventCtrlModule.controller('AddEventCtrl', 
	['$scope',
	'EventsService',
	'UserService',
	'$location',
	'GooglemapService',
	'ErrorService', 
	'$filter', 
	'$modal',
	'$rootScope',
	'$anchorScroll',
	'eventTagsLimit',
	'eventPriceLimit',
	'$http',
	'Organizations',
	function(
		$scope, 
		EventsService, 
		UserService,
		$location,
		GooglemapService,
		ErrorService,
		$filter,
		$modal,
		$rootScope,
		$anchorScroll,
		eventTagsLimit,
		eventPriceLimit,
		$http,
		Organizations
	){
		$scope.organizationsQuery = {
		    query: function (query) {
		      var data = {results: []};
		      angular.forEach(Organizations, function(item, key){
		      	item.text = item.name;
		        if (query.term.toUpperCase() === item.text.substring(0, query.term.length).toUpperCase()) {
		          data.results.push(item);
		        }
		      });
		      query.callback(data);
		    }
		  };
		  
		  $scope.communitiesQuery = {
		    query: function (query) {
		      var data = {results: []};
		      angular.forEach($scope.communities, function(item, key){
		      	item.text = item.name;
		        if (query.term.toUpperCase() === item.text.substring(0, query.term.length).toUpperCase()) {
		          data.results.push(item);
		        }
		      });
		      query.callback(data);
		    }
		  };
		
		$scope.$watch("test", function(value){
			console.log("value",value)
			if(value){
				$scope.test = value.replace(/.{1,10} /g, "$a");
			}
		})
        $scope.initAddEventCtrl = function(){
            console.log("init AddEventCtrl");
            
			//Par défaut formulaire tranche d'age
			$scope.setMissingInfos = false;

        	$scope.checkMissingInfos();

			$scope.tags = [];
			
			//récupération des communautés de l'user
			$scope.communities = UserService.getUser().communities;
			
			$scope.user = UserService.getUser();

			//organizations
			$scope.organizations = Organizations;

			//récupération des catégories
			EventsService.categories().then(
				function(data){
					$scope.categoryList = data;
				}
			);

			$scope.incorrectParticipants = false;
			$scope.incorrectTime = false;

			$scope.sentForm = false;
			$scope.missingInfosSent = false;
			$scope.bicInfosSent = false;
			$scope.search = "";
			$scope.formatedAddress = {};
			
			$scope.files = [];

			$scope.photo = false;
        }
        $scope.incParticipant = function(type){
        	console.log("type",type,$scope.myAddEventForm);
			if(angular.isUndefined($scope.myAddEventForm)){
				$scope.myAddEventForm = {};
			}
			if(angular.isUndefined($scope.myAddEventForm[type]) || isNaN($scope.myAddEventForm[type]) ){				
				$scope.myAddEventForm[type] = 1;
			}
			else if(angular.isDefined($scope.myAddEventForm) && angular.isDefined($scope.myAddEventForm[type])
        		&& $scope.myAddEventForm[type] >= 0

        	){
        		$scope.myAddEventForm[type] ++;
        	}
        	$scope.compareParticipants(type)
		}
		
		$scope.decParticipant = function(type){
			if(angular.isUndefined($scope.myAddEventForm)){
				$scope.myAddEventForm = {};
			}
			if(angular.isUndefined($scope.myAddEventForm[type])){				
				//$scope.myAddEventForm[type] = 0;
			}
			else if(angular.isDefined($scope.myAddEventForm) && angular.isDefined($scope.myAddEventForm[type])
        		&& $scope.myAddEventForm[type] > 0
        	){
        		if($scope.myAddEventForm[type] == 1){
        			delete $scope.myAddEventForm[type];
        		}
        		else{
        			$scope.myAddEventForm[type] --;
        		}     		
        	}
        	else{
        		delete $scope.myAddEventForm[type];
        	}
        	$scope.compareParticipants(type);
		}
        
		$scope.incPrice = function(){
			if(angular.isUndefined($scope.myAddEventForm)){
				$scope.myAddEventForm = {};
			}
			if(angular.isUndefined($scope.myAddEventForm.price)){	
				$scope.myAddEventForm.price = 1;			
				//$scope.myAddEventForm.price = $filter("number")(1,2);
			}
			else if(angular.isDefined($scope.myAddEventForm) && angular.isDefined($scope.myAddEventForm.price)
        		&& $scope.myAddEventForm.price >= 0
        		&& $scope.myAddEventForm.price < eventPriceLimit
        	){
        		$scope.myAddEventForm.price ++;
        		//$scope.myAddEventForm.price = $filter("number")($scope.myAddEventForm.price,2);
        	}
        	else{
        		console.log("price",$scope.myAddEventForm.price)
        		$scope.incorrectPrice = true;
        	}
		}

		$scope.decPrice = function(){
			$scope.incorrectPrice = false;
			if(angular.isUndefined($scope.myAddEventForm)){
				$scope.myAddEventForm = {};
			}
			if(angular.isUndefined($scope.myAddEventForm.price)){
				//$scope.myAddEventForm.price = 0;
			}
			if(angular.isDefined($scope.myAddEventForm) && angular.isDefined($scope.myAddEventForm.price)
        		&& $scope.myAddEventForm.price > 0
        		&& $scope.myAddEventForm.price <= eventPriceLimit
        	){
        		if($scope.myAddEventForm.price == 1){
        			delete $scope.myAddEventForm.price;
        		}
        		else{
        			$scope.myAddEventForm.price --;	
        		}      		
        	}
		}
        $scope.priceControl = function(){
        	if(angular.isDefined($scope.myAddEventForm) && angular.isDefined($scope.myAddEventForm.price)
        		&& $scope.myAddEventForm.price >= 0
        		&& $scope.myAddEventForm.price <= eventPriceLimit
        	){
        		if($scope.myAddEventForm.price == 0){
        			delete $scope.myAddEventForm.price;
        		}
        		else{
        			$scope.myAddEventForm.price = Number($scope.myAddEventForm.price);
        		}	
        	}
        	else{
        		$scope.myAddEventForm.price = Number($scope.myAddEventForm.price.slice(0, -1));
        		if($scope.myAddEventForm[type] == 0){
        			delete $scope.myAddEventForm[type];
        		}       		
        	}
        }
        
        $scope.participantsControl = function(type){
        	if(angular.isDefined($scope.myAddEventForm) && angular.isDefined($scope.myAddEventForm["minParticipants"])
        		&& angular.isDefined($scope.myAddEventForm["maxParticipants"])
        		&& $scope.myAddEventForm[type] >= 0
        	){
        		if($scope.myAddEventForm[type] == 0){
        			delete $scope.myAddEventForm[type];
        		}
        		else{
        			$scope.myAddEventForm[type] = parseInt($scope.myAddEventForm[type]);
        		}        		
        	}
        	else{
        		$scope.myAddEventForm[type] = parseInt($scope.myAddEventForm[type]);
        		if($scope.myAddEventForm[type] == 0){
        			delete $scope.myAddEventForm[type];
        		}
        	}
        }
        
        $scope.showMyAddress = function(){
        	if(angular.isDefined(UserService.getUser()) && UserService.getUser() && angular.isDefined(UserService.getUser().address)){
        		return true
        	}
        	else{
        		return false;
        	}
        }

        $scope.myAddress = function(){
        	delete $scope.missingAddress;
        	delete $scope.missingFields;
        	 
        	$scope.search = UserService.getUser().address.label;
        	$scope.formatedAddress = {}
			  			
			var address = UserService.getUser().address;

			if(angular.isDefined(address.number)){}
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
        }

        //Modal infos complémentaires requises
		$scope.missingInfosModal = function() {
			$scope.currentModal = "missingInfos";
		    var modalWindow = $modal({
			      template: Config.templatesPublicURL+'events/modals/missingInfos.html',
			      show: true,
			      backdrop: 'static',
			      scope: $scope
			});
	  	}

        //Modal bicinfos complémentaires requises
		$scope.bicInfosModal = function() {
			$scope.currentModal = "bicInfos";
			$scope.csValidate = $rootScope.csValidate;
			
			//Affiche les informations relatives à une organisation
			if(angular.isDefined($scope.myAddEventForm.organization)){
				$scope.isOrganization = true;
			}
			
			
		    var modalWindow = $modal({
			      template: Config.templatesPublicURL+'events/modals/rib.html',
			      show: true,
			      backdrop: 'static',
			      scope: $scope,
				  persist:true
			});
	  	}

        $scope.addingMissingInfos = function(val){
        	if(val){
        		angular.element(".addingMissingInfos").button('loading');
        	}
        	else{
        		angular.element(".addingMissingInfos").button("reset");
   				angular.element(".addingMissingInfos").button("toggle");
   				angular.element(".addingMissingInfos").removeClass("active");
        	}
        }

        $scope.addingBicInfos = function(val){
        	if(val){
        		angular.element(".addingBicInfos").button('loading');
        	}
        	else{
        		angular.element(".addingBicInfos").button("reset");
   				angular.element(".addingBicInfos").button("toggle");
   				angular.element(".addingBicInfos").removeClass("active");
        	}
        }

        $scope.closeBicInfos = function(hide){
        	console.log("closebicinfos",$scope.tempSearch,$scope.tempCurrentPlace,$scope.tempFormatedAddress)

    		$scope.bicInfosSent = false;
    		$scope.search = $scope.tempSearch;
    		$scope.currentPlace = $scope.tempCurrentPlace;
    		$scope.formatedAddress = $scope.tempFormatedAddress;
        	
        	if(!$scope.$$phase) {
    			$scope.$apply();
			}
        	
        	if(angular.isDefined(hide))
        		hide();
        }
 
         //listen for the file selected event
	    $scope.$on("fileSelected", function (event, args) {
	    	//Ne pas afficher la photo de la category sélectionnée
	    	$scope.photo = true;

	        $scope.$apply(function () {            
	            //add the file object to the scope's files collection
	            //$scope.files.push(args.file);
	            $scope.files[0] = args.file;
	        });
	    });
	    
	    $scope.getCategoryUrlByAbbr = function(abbr){
	    	var url = "";
	    	if(!$scope.photo){
		    	if(angular.isDefined($scope.categoryList) && abbr){
			    	angular.forEach($scope.categoryList,function(value,key){
			    		if(value.abbreviation == abbr){
			    			url = value.picture;
			    		}
			    	})
		    	}
		    }	
	    	return url;
	    }

        $scope.submit = function(){

            $scope.formSent = true;
            if(!$scope.$$phase){
                $scope.$apply()
            }       

        	if($scope.addEventForm.$valid && $scope.checkForm()){
				//Suppression des éventuelles notifications
				ErrorService.hideAlert();
				
				/*Orgazniations*/
	            if(angular.isDefined($scope.myAddEventForm.organization)){
	            	$scope.organization = $scope.myAddEventForm.organization;
	            	$scope.myAddEventForm.organization = $scope.myAddEventForm.organization.id;
	            }
	            
	            /*Communautés*/
	            if(angular.isDefined($scope.myAddEventForm.community)){
	            	$scope.myAddEventForm.community = $scope.myAddEventForm.community.id;
	            }
				
	        	if(angular.isDefined($scope.addEventForm.startTimestamp)){
	        		$scope.myAddEventForm.startTimestamp = $scope.addEventForm.startTimestamp.$modelValue;
	        	}

	        	if(angular.isDefined($scope.addEventForm.endTimestamp.$modelValue)){
	        		$scope.myAddEventForm.endTimestamp = $scope.addEventForm.endTimestamp.$modelValue;
	        	}

	        	//Création des Tags s'il y en a
	        	if($scope.tags && $scope.tags.length > 0){
	        		$scope.createTags();
	        	}
	        	//Si l'addresse à été renseignée
				if(angular.isDefined($scope.search)){
					if(angular.isDefined($scope.formatedAddress)){
						//Ajout de l'addresse dans le formulaire
						$scope.setFormatedAddress($scope.myAddEventForm);
						
						//BicInfos
						if(angular.isDefined($scope.myAddEventForm.price) && ($scope.myAddEventForm.price > 0)){
							if(angular.isDefined($scope.myAddEventForm.organization)){
								$scope.checkBicInfos(true)
							}
							else{
								$scope.checkBicInfos()
							}
							
						}
						else{
							$scope.sending = true;
							if(angular.isDefined($scope.files) && $scope.files.length > 0){
								EventsService.addEvent({files:$scope.files, model:$scope.myAddEventForm});
							}
							else{
								EventsService.addEvent($scope.myAddEventForm);
							}
						}
					}
					else{
						console.log("missing adress 2")
						$scope.missingAddress = true;
					}
				}
        	}
        	//Erreur dans le formulaire
        	else{
        		//Afficher un message de notification & remonter en haut de la page
        		ErrorService.showAlert("error",[{message: $filter('trad')('error_form')}])
      			$anchorScroll();
        	}
        }
        
        $scope.setFormatedAddress = function(form){
        	if(angular.isDefined($scope.formatedAddress)){
        		angular.forEach($scope.formatedAddress, function(value,key){
        			form[key] = value;
        		})
        	}
        }

        $scope.submitBicInfos = function(hide, form, bicInfos, formatedAddress, search){
        	$scope.search = search;
        	$scope.formatedAddress = formatedAddress;
        	console.log("formated Address",$scope.formatedAddress,$scope.search)

        	
        	$scope.bicInfosSent = true;

        	//delete bicInfos.address;

        	if(form.$valid && angular.isDefined($scope.formatedAddress) && $scope.formatedAddress.lat){
				//Utilisation de l'adresse de l'utilisateur
				if(angular.isDefined(bicInfos.address)){
					if(angular.isDefined(bicInfos.address.number)){
						bicInfos.number = bicInfos.address.number
					}
					bicInfos.city = bicInfos.address.city;
					bicInfos.street = bicInfos.address.street;
					bicInfos.country = bicInfos.address.country;
					bicInfos.zipCode = bicInfos.address.zipCode;
					bicInfos.lat = bicInfos.address.location.lat;
					bicInfos.lng = bicInfos.address.location.lng;
					
					//Sauvegarde en cas d'erreur
					$scope.tempAddress = bicInfos.address;					
					delete bicInfos.address;
					$scope.addingBicInfos(true);
					EventsService.setBicInfos(bicInfos);
					bicInfos.address = $scope.tempAddress;
				}
				else{
					if(angular.isDefined($scope.formatedAddress)){
						$scope.addingBicInfos(true);
						$scope.setFormatedAddress(bicInfos);
						EventsService.setBicInfos(bicInfos);
					}	
				}
			}
			else{
				ErrorService.showAlert("error",[{message: $filter('trad')('error_form')}]);
			}

			$scope.closeBicInfosModal = function(){
        		hide();
        	}
        }

        $scope.checkBicInfos = function(isOrganization){
        	//RAZ geolocpicker
        	//Désactive les erreurs sur le formulaire addEvent
        	$scope.formSent = false;
        	$scope.tempSearch = $scope.search;
        	$scope.tempCurrentPlace = $scope.currentPlace;
        	$scope.tempFormatedAddress = $scope.formatedAddress;
        	$scope.search = "";
        	delete $scope.currentPlace;
        	$scope.formatedAddress = {};
			
			
			//Cas organization
			if(isOrganization){
				//Déjà un RIB
				if(isOrganization && angular.isDefined($scope.organization.beneficiaryId) && $scope.organization.beneficiaryId > 0){
					$scope.setBicInfos = false;
		        	$scope.sending = true;
		        	EventsService.addEvent($scope.myAddEventForm);
				}
				//Pas de rib
				else{
		        	$scope.myBicInfosForm = {};
		        	//Nom Orga
		        	if(angular.isDefined($scope.organization.name)){
		        		$scope.myBicInfosForm.name = $scope.organization.name;
		        	}

		        	//Adresse Orga
		        	if(angular.isDefined($scope.organization.address) && angular.isDefined($scope.organization.address.label)){
		        		$scope.formatedAddress = $scope.organization.address;
		        		$scope.search = $scope.organization.address.label;
		        	}		
	
					//Affichage formulaire bicInfos
					$scope.bicInfosModal();
				}
			}
			//Cas user
			else{
				//Déjà un RIB
				if(angular.isDefined(UserService.getUser().beneficiaryId) && UserService.getUser().beneficiaryId > 0){
	        		$scope.setBicInfos = false;
	        		$scope.sending = true;
	        		EventsService.addEvent($scope.myAddEventForm);
	        	}
	        	//Pas de RIB
	        	else{
		        	$scope.myBicInfosForm = {};
		        	//Nom
		        	if(angular.isDefined(UserService.getUser().lastName)){
		        		$scope.myBicInfosForm.lastName = UserService.getUser().lastName;
		        	}
		        	//Prénom
		        	if(angular.isDefined(UserService.getUser().name)){
		        		$scope.myBicInfosForm.name = UserService.getUser().name;
		        	}
		        	//Adresse
		        	if(angular.isDefined(UserService.getUser().address) && angular.isDefined(UserService.getUser().address.label)){
		        		$scope.formatedAddress = UserService.getUser().address;
		        		$scope.search = UserService.getUser().address.label;
		        	}		
	
					//Affichage formulaire bicInfos
					$scope.bicInfosModal();
		        }
			}
			
        	
        }

        $scope.submitMissingInfos = function(missingInfos,hide){
        	$scope.missingInfosSent = true;

        	var toSend = {};

        	if(angular.isDefined(missingInfos)){
        		//AgeBracket
        		if(angular.isDefined(missingInfos.ageBracket)){
        			toSend.ageBracket = missingInfos.ageBracket;
        		}

        		$scope.addingMissingInfos(true);
        		EventsService.setMissingInfos(toSend);
        	}

        	$scope.closeMissingInfos = function(valid){
        		if(valid)
        			$scope.currentModal = 'missingInfosValid';
        		hide();
        	}
        }

        $scope.checkForm = function(){
        	var result = false;

        	//Vérification des participants
        	if($scope.incorrectParticipants || $scope.incorrectDates || $scope.incorrectPrice || angular.isUndefined($scope.formatedAddress.lat)) result = false;
        	else result = true;

        	return result;
        }

        $scope.enableSubmitMissingInfos = function(){
            return angular.isDefined($scope.myMissingInfosForm) && (($scope.setAgeBracket && angular.isUndefined($scope.myMissingInfosForm.ageBracket))) ? true : false;
        }

        $scope.checkMissingInfos = function(){
        	var user = UserService.getUser();
        	var check = false;

        	//AgeBracket
        	if(angular.isDefined(user.ageBracket) && user.ageBracket != null){
        		$scope.setAgeBracket = false;
        		check = false;
        	}
        	else{
        		$scope.setAgeBracket = true;
        		$scope.myMissingInfosForm = {};
        		$scope.myMissingInfosForm.ageBracket = user.ageBracket;
        		check = true;
        	}

        	//Vérification tranche d'âge
        	if(check){
        		UserService.ageBrackets().then(
        			function(data){
        				$scope.ageBracketList = data;
        				$scope.missingInfosModal()
        			},
        			function(){
        				ErrorService.showAlert("error","impossible de récupérer les tranches d'âges")
        			}
        		)
        	}
        }

        $scope.checkTime = function(){
        	if(angular.isDefined($scope.timepickerStart) && angular.isDefined($scope.timepickerEnd)){
	        	if(angular.isDefined($scope.timepickerStart.time) && angular.isDefined($scope.timepickerEnd.time)){
	        		if($scope.timepickerEnd.time != ""){
		        		if($scope.timepickerStart.time > $scope.timepickerEnd.time){
		        			$scope.incorrectTime = true;
		        		}
		        		else{
		        			$scope.incorrectTime = false;
		        		}
		        	}
		        	else{
		        		$scope.incorrectTime = false;
		        	}
		        }
		        else{
		        	$scope.incorrectTime = false;
		        }
        	}
        	else{
        		$scope.incorrectTime = false;
        	}
        }

        //Parse le Timepicker et retourne un json {hour,minute} à partir d'une heure
        $scope.parseTime = function(time){
        	return {hours: parseInt(time.substr(0,2)), minutes: parseInt(time.substr(3,2))}
        }
        
        
        
        
        /**** FONCTIONS  TAGS ****/
		
		//Format la liste de tags
        $scope.createTags = function(){
        	//Parsage des tags
			if($scope.tags.length > 0){
				var tags = "";
				angular.forEach($scope.tags, function(value,key){
					tags += value + ",";
				});
				tags = tags.slice(0,-1);
				$scope.myAddEventForm.tags = tags;
			}
        }

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
        	if($scope.tags.length < eventTagsLimit){
	            if($scope.newTag && !$scope.existTag()){
	                $scope.tags.push($scope.newTag)
	            }
	        }
            else{
            	$scope.incorrectTags = true;         	
            }
            $scope.newTag = "";
        }
		
		//Suppression tag liste des tags
        $scope.deleteTag = function(name){
        	$scope.incorrectTags = false;  
        	//masquer erreurs
        	if($scope.tags.length == eventTagsLimit){
        		ErrorService.hideAlert();
        	}
        	angular.forEach($scope.tags, function(value, key){
				if(name == value){
					$scope.tags.splice(key, 1);
				}
			});
        }
        /****FIN*****/
        

		//Liste des événements
        $scope.getEvents = function(){
        	EventsService.getEvents();
        }
	    
	    $scope.compareParticipants= function(type){
			$scope.participantsControl(type);
			if(angular.isDefined($scope.myAddEventForm.maxParticipants) 
				&& angular.isDefined($scope.myAddEventForm.minParticipants) 
				&& ($scope.myAddEventForm.maxParticipants < $scope.myAddEventForm.minParticipants)){
					$scope.incorrectParticipants = true;
				}
			else{
				$scope.incorrectParticipants = false;
			}
		}
		
		$scope.compareDates = function(){
			if(angular.isDefined($scope.startTimestamp) 
				&& angular.isDefined($scope.endTimestamp) 
				&& ($scope.startTimestamp > $scope.endTimestamp)){
					$scope.incorrectDates = true;
				}
			else{
				$scope.incorrectDates = false;
			}
		}

        $scope.initAddEventCtrl();
        
        
        
        
        
        /***** EVENEMENTS *******/
        
        $scope.$on("modal-hide", function(){
        	if($scope.currentModal == "missingInfos"){      		
        		if(!$scope.$$phase) {
        			$scope.$apply(function(){
        				$location.path("/").replace();
        			})	
				}
				else{
					$location.path("/").replace();
				}
        	}
        	else if($scope.currentModal == "bicInfos"){
        		$scope.closeBicInfos();
        	}
        	$scope.currentModal = "";
        })

        //Ajout de l'événement
    	$scope.$on("addEvent", function(action, data){
	    	if(angular.isUndefined(data.errors)){
	    		//Upload de la photo... s'il y en a une
	    		$scope.$broadcast("sendEventPhoto");
	    		
	    		//Redirection sur la page de l'événement
				$location.path("/events/" + data.event.id + "/" + $rootScope.cleanUrl(data.event.title)).replace();
				ErrorService.showAlert('success', [data.success]);
	    	}
	    	else{	  
	    		$scope.sending = false;  		
	    		ErrorService.showAlert('error', data.errors)
	    	}
	    	
    	});

		//Tranche d'âge
    	$scope.$on("setMissingInfos", function(action, data){
	    	if(angular.isUndefined(data.errors)){
	    		ErrorService.showAlert('success', [data.success])
	    		UserService.loadUser(data.member, true);
	    		$scope.closeMissingInfos(true);
	    		$scope.checkMissingInfos();
	    	}
	    	else{
	    		$scope.addingMissingInfos(false);
				ErrorService.showAlert('error', data.errors)
	    	}
   		});
		
		//Infos Bic IBAN
   		$scope.$on("setBicInfos", function(action, data){
	    	if(angular.isUndefined(data.errors)){
	    		UserService.setBeneficiary();
	    		$scope.closeBicInfosModal();
	    		$scope.checkBicInfos();
	    	}
	    	else{
	    		$scope.addingBicInfos(false);
				ErrorService.showAlert('error', data.errors)
	    	}
   		});
    }
])

.directive('onKeydownpressFn', function() {
    return function(scope, elm, attrs) {
    	
        elm.bind('keydown keypress', function(evt) {
            if(evt.which === 32 || evt.which === 188 || evt.which === 13){           	
                scope.$apply(function() {
                	//Si le dropdown n'est pas visible
                	if($('.typeahead.dropdown-menu:visible').length == 0)
                    	scope.$eval(attrs.onKeydownpressFn).call(scope, evt.which, scope.newTag);
                });
                evt.preventDefault();
            }
        });
    };
})

AddEventCtrl.resolve = {
	confirm: function(UserService,$location,ErrorService,$filter,$q){
		console.log("RESOLVING ADDEVENT")
		var defered = $q.defer();

		//Compte non confirmé
		if(UserService.getUser() && !UserService.getUser().confirmed){
			ErrorService.showAlert("warning",[{message: $filter('trad')('error_member_unconfirmed_add_event')}]);
			$location.path('/').replace();
			defered.reject();
		}
		else{
			defered.resolve();
		}
		return defered.promise;
	},
	
	Organizations: function(UserService){
		return UserService.getOrganizations();
	}	
}