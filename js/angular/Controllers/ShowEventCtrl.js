'use strict'

var ShowEventCtrlModule = angular.module('ShowEventCtrl',[]);
var ShowEventCtrl = ShowEventCtrlModule.controller('ShowEventCtrl', 
	['$rootScope',
	'$scope', 
	'$stateParams', 
	'EventsService', 
	'$location',
	'UserService',
	'ErrorService',
	'$filter',
	'getEvent',
	'$state',
	'MetaData',
	'getParticipations',
	function(
		$rootScope,
		$scope, 
		$stateParams, 
		EventsService, 
		$location, 
		UserService,
		ErrorService,
		$filter,
		getEvent,
		$state,
		MetaData,
		getParticipations
	){	
	
	$scope.getEventLabel = function(abbreviation){
		if(abbreviation == "withdrawal_error" 
			|| abbreviation == "failed_withdrawal"
			|| abbreviation == "refund_error"
			|| abbreviation == "failed_refund"
			|| abbreviation == "failed_payment"
		){
			//Rouge
			return "error";
		}
		else if(abbreviation == "refused_participation" 
			|| abbreviation == "pending_payment"
			|| abbreviation == "cancelled_event"
			|| abbreviation == "cancelled_participation"
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
		

    $scope.eventInit = function(data){
    	MetaData.setTitle(data.title);
    	
    	if(angular.isUndefined(data.errors)){  		
    		//Date actuelle utilisée pour regarder si on peut aller dans settings
    		$scope.now = new Date().getTime();
    		
			$scope.participantsList = getParticipations;

			//Information de l'événement
    		$scope.eventSettings = data;

    		//Récupération de l'état de l'évnement
    		$scope.eventStatus = $scope.eventSettings.currentStatus.abbreviation;

    		//Organisateur de l'événement
    		$scope.organizer = $scope.eventSettings.organizer;

    		//Participation de l'user (facultatif)
    		var participation = $scope.eventSettings.participation;

    		if(angular.isDefined(participation)){
    			$scope.setCurrentStatus(participation.currentStatus);
    		}
    		else{
    			if(!UserService.isLoggedIn()){
    				$scope.setCurrentStatus("guest");
    			}
    			else if($scope.organizer.id == $scope.user.id){
    				$scope.setCurrentStatus("organizer");
    			}
    			else if(angular.isDefined($scope.user.id)){
    				$scope.setCurrentStatus("member");
    			}
    		}

    		$scope.formatParticipant();
    	}
    	else{
    		ErrorService.showAlert('error', data.errors)
    	}
    }
       
	$scope.isPageActive = function(page){
    	return (page == $state.current.name) ? 'active' : '';
    }

	$scope.init = function(){
		//Récupération de l'utilisateur
		$scope.user = UserService.getUser();
		
		//Récupération de l'événement
		$scope.eventInit(getEvent);

		//Fenetre confirmation suppression événement
		$scope.confirmationDeleteEvent = false;

		//Initialisation des commentaires
		$scope.commentsList = [];
	}
	
	$scope.initCurrentUser = function(){
		switch($scope.role){
			case "guest":
				break;
			case "organizer":
				break;
			case "member":
				break;
			case "accepted_participation":
				break;
			case "refused_participation":
				break;
			case "cancelled_participation":
				break;
			case "pending_participation":
				break;
			case "pending_payment":
				break;
			case "sended_payment":
				break;
		}
	}

	$scope.setCurrentStatus = function(currentStatus){
		if(angular.isDefined(currentStatus.abbreviation)){
			$scope.currentStatus = currentStatus;
			$scope.role = currentStatus.abbreviation;
		}
		else if(currentStatus == "organizer"){
			$scope.role = "organizer";
		}
		else if(currentStatus == "guest"){
			$scope.role = "guest";
		}
		else if(currentStatus == "member"){
			$scope.role = "member";
		}
	}

	//Visibilité des composants
	$scope.see = function(item){
		if(angular.isUndefined($scope.eventSettings)){
			return false;
		}
		switch(item){
			case "administrate-participants-accept":
				return ((angular.isUndefined($scope.eventSettings.places) || $scope.eventSettings.places >= 0) && $scope.role == "organizer") ? true:false;

			case "administrate-participants-refuse":
				return ($scope.eventStatus == "opened_event" && $scope.role == "organizer") ? true:false;

			case "comments":
				return ($scope.role == "organizer" || $scope.role == "accepted_participation") ? true:false;

			case "participate-requested":
				return ((angular.isUndefined($scope.eventSettings.places) || $scope.eventSettings.places >= 0 )&& ($scope.role == "requested_participation")) ? true:false;
			
			case "participate-invited":
				return ((angular.isUndefined($scope.eventSettings.places) || $scope.eventSettings.places >= 0 )&& ($scope.role == "invited_participation")) ? true:false;
			
			case "participate":
				return ((angular.isUndefined($scope.eventSettings.places) || $scope.eventSettings.places >= 0 )&& ($scope.role == "member" || $scope.role == "guest")) ? true:false;

			case "participate-block":
				return ($scope.eventSettings.currentStatus.abbreviation != 'full_event' && $scope.eventSettings.currentStatus.abbreviation != 'completed_event') ? true:false;
			
			case "private_data":
				return ($scope.role == "organizer" || $scope.role == "accepted_participation") ? true:false;

			case "participants-hovercard":
				return true;

			case "participants-number":
				return true;

			case "cancelParticipant":
				return (($scope.eventStatus == "opened_event" || $scope.eventStatus == "closed_event") && ($scope.role == "pending_payment" || $scope.role == "pending_participation" || $scope.role == "accepted_participation")) ? true:false;

			case "cancel":
				return (($scope.eventStatus == "opened_event" || $scope.eventStatus == "closed_event") && $scope.role == "organizer") ? true:false;

			case "pay":
				return ($scope.role == "pending_payment") ? true:false;

			case "sended_payment":
				return ($scope.role == "sended_payment") ? true:false;
			
			case "add-photos":
				return ($scope.role == "accepted_participation" || $scope.role == "organizer")? true:false;
			
			/* ONGLETS */			
			case "event.photos":
				return ($scope.role == "accepted_participation" || $scope.role == "organizer" || $scope.eventSettings.publicPhotos)? true:false;
			
			case "event.participations":
				return ($scope.role == "organizer") ? true:false;

			case "event.settings":
				return ($scope.role == "organizer" && $scope.eventSettings.startTimestamp > $scope.now && $scope.eventStatus != "cancelled_event") ? true:false;			
		}
	}	
	
	$scope.countParticipants = function(){
		var acceptedParticipant = 0;		
		angular.forEach($scope.participantsList, function(value,key){
			if(value.currentStatus.abbreviation == "accepted_participation"){				
				if(angular.isDefined(value.guests) && value.guests > 0){
					acceptedParticipant += value.guests;
				}
				acceptedParticipant += 1;
			}
		});
		
		return acceptedParticipant;
	}
	
	$scope.formatParticipant = function(){
		if(angular.isDefined($scope.eventSettings)){	
			//Ajout de l'organisateur de l'événement
			var result = $scope.countParticipants() + 1;
			
			if(angular.isDefined($scope.eventSettings.maxParticipants)){
				//Ajout de l'organisateur de l'événement
				result += " / " + ($scope.eventSettings.maxParticipants + 1);
			}
			$scope.formatedParticipants = result;
			return result;
		}

	}

    $rootScope.$on('refreshEvent', function(){
    	EventsService.getEvent($stateParams.eventId).then(function(data){
			$scope.eventInit(data);
			$scope.initCurrentUser();
		});
    })
    
    //Annulation d'un événement
	$scope.$on("cancelEvent", function(action, data){
    	if(angular.isUndefined(data.errors)){ 		
    		$scope.eventStatus = data.status.abbreviation;
    		$scope.eventSettings.currentStatus = data.status;
    		ErrorService.showAlert('success', [data.success]);
    	}
    	else{
    		ErrorService.showAlert('error', data.errors)
    	}
    	$scope.cancellingEvent(false);
    	$scope.closeCancelEvent()
	});
	
	$scope.cancellingEvent = function(val){
    	if(val){
    		angular.element(".cancellingEvent").button('loading');
    	}
    	else{
    		angular.element(".cancellingEvent").button("reset");
			angular.element(".cancellingEvent").button("toggle");
			angular.element(".cancellingEvent").removeClass("active");
    	}
    }
    
    /*
     * Commentaires
     */
    //Ajouter un commentaire
    $scope.addComment = function(comment){
    	EventsService.addComment($stateParams.eventId, {content:comment});
    	$scope.newComment = "";
    }
    
    //Annulation d'un événement par l'organisateur
    $scope.confirmedCancelEvent = function(reason, hide){
    	$scope.cancellingEvent(true);
    	EventsService.cancelEvent($stateParams.eventId);

    	//Envoi du commentaire
    	if(angular.isDefined(reason) && reason != ""){
    		$scope.addComment(reason);
    	}

    	$scope.closeCancelEvent = function(){
    		hide();
    	}
    }

	//Rafraichis les droits de l'utilisateurs quand le role change
	$scope.$watch("role", function(value,v){
		$scope.initCurrentUser();
	});

}]).controller('EventsPhotosCtrl', 
	[
	'$scope',
	'UserService',
	'$stateParams',
	'$location',
	'EventsService',
	function(
		$scope,
		UserService,
		$stateParams,
		$location,
		EventsService
	){
		
		$scope.initPhotos = function(){			
			if($scope.see('event.photos')){
				$scope.loading = true;
				EventsService.getPhotos($stateParams.eventId).then(
					function(data){
						$scope.loading = false;
						$scope.photos = data;
					}
				);
				//$scope.photos = Photos;
				$scope.token = UserService.token();
				//Download link
				$scope.downloadLink = Config.apiURL + "events/" + $stateParams.eventId + "/photos/download?token=" +$scope.token;
			}
			else{
				if(UserService.isLoggedIn()){
					$location.path('/404').replace();
				}
				else{
					$location.path('/500').replace();
				}		
			}	
		}
		
		$scope.fullScreen = function(){
			var button = $(this),
	            root = document.documentElement;
	        if (!button.hasClass('active')) {
	            $('#modal-gallery').addClass('modal-fullscreen');
	            if (root.webkitRequestFullScreen) {
	                root.webkitRequestFullScreen(
	                    window.Element.ALLOW_KEYBOARD_INPUT
	                );
	            } else if (root.mozRequestFullScreen) {
	                root.mozRequestFullScreen();
	            }
	            $('#modal-gallery').on('hidden', function () {
					$scope.$apply(function(){
						$scope.fullScreen();
					})
				})
	        } else {
	            $('#modal-gallery').removeClass('modal-fullscreen');
	            (document.webkitCancelFullScreen ||
	                document.mozCancelFullScreen ||
	                $.noop).apply(document);
	        }
		}
	
	}
]).controller('EventsSettingsCtrl', 
	[
	'$scope',
	'$location',
	'EventsService',
	'ErrorService',
	'$anchorScroll',
	'$filter',
	function(
		$scope,
		$location,
		EventsService,
		ErrorService,
		$anchorScroll,
		$filter
	){
		$scope.initSettings = function(){
			if($scope.see('event.settings')){
				$scope.files = [];
	
				$scope.myEventSettingsForm = {
					title: $scope.eventSettings.title,
					description: $scope.eventSettings.description,
					automaticAcceptance: $scope.eventSettings.automaticAcceptance,
					publicPhotos: $scope.eventSettings.publicPhotos,
					smallPhoto:$scope.eventSettings.smallPhoto
				}
			}
			else{
				$location.path('/404').replace();	
			}			
		}
		
		$scope.compareParticipants= function(type){
			$scope.participantsControl(type);
			if(angular.isDefined($scope.myEventSettingsForm.maxParticipants) 
				&& angular.isDefined($scope.myEventSettingsForm.minParticipants) 
				&& ($scope.myEventSettingsForm.maxParticipants < $scope.myEventSettingsForm.minParticipants)){
					$scope.incorrectParticipants = true;
				}
			else{
				$scope.incorrectParticipants = false;
			}

			//Control par rapport au participant déjà accepté
			if($scope.countParticipants() > 0){
				if($scope.myEventSettingsForm.minParticipants < $scope.countParticipants()){
					$scope.incorrectMinParticipants = true;
				}
				else{
					$scope.incorrectMinParticipants = false;
				}
				if($scope.myEventSettingsForm.maxParticipants < $scope.countParticipants()){
					$scope.incorrectMaxParticipants = true;
				}
				else{
					$scope.incorrectMaxParticipants = false;
				}
			}
		}
		
		$scope.incParticipant = function(type){
			if(angular.isUndefined($scope.myEventSettingsForm)){
				$scope.myEventSettingsForm = {};
			}

    		if(angular.isUndefined($scope.myEventSettingsForm[type]) || isNaN($scope.myEventSettingsForm[type]) ){				
				$scope.myEventSettingsForm[type] = 1;
			}
			else if(angular.isDefined($scope.myEventSettingsForm) && angular.isDefined($scope.myEventSettingsForm[type])
        		&& $scope.myEventSettingsForm[type] >= 0

        	){
        		$scope.myEventSettingsForm[type] ++;
        	}

        	$scope.compareParticipants(type)
		}
		
		$scope.decParticipant = function(type){
			
			if(angular.isUndefined($scope.myEventSettingsForm)){
				$scope.myEventSettingsForm = {};
			}

    		if(angular.isDefined($scope.myEventSettingsForm) && angular.isDefined($scope.myEventSettingsForm[type])
    		&& $scope.myEventSettingsForm[type] > 0
    		){       		
        		if($scope.myEventSettingsForm[type] == 1){
        			delete $scope.myEventSettingsForm[type];
        		}
        		else{
        			$scope.myEventSettingsForm[type] --;
        		}     		
        	}
        	else{
        		delete $scope.myEventSettingsForm[type];
        	}      	

        	$scope.compareParticipants(type);
		}
		
		$scope.participantsControl = function(type){
        	if(angular.isDefined($scope.myEventSettingsForm) && angular.isDefined($scope.myEventSettingsForm["minParticipants"])
        		&& angular.isDefined($scope.myEventSettingsForm["maxParticipants"])
        		&& $scope.myEventSettingsForm[type] >= 0
        	){
        		if($scope.myEventSettingsForm[type] == 0){
        			delete $scope.myEventSettingsForm[type];
        		}        		
        		else{
        			$scope.myEventSettingsForm[type] = parseInt($scope.myEventSettingsForm[type]);
        		}        		
        	}
        	else{
        		$scope.myEventSettingsForm[type] = parseInt($scope.myEventSettingsForm[type]);
        		if($scope.myEventSettingsForm[type] == 0){
        			delete $scope.myEventSettingsForm[type];
        		}
        	}
        }
		
		$scope.submit = function(){
			if($scope.eventSettingsForm.$valid && !$scope.incorrectParticipants && !$scope.incorrectMaxParticipants && !$scope.incorrectMinParticipants){
				delete $scope.myEventSettingsForm.smallPhoto;
				$scope.sending = true;
				
				EventsService.updateEvent($scope.myEventSettingsForm,$scope.eventSettings.id);
			}
			else{
        		//Afficher un message de notification & remonter en haut de la page
        		ErrorService.showAlert("error",[{message: $filter('trad')('error_form')}])
      			$anchorScroll();
        	}
		}
		
		//Ajout de l'événement
    	$scope.$on("updateEvent", function(action, data){
	    	if(angular.isUndefined(data.errors)){
				$scope.$parent.eventSettings = data.event;
				$scope.sending = false;  
				ErrorService.showAlert('success', [data.success]);
	    	}
	    	else{	  
	    		$scope.sending = false;  		
	    		ErrorService.showAlert('error', data.errors)
	    	}
	    	
    	});
	}
]).controller('EventsGeneralCtrl', 
	[
	'$scope',
	'ForecastService',
	'$state',
	'UserService',
	'$location',
	'ErrorService',
	'$filter',
	'$timeout',
	'refreshCommentsDelay',
	'$modal',
	'EventsService',
	'$stateParams',
	'nearParticipation',
	function(
		$scope,
		ForecastService,
		$state,
		UserService,
		$location,
		ErrorService,
		$filter,
		$timeout,
		refreshCommentsDelay,
		$modal,
		EventsService,
		$stateParams,
		nearParticipation
	){
		$scope.getSimilarEvents = function(){
			EventsService.getSimilar($scope.eventSettings.id).then(
				function(data){
					$scope.similarEvents = data;
				}
			)
		}
		
		$scope.initGeneral = function(){
			console.log("INIT GENERAL",$state)
			$scope.continueRefresh = true;
    		$scope.getWeather();
    		$scope.getComments(true);
    		$scope.getSimilarEvents(); 
    		
    		if($scope.role == "organizer" || $scope.role =="accepted_participation"){
    			$scope.getComments(true);
    		}
		}

		//Récupérer la liste des commentaires
		$scope.getComments = function(all){
			if($scope.continueRefresh && (angular.isDefined($stateParams.eventId) && $state.current.name == "event.general" && ($scope.role == "organizer" || $scope.role == "accepted_participation"))){
				//Récupération du dernier commentaire s'il y en a un
				if((angular.isUndefined(all) || !all) && $scope.commentsList.length > 0){
					//Récupération du timestamp du dernier commentaire
					$scope.lastRefresh = $scope.commentsList[0]['timestamp'];
					$scope.lastRefresh += 1;
		
					EventsService.getCommentsAfter($stateParams.eventId, $scope.lastRefresh);
				}
				else if((angular.isUndefined(all) || !all)){
					EventsService.getComments($stateParams.eventId);
				}
				else{
					EventsService.getComments($stateParams.eventId);
					//Lancement du resfresh
					$scope.continueRefresh = true;
					$scope.refreshing();
				}
			}
			else{
				console.log("ignore")
			}
		}
		
		//Renvoi le nombre total d'invités
		$scope.getAllGuests = function(){
			var res = 0;
			if(angular.isDefined($scope.participantsList)){
				angular.forEach($scope.participantsList, function(value, key){
					if(value.currentStatus.abbreviation == "accepted_participation" && angular.isDefined(value.guests)){
						res += value.guests;
					}
				})
			}
			return res;
		}
	
		$scope.getWeather = function(){
			var today = new Date().getTime();

			//Si l'événement est dans une date futur
			if($scope.eventSettings.startTimestamp > today){
		    	ForecastService.getWeather(
		    		$scope.eventSettings.address.location.lat ,
		    		$scope.eventSettings.address.location.lng , 
		    		$scope.eventSettings.startTimestamp/1000
		    	).then(
		    		function(data){
		    			if($state.current.name == "event.general" && $('#weatherIcon').length){
			    			console.log("weather",data);
			    			$scope.weatherIcon =data.currently.icon;
			    			if(angular.isDefined($scope.weatherIcon)){
			    				$scope.showWeather = true;
			    				$scope.temperature = Math.round((5/9) * (data.currently.temperature -32)*2)/2;
			    			  	var skycons = new Skycons({"color": "#5CA4A8"});
							  	// ...or by the canvas DOM element itself.
							  	console.log("sky",$scope.weatherIcon,$scope.weatherIcon.toUpperCase().replace("-","_"))
							  	var icon = $scope.weatherIcon.toUpperCase().replace(/\-/gi,"_");
							  	skycons.add(document.getElementById("weatherIcon"), Skycons[icon]);
							  	skycons.play();
							}  
						}	
		    		}
		    	)
		    }
		    	
    	}
    	
    	//Participation à l'évévénement
	    $scope.participate = function(guest,hide){
	    	if($scope.role == "guest"){
	    		//redirection sur la page de login
	    		$location.path("/login").replace();
	    		ErrorService.showAlert("warning", [{error: 1, message:"Vous devez vous inscrire pour participer à un événement"}], 1)
	    	}
	    	else{
	    		
	    		//Ajout du type de participation
	    		if(angular.isDefined($scope.eventSettings.participation)){
	    			var participationType = $scope.eventSettings.participation.currentStatus.abbreviation;
	    			var id = $scope.eventSettings.participation.id;
	    		}
	    		else{
	    			var participationType = null;
	    			var id = $stateParams.eventId;
	    		}
	    		
	    		if(angular.isDefined(guest) && angular.isNumber(guest) && guest > 0){
	    			//Nombre de places restantes > à nb invités + celle de l'utilisateur
	    			if(angular.isUndefined($scope.eventSettings.places) || $scope.eventSettings.places >= (guest + 1)){
	    				EventsService.participate(id,guest,participationType);
	    			}
	    			else{
	    				ErrorService.showAlert("error", [{message:"Nombre invités trop élévés"}])
	    			}
	    		}
	    		else{
	    			EventsService.participate(id,null,participationType);
	    		}
	    		$scope.participating(true);
	    	}
	    	if(angular.isDefined(hide)){
	    		$scope.closeParticipation = function(){
	    			hide();
	    		}
	    	}	
	    	else{
	    		$scope.closeParticipation = function(){
	    			
	    		}
	    	}    	
	    }
	
	    //Annuler un participant
	    $scope.confirmedCancelParticipant = function(reason,hide){
	    	var partId = $scope.eventSettings.participation.id;
	    	EventsService.cancelParticipant($stateParams.eventId,partId);
	    	$scope.cancellingParticipant(true);
	
	    	//Envoi du commentaire
	    	if(angular.isDefined(reason) && reason != ""){
	    		$scope.addComment(reason);
	    	}
	    	$scope.closeCancelParticipant = function(){
	    		hide();
	    	}
	    }
	
	    $scope.pay = function(){
	    	var partId = $scope.eventSettings.participation.id;
	    	EventsService.pay($stateParams.eventId, partId);
	    }
    	
    	$scope.filterParticipantsList = function(participation){
			return (participation.currentStatus.abbreviation == "accepted_participation")?true:false;
		}
	
		$scope.paying = function(val){
	    	if(val){
	    		angular.element(".paying").button('loading');
	    	}
	    	else{
	    		angular.element(".paying").button("reset");
				angular.element(".paying").button("toggle");
				angular.element(".paying").removeClass("active");
	    	}
	    }
	
	    $scope.cancellingParticipant = function(val){
	    	if(val){
	    		angular.element(".cancellingParticipant").button('loading');
	    	}
	    	else{
	    		angular.element(".cancellingParticipant").button("reset");
				angular.element(".cancellingParticipant").button("toggle");
				angular.element(".cancellingParticipant").removeClass("active");
	    	}
	    }

		$scope.participating = function(val){
	    	if(val){
	    		angular.element(".participating").button('loading');
	    	}
	    	else{
	    		angular.element(".participating").button("reset");
				angular.element(".participating").button("toggle");
				angular.element(".participating").removeClass("active");
	    	}
	    }
	
    	//Modal confirmation annulation du participant
		$scope.confirmationCancelParticipant = function(){
			var modalWindow = $modal({
			      template: Config.templatesPublicURL + 'events/modals/cancelParticipation.html',
			      show: true,
			      backdrop: 'static',
			      scope: $scope
			});
		}
	
		//Modal confirmation participation
		$scope.confirmationParticipation = function() {			    		
			if(UserService.isLoggedIn()){
				if(UserService.getUser().confirmed){
					if(angular.isUndefined($scope.sameDaysEvents)){
						$scope.loading = true;
						UserService.getEvents().then(
							function(data){
								$scope.sameDaysEvents = [];
								angular.forEach(data, function(value,key){
									if((value.startTimestamp < $scope.eventSettings.startTimestamp + nearParticipation) && (value.startTimestamp > $scope.eventSettings.startTimestamp - nearParticipation)){
										$scope.sameDaysEvents.push(value);
									}
								})
		
								$scope.loading = false;
							}, function(){
								$scope.loading = false;
							}
						)
					}		
					if($scope.eventSettings.participation && $scope.eventSettings.participation.currentStatus.abbreviation == "invited_participation"){
						$scope.participate(0);
					}	
					else{
						if(angular.isDefined($scope.eventSettings.places) && $scope.eventSettings.places > 0){
							$scope.placesArrayt = [];
			
							for (var i = 0; i < $scope.eventSettings.places; i++) {
								if(i < 5){
									$scope.placesArrayt.push(i);
								}
							}
							$scope.placesArray = $scope.placesArrayt;
							$scope.guests = 0;
						}
						else{
							$scope.placesArray = [0,1,2,3,4];
							$scope.guests = 0;
						}
			
					    var modalWindow = $modal({
						      template: Config.templatesPublicURL + 'events/modals/participate.html',
						      show: true,
						      backdrop: 'static',
						      scope: $scope
						});
					}
				}
				else{
					ErrorService.showAlert("warning",[{message: $filter('trad')('error_member_unconfirmed_participate')}]);
				}
			}
			else{
				$location.path("/login").replace();
				ErrorService.showAlert("warning",[{message: $filter('trad')('error_member_must_login')}])
			}	
	  	}
	
		//Modal annulation événement organisateur
		$scope.confirmationCancelEvent = function() {
		    var modalWindow = $modal({
			      template: Config.templatesPublicURL+ 'events/modals/cancelEvent.html',
			      show: true,
			      backdrop: 'static',
			      scope: $scope
			});
	  	}
	
	  	
	
	  	//Modal confirmation paiement participant
	  	$scope.confirmationPayment = function() {
		    var modalWindow = $modal({
			      template: Config.templatesPublicURL+'events/pay.html',
			      show: true,
			      backdrop: 'static',
			      scope: $scope
			});
	  	}
	
		//Confirmation du paiement d'un participant
		$scope.confirmedPayment = function(hide){
			$scope.paying(true);
			$scope.pay();
			$scope.closeConfirmPayment = function(){
				hide();
			}
		}
		
		$scope.existingComments = function(comment){
			var res = false;
			angular.forEach($scope.commentsList, function(value,key){
				if(value.timestamp == comment.timestamp && value.content == comment.content){
					res = true;
				}
			})
			return res;
		}

		$scope.refreshing = function(){
			//Récupération tous les refreshCommentsDelay ms des commentaires		
			if($scope.continueRefresh && $state.current.name == "event.general" && ($scope.role == "organizer" || $scope.role == "accepted_participation")){
				$timeout(function(){
					if(angular.isDefined($stateParams.eventId)){
						$scope.getComments();
						$scope.refreshing();
					}
				}, refreshCommentsDelay)
			}	
			else{
				//Stoper le refresh
				$scope.continueRefresh = false; 
			}
		}
	
		$scope.getWaitingPrice = function(){
			var total = 0;
			//Evenement payant
			if(angular.isDefined($scope.eventSettings.price) && $scope.eventSettings.price > 0){
				angular.forEach($scope.participantsList, function(value,key){
					if(value.currentStatus.label == "pending_payment" || value.currentStatus.label == "sended_payment"){
						total+= $scope.eventSettings.price;
					}
				})
				$scope.showRecoltedPrice = true;
			}
			//Evenement gratuit
			else{
				$scope.showRecoltedPrice = false;
			}	
			return total;
		}
		
		$scope.getRecoltedPrice = function(){
			var total = 0;
			//Evenement payant
			if(angular.isDefined($scope.eventSettings.price) && $scope.eventSettings.price > 0){
				angular.forEach($scope.participantsList, function(value,key){
					if(value.currentStatus.label == "accepted_participation"){
						total+= $scope.eventSettings.price;
					}
				})
				$scope.showRecoltedPrice = true;
			}
			//Evenement gratuit
			else{
				$scope.showRecoltedPrice = false;
			}	
			return total;
		}
		
	    $scope.$on("pay", function(action, data){
	    	if(angular.isUndefined(data.errors) && angular.isDefined(data.PaymentURL)){
	    		//Redirection sur "PaymentURL" && Sortie du site
	    		window.location = data.PaymentURL;
	    	}
	    	else{
	    		ErrorService.showAlert('error', data.errors)
	    	}
	    	$scope.paying(false);
	    })
		
		$scope.$on("$destroy", function(){
        	$scope.continueRefresh = false;  
    	});
    	
	    //Réception de la liste des commentaires
		$scope.$on("getComments", function(action, data){
	    	if(angular.isUndefined(data.errors)){
	    		angular.forEach(data,function(value, key){
	    			if(!$scope.existingComments(value)){
	    				$scope.commentsList.push(value)
	    			}   				
	    		})
	    	}
	    	else{
	    		ErrorService.showAlert('error', data.errors)
	    	}
		});
		
		//Réception de la liste des commentaires
		$scope.$on("getCommentsAfter", function(action, data){
	    	if(angular.isUndefined(data.errors)){
	    		angular.forEach(data,function(value, key){
	    			if(!$scope.existingComments(value)){
	    				$scope.commentsList.splice(0,0,value)
	    			}   				
	    		})
	    	}
	    	else{
	    		ErrorService.showAlert('error', data.errors)
	    	}
		});
	
		//Réception réponse ajout commentaire
		$scope.$on("addComment", function(action, data){
	    	if(angular.isUndefined(data.errors)){
	    		$scope.getComments();
	    		ErrorService.showAlert("success",[data.success])
	    	}
	    	else{
	    		ErrorService.showAlert('error', data.errors)
	    	}
		});
	
		//Participer à un événement
		$scope.$on("participate", function(action, data){
	    	if(angular.isUndefined(data.errors)){
	    		//Stockage de la participation
	    		$scope.eventSettings.participation = data.participation;
	    		//Changer le statut après avoir clické sur participer
	    		$scope.setCurrentStatus($scope.eventSettings.participation.currentStatus);
			
				//Si participation auto
				if(data.participation){
					if($scope.participantsList)	$scope.participantsList.push(data.participation);
					else $scope.participantsList[data.participation];	
					//refresh comments
					$scope.getComments(true);
				}
			
	    		//Message confirmation participation
	    		ErrorService.showAlert('success', [data.success])
	    	}
	    	else{
	    		ErrorService.showAlert('error', data.errors)
	    	}
	    	$scope.participating(false);
	    	$scope.closeParticipation();
		});
	
		//Annuler un participant
		$scope.$on("cancelParticipant", function(action, data){
	    	if(angular.isUndefined(data.errors)){
	    		//Récupération de la participation
	    		$scope.eventSettings.participation = data.participation;
	    		//Changer le statut après avoir clické sur annuler
	    		$scope.setCurrentStatus($scope.eventSettings.participation.currentStatus);
	    		ErrorService.showAlert('success', [data.success]);
	    	}
	    	else{
	    		ErrorService.showAlert('error', data.errors)
	    	}
	    	$scope.cancellingParticipant(false);
	    	$scope.closeCancelParticipant();
		});
	
		
	}
]).controller('EventsParticipationsCtrl', 
	[
	'$scope',
	'ErrorService',
	'$location',
	'$filter',
	'EventsService',
	'$stateParams',
	function($scope,ErrorService,$location,$filter,EventsService,$stateParams)
	{
		$scope.initParticipations = function(){
			if(!$scope.see('event.participations')){
				//Redirection page 404
				$location.path('/404').replace();
			}
		}
				
		$scope.getGuests = function(guests){
			var res = "";
			if(angular.isDefined(guests) && guests > 0){
				if(guests > 1) res = "+ " + guests + " " + $filter('trad')('label_guests');
				else res = "+ " + guests + " " + $filter('trad')('label_guest');
			}
			return  res;
		}
		
		$scope.acceptParticipant = function(participation){
	    	var partId = participation.id;
	    	EventsService.acceptParticipant($stateParams.eventId,partId);
	    }
	
	    $scope.refuseParticipant = function(participation){
	    	var partId = participation.id;
	    	EventsService.refuseParticipant($stateParams.eventId,partId);
	    }
	
	    $scope.replaceParticipants = function(p){
	    	angular.forEach($scope.participantsList, function(value,key){
	    		if(value.id == p.id){
	    			$scope.participantsList[key] = p;
	    		}
	    	})
	    }		
		
		//Accepter un participant
		$scope.$on("acceptParticipant", function(action, data){
	    	if(angular.isUndefined(data.errors)){
	    		$scope.replaceParticipants(data.participation);
	    		//MAJ nombre participant dans l'événement
	    		if(data.participation.currentStatus.abbreviation == "accepted_participation"){
	    			$scope.eventSettings.nbParticipants += 1;
	    		}
	    		ErrorService.showAlert('success', [data.success]);
	    	}
	    	else{
	    		ErrorService.showAlert('error', data.errors)
	    	}
		});
	
		//Refuser un participant
		$scope.$on("refuseParticipant", function(action, data){
	    	if(angular.isUndefined(data.errors)){
	    		$scope.replaceParticipants(data.participation);
	    		ErrorService.showAlert('success', [data.success]);
	    	}
	    	else{
	    		ErrorService.showAlert('error', data.errors)
	    	}
		});	
	}
]);

ShowEventCtrl.resolve = {
	getEvent: function($q,EventsService,$stateParams,$rootScope){
		$rootScope.loading = true;
		var defered = $q.defer();
		EventsService.getEvent($stateParams.eventId).then(
			function(data){
				$rootScope.loading = false;
				defered.resolve(data);
			},
			function(data){
				if(data.status == 400){
					$rootScope.$broadcast("e404");
				}				
			}
		);
		return  defered.promise;
	},
	getParticipations: function($q,EventsService,$stateParams){
		var defered = $q.defer();
		EventsService.getParticipants($stateParams.eventId).then(
			function(data){
				defered.resolve(data);
			},
			function(data){
				defered.reject(data);
			}
		);
		return  defered.promise;
	},		
};
