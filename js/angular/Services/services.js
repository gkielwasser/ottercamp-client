'use strict'

var ottercampservices = angular.module('ottercamp.services',[])

/**
 * Errors 
 */
var errorservice = ottercampservices.service('ErrorService', ["$rootScope",'$injector','$compile','$location', function($rootScope, $injector,$compile,$location){

	var hideAlert = function(){
		$.pnotify_remove_all();
	}

	var pnotify = function(type,errors){
		/*
		 * Défaut Config
		 */
		var icon = true;
		var hide = true;
		var sticker = false;
		var shadow = false;
		var nclass = "ottNotification";
		
		angular.forEach(errors, function(value, key){
			//Limite d'affichage des notifications
			if($('.ui-pnotify-container').length < 6){
				if(type == "confirmation"){
					//Confirmation d'inscription
					hide = false;
					nclass = "confirmation-notification";
					var text = '<p>'+value.message + '</p><br/><button ng-click="$root.sendMessage()" class="btn btn-info btn-block">{{"label_send_confirmation_email"|trad}}</button>'
					//Fonction permettant de renvoyer l'email de confirmation
		    		$rootScope.sendMessage = function(){
		    			console.log("Sending confirmation")
		    			var ConfirmService = $injector.get('ConfirmService');
		    			ConfirmService.sendConfirmation();	
		    			$('.confirmation-notification').remove();
		    		}
				}
				//Message
				else if(type == "message"){
					icon = false;
					type = "info";
					$rootScope.message = value.message;
					var text = '<card data-resource="message" data-type="messages" data-format="small"></card>';		
				}
				//Autre
				else{
					var text = value.message;			
				}
							
				$.pnotify({
				    text: text,
				    type: type,
				    sticker: sticker,
				    history:false,
				    addclass: nclass,
				    hide:hide,
				    icon:icon,
				    shadow:shadow
				});
				
				if(angular.isDefined(value.link)){
					$('.ottNotification').click(function(){
						$location.path(value.link).replace();
						$rootScope.$apply();
					})	
				}
				
				
				var element = $('.confirmation-notification,.ottNotification');
				$compile(element)($rootScope);
			}	
		});
	}

    var showAlert = function(type, errors, pageView, button){
    	pnotify(type,errors);
    }

    $rootScope.hideAlert = function(){
        hideAlert();
    }

    return{
    	showAlert : function(type,errors, pageView, button){
    		showAlert(type,errors, pageView, button);
    	},
    	
    	hideAlert : function(){
    		hideAlert();
    	}
    }
}])

/**
 * Inbox 
 */
ottercampservices.service('InboxService', 
	['UserService',
	'TransportService', 
	'RouteService',
	'$q',
	function(
		UserService,
		TransportService,
		RouteService,
		$q
	){
		var routes = [
			{action: "getMessages", api: true, url: "users", type: "get"},
			{action: "readedMessages", api: true, url: "users", type: "post"},
			{action: "getConversations", api: true, url: "users", type: "get"},
			{action: "getConversation", api: true, url: "conversations", type: "get"},
			{action: "sendMessage", api: true, url: "messages", type: "post"},
		]
		
		return {
			readedMessages: function(){
				TransportService.request(RouteService.route("readedMessages", routes, {"slashParams": [UserService.getUser().id, "messages"]}));	
			},
			
			getMessages : function(unreaded){
				var parameters = {"slashParams": [UserService.getUser().id, "messages"]};
				
				if(angular.isDefined(unreaded)){
					parameters.urlParams = [["readed", false]];
				}
				
				var defered = $q.defer();
				
				TransportService.request(RouteService.route("getMessages", routes, parameters)).then(
					function(data){
						defered.resolve(data.data);
					}				
				)
				return defered.promise;
			},

			getConversations : function(){
				var defered = $q.defer();
				
				TransportService.request(RouteService.route("getConversations", routes, {"slashParams": [UserService.getUser().id, "conversations"]})).then(
					function(data){
						defered.resolve(data.data);
					}				
				)
				return defered.promise;
			},
			
			getConversation : function(cId){
				var defered = $q.defer();
				
				TransportService.request(RouteService.route("getConversation", routes, {"slashParams": [cId, "messages"]})).then(
					function(data){
						defered.resolve(data.data);
					}	
				)				
				return defered.promise;
			},
			
			sendMessage : function(message, destId){ 
				var defered = $q.defer();
				TransportService.request(RouteService.route("sendMessage", routes, {"urlParams": [["memberId", destId],["content",message]]})).then(
					function(data){
						defered.resolve(data.data);
					}
				)
				return defered.promise;
			}
		}
}])

/**
 *	EventsService 
 */
var eventservice = ottercampservices.service('EventsService', ['UserService','TransportService', 'RouteService','$q', function(UserService,TransportService,RouteService,$q){
	
	var routes = [
		{action: "addEvent", api: true, url: "events", type: "post"},
		{action: "updateEvent", api: true, url: "events", type: "post"},
		{action: "categories", api: true, url: "categories", type: "get"},
		{action: "getEvents", api: true, url: "events", type: "get"},
		{action: "getEvent", api: true, url: "events", type: "get"},
		{action: "participate", api: true, url: "", type: "post"},
		{action: "getComments", api: true, url: "events", type: "get"},
		{action: "getCommentsAfter", api: true, url: "events", type: "get"},
		{action: "getParticipants", api: true, url: "events", type: "get"},
		{action: "cancelEvent", api: true, url: "events", type: "post"},
		{action: "acceptParticipant", api: true, url: "participations", type: "post"},
		{action: "refuseParticipant", api: true, url: "participations", type: "post"},
		{action: "pay", api: true, url: "participations", type: "post"},
		{action: "cancelParticipant", api: true, url: "participations", type: "post"},
		{action: "addComment", api: true, url: "events", type: "post"},
		{action: "setMissingInfos", api: true, url: "users", type: "post"},
		{action: "setBicInfos", api: true, url: "beneficiaries", type: "post"},
		{action: "getPhotos", api: true, url: "events", type: "get"},
		{action: "getTags", api: true, url: "tags", type: "get"},
		{action: "getCities", api: true, url: "search/cities", type: "get"},
		{action: "getSimilar", api: true, url: "events", type: "get"}
	];	
	
	var cachedCategories = [];
	var cachedTags = [];

    return{
    	getSimilar : function(evId){
    		var defered = $q.defer();
			TransportService.request(RouteService.route("getSimilar", routes, {"slashParams": [evId, "similar"]})).then(
				function(data){
					defered.resolve(data.data)
				}
			)	
			return defered.promise;	
    	},
    	
		getPhotos : function(evId){
			var defered = $q.defer();
			TransportService.request(RouteService.route("getPhotos", routes, {"slashParams": [evId, "photos"]})).then(
				function(data){
					defered.resolve(data.data)
				}
			)	
			return defered.promise;	
		},
		
    	setBicInfos : function(data){
    		TransportService.request(RouteService.route("setBicInfos", routes), data);
    	},
    	
    	pay : function(evId, partId){
    		TransportService.request(RouteService.route("pay", routes, {"slashParams": [partId, "pay"]}));			
    	},
    	
    	setMissingInfos : function(missingInfos){
    		TransportService.request(RouteService.route("setMissingInfos", routes, {"slashParams": [UserService.getUser().id]}), missingInfos);			
    	},
    	
    	updateEvent : function(eventFields,id){
        	var request = RouteService.route("updateEvent", routes, {"slashParams": [id]});
			TransportService.request(request, eventFields);      	
        },
    	
        addEvent : function(eventFields){
        	var request = RouteService.route("addEvent", routes);
        	
        	if(angular.isDefined(eventFields.files)){
        		request.type = "postFile";
        		TransportService.request(request, eventFields);
        	}
        	else{
        		TransportService.request(request, eventFields);
        	}       	
        },
        
        categories : function(){
        	var defered = $q.defer();
        	if(cachedCategories.length == 0){
        		TransportService.request(RouteService.route("categories", routes)).then(
        			function(data){
        				cachedCategories = data.data;
        				defered.resolve(cachedCategories);
        			}
        		)
        	}
        	else{
        		defered.resolve(cachedCategories);
        	}
        	return defered.promise;
        },
        
        getCities : function(city){
			var defered = $q.defer();
			TransportService.request(RouteService.route("getCities", routes, {"urlParams": [["q", city]]})).then(
				function(data){
					defered.resolve(data.data);
				},
				function(data){
					defered.reject(data);
				}
			);
			return defered.promise;
		},
        
        getTags : function(){
			var defered = $q.defer();
			if(cachedTags.length == 0){
				TransportService.request(RouteService.route("getTags", routes)).then(
					function(data){
						cachedTags = data.data;
						defered.resolve(cachedTags);
					}
				);
			}
			else{
				defered.resolve(cachedTags);
			}
			return defered.promise;
		},

        getEvents : function(){
        	TransportService.request(RouteService.route("getEvents", routes))
        },
        
        getEvent : function(id){
        	var defered = $q.defer();
        	TransportService.request(RouteService.route("getEvent", routes, {"slashParams": [id]})).then(
        		function(response){
        			defered.resolve(response.data);
        		},
        		function(data){
        			defered.reject(data);
        		});
        	return defered.promise;
        },
        
        participate : function(id,guest,participationType){
        	var defered = $q.defer();
        	
        	var urlParams = [];
        	var params;
        	if(angular.isDefined(guest) && guest){
        		urlParams = [["guests",guest]];
        	}
        	
        	if(participationType == "requested_participation"){
        		params = {"slashParams": ["participations", id, "shape"], "urlParams": urlParams};
        	}
        	else if(participationType == "invited_participation"){
        		params = {"slashParams": ["participations", id, "accept"], "urlParams": urlParams};
        	}
        	else{
        		params = {"slashParams": ["events",id , "participations"], "urlParams": urlParams};
        	}
        	
        	TransportService.request(RouteService.route("participate", routes,params)).then(
        		function(data){
        			defered.resolve(data.data);
        		},
        		function(data){
        			defered.reject(data);
        		}
        	)
        	return defered.promise;
        },
        
        getComments : function(eventId, lastRefresh){
        	TransportService.request(RouteService.route("getComments", routes, {"slashParams": [eventId, "comments"]}))      	
        },
        
        getCommentsAfter : function(eventId, lastRefresh){
        	TransportService.request(RouteService.route("getCommentsAfter", routes, {"slashParams": [eventId, "comments"],"urlParams": [["after",lastRefresh]]}))   	
        },
        
        getParticipants : function(id){
        	var defered = $q.defer();
        	TransportService.request(RouteService.route("getParticipants", routes, {"slashParams": [id, "participations"]})).then(
        		function(data){
        			defered.resolve(data.data);
      			},
      			function(data){
      				
      			}
        	)
        	return defered.promise;
        },
        
        cancelEvent : function(id){
        	TransportService.request(RouteService.route("cancelEvent", routes, {"slashParams": [id, "cancel"]}))
        },
        
        acceptParticipant : function(event_id, participation_id){
        	TransportService.request(RouteService.route("acceptParticipant", routes, {"slashParams": [participation_id,"accept"]}))
        },
        
        refuseParticipant : function(event_id, participation_id){
        	TransportService.request(RouteService.route("refuseParticipant", routes, {"slashParams": [participation_id,"refuse"]}))
        },
        
        cancelParticipant : function(event_id, participation_id){
        	TransportService.request(RouteService.route("cancelParticipant", routes, {"slashParams": [participation_id,"cancel"]}))
        },

        addComment : function(event_id, content){
        	TransportService.request(RouteService.route("addComment", routes, {"slashParams": [event_id,"comments"]}), content)
        }
    }
}])

/**
 * OrganizationService 
 */
var OrganizationService = ottercampservices.factory('OrganizationService', ['TransportService', 'RouteService', 'ErrorService','UserService', '$q',function(TransportService, RouteService, ErrorService, UserService,$q){
	var routes = [
		{action: "addOrganization", api: true, url: "organizations", type: "post"},
		{action: "getOrganization", api: true, url: "organizations", type: "get"},
		{action: "updateOrganization", api: true, url: "organizations", type: "post"},
		{action: "getOrganizations", api: true, url: "organizations", type: "get"},
		{action: "addAdministrator", api: true, url: "organizations", type: "post"},
		{action: "deleteAdministrator", api: true, url: "organizations", type: "post"}
	]
	
	return{
		addAdministrator : function(idOrg, login){
			var defered = $q.defer();
			TransportService.request(RouteService.route("addAdministrator", routes, {"slashParams": [idOrg,"administrators", login]})).then(
				function(data){
					console.log("add admin",data)
					defered.resolve(data.data);
				},
				function(data){
					console.log("add admin",data)
					defered.resolve(data.data);
				}
			);
			return defered.promise;
		},
		
		deleteAdministrator : function(idOrg, idAdmin){
			var defered = $q.defer();
			TransportService.request(RouteService.route("deleteAdministrator", routes, {"slashParams": [idOrg, "administrators",idAdmin,"delete"]})).then(
				function(data){
					defered.resolve(data.data);
				},
				function(data){
					defered.reject(data);
				}
			);
			return defered.promise;
		},
		
		getOrganizations : function(organization){
			var defered = $q.defer();
			TransportService.request(RouteService.route("getOrganizations", routes, {"urlParams": [["q", organization]]})).then(
				function(data){
					defered.resolve(data.data);
				},
				function(data){
					defered.reject(data);
				}
			);
			return defered.promise;
		},
		
		updateOrganization: function(organization,id){
			var defered = $q.defer();
			
			var request = RouteService.route("addOrganization", routes,{"slashParams": [id]});       	
        	if(angular.isDefined(organization.files)){
        		request.type = "postFile";	
        	}
        	
			TransportService.request(request, organization).then(
				function(data){
					defered.resolve(data.data);
				},
				function(data){
					defered.reject(data);
				}
			)
			
			return defered.promise;
		},
		
		getOrganization: function(id){
			var defered = $q.defer();
			
			TransportService.request(RouteService.route("getOrganization", routes, {"slashParams": [id]})).then(
				function(data){
					defered.resolve(data.data);
				},
				function(data){
					defered.reject(data);
				}
			)
			
			return defered.promise;
		},
		
		addOrganization: function(organization){
			var defered = $q.defer();
			
			var request = RouteService.route("addOrganization", routes);       	
        	if(angular.isDefined(organization.files)){
        		request.type = "postFile";	
        	}
        	
			TransportService.request(request, organization).then(
				function(data){
					defered.resolve(data.data);
				},
				function(data){
					defered.reject(data.data);
				}
			)
			
			return defered.promise;
		}
		
	}
}])		

/**
 *	PasswordService 
 */
var PasswordService = ottercampservices.factory('PasswordService', ['TransportService', 'RouteService', 'ErrorService','UserService', function(TransportService, RouteService, ErrorService, UserService){
	var routes = [
		{action: "forgottenPassword", api: true, url: "users", type: "post"},
		{action: "changePassword", api: true, url: "users", type: "post"}
	]
	
	return {
		
		forgottenPassword : function(email){				
			TransportService.request(RouteService.route("forgottenPassword", routes, {"slashParams": ["password","reset"]}), email)
		},
		
		changePassword : function(id, data){
			TransportService.request(RouteService.route("changePassword", routes, {"slashParams": [id, "password"]}), data)	
		}
	}
}])

/*
 *	ConfirmService 
 */
var ConfirmService = ottercampservices.factory('ConfirmService', ['TransportService', 'RouteService', 'ErrorService','UserService', function(TransportService, RouteService, ErrorService, UserService){
	
	var routes = [
		{action: "confirm", api: true, url: "users", type: "post"},
		{action: "sendConfirmation", api: true, url: "users", type: "post"}
	]

	return{
		confirm: function(id, token, data){
			UserService.setToken(token);
			TransportService.request(RouteService.route("confirm", routes, {"slashParams": [id,"confirm"]}), data)	
		},
		
		sendConfirmation: function(){
			TransportService.request(RouteService.route("sendConfirmation", routes, {"slashParams": [UserService.id(),"confirmation","send"]}))
		}
	}
}])

/*
 *	NotificationsService 
 */
var NotificationsService = ottercampservices.factory('NotificationsService', ['TransportService', 'RouteService', 'ErrorService', 'UserService','$q', function(TransportService, RouteService, ErrorService, UserService,$q){
	
	var routes = [
		{action: "lastNotifications", api: true, url: "users", type: "get"},
		{action: "allNotifications", api: true, url: "users", type: "get"},
		{action: "readedNotifications", api: true, url: "users", type: "post"}
	]

	return{
		lastNotifications: function(){
			var defered = $q.defer();
			TransportService.request(RouteService.route("lastNotifications", routes, {"slashParams": [UserService.id(),"notifications"],"urlParams": [["readed", false]]})).then(
				function(data){
					defered.resolve(data.data);
				}
			)
			return defered.promise;
		},
		
		readedNotifications: function(){
			TransportService.request(RouteService.route("readedNotifications", routes, {"slashParams": [UserService.id(),"notifications"]}))	
		},
		
		allNotifications: function(){
			TransportService.request(RouteService.route("allNotifications", routes, {"slashParams": [UserService.id(),"notifications"]}))
		}
	}
}])		

/**
 * BadgesService 
 */
ottercampservices.factory('BadgesService', ['TransportService', 'RouteService','$q', 'UserService', function(TransportService,RouteService,$q,UserService){
	var routes = [
		{action: "getBadge", api: true, url: "badges", type: "get"}
	]
	
	return{
		getBadge: function(id){
			var defer = $q.defer();
			TransportService.request(RouteService.route("getBadge", routes, {"slashParams": [id]})).then(
				function(data){
					defer.resolve(data.data)
				},
				function(data){
					defer.reject(data.data);
				}
			)
			return defer.promise;
		}
	}
}]);


/**
 * HobbiesService 
 */
ottercampservices.factory('HobbiesService', ['TransportService', 'RouteService','$q', 'UserService', function(TransportService,RouteService,$q,UserService){
	var routes = [
		{action: "addHobby", api: true, url: "users", type: "post"},
		{action: "deleteHobby", api: true, url: "users", type: "post"},
		{action: "hobbies", api: true, url: "hobbies", type: "get"}
	]
	
	var cachedHobbies = [];
	
	return{
		addHobby: function(hobbyId){
			var defer = $q.defer();
			TransportService.request(RouteService.route("addHobby", routes, {"slashParams": [UserService.id(),"hobbies",hobbyId]})).then(
				function(data){
					defer.resolve(data.data)
				},
				function(data){
					defer.reject(data.data);
				}
			)
			return defer.promise;
		},
		
		deleteHobby : function(hobbyId){
			var defer = $q.defer();
			TransportService.request(RouteService.route("deleteHobby", routes, {"slashParams": [UserService.id(),"hobbies",hobbyId,"delete"]})).then(
				function(data){
					defer.resolve(data.data)
				},
				function(data){
					defer.reject(data.data);
				}
			)
			return defer.promise;
		},
		
		hobbies : function(){
	    	var defered = $q.defer();
			if(cachedHobbies.length == 0){
	    		TransportService.request(RouteService.route("hobbies", routes)).then(
	    			function(data){
	    				cachedHobbies = data.data;
	    				defered.resolve(cachedHobbies);
	    			}
	    		)
	    	}
	    	else{
	    		defered.resolve(cachedHobbies)
	    	}	
	    	return defered.promise;
	    }
	}
}])

/**
 * TalentsService 
 */
ottercampservices.factory('TalentsService', ['TransportService', 'RouteService', 'UserService', '$q', function(TransportService,RouteService,UserService,$q){
	var routes = [
		{action: "addTalent", api: true, url: "users", type: "post"},
		{action: "deleteTalent", api: true, url: "users", type: "post"},
		{action: "talents", api: true, url: "talents", type: "get"}
	]
	var cachedTalents = [];
	return{
		addTalent : function(talentId){
			var defer = $q.defer();
			TransportService.request(RouteService.route("addTalent", routes, {"slashParams": [UserService.id(),"talents",talentId]})).then(
				function(data){
					defer.resolve(data.data)
				},
				function(data){
					defer.reject(data.data);
				}
			)
			return defer.promise;
		},
		
		deleteTalent : function(talentId){
			var defer = $q.defer();
			TransportService.request(RouteService.route("deleteTalent", routes, {"slashParams": [UserService.id(),"talents",talentId,"delete"]})).then(
				function(data){
					defer.resolve(data.data)
				},
				function(data){
					defer.reject(data.data);
				}
			)
			return defer.promise;
		},
		
		talents : function(){
			var defered = $q.defer();
			if(cachedTalents.length == 0){
	    		TransportService.request(RouteService.route("talents", routes)).then(
	    			function(data){
	    				cachedTalents = data.data;
	    				defered.resolve(cachedTalents);
	    			}
	    		)
	    	}
	    	else{
	    		defered.resolve(cachedTalents)
	    	}	
	    	return defered.promise;
	    }
	}
}])

/**
 *	UserService 
 */
var userService = ottercampservices.factory('UserService', ['TransportService','$cookies','RouteService', '$location','$rootScope','$q','authService','ErrorService','$injector', 'localizeService','BrowserService','$filter', function(TransportService,$cookies, RouteService, $location,$rootScope,$q,authService,ErrorService,$injector,localizeService,BrowserService,$filter){
	
	var routes = [
		{action: "updateParameter", api: true, url: "users", type: "post"},
		{action: "getParameter", api: true, url: "users", type: "get"},
		{action: "login", api: false, url: "login", type: "post"},
		{action: "logout", api: false, url: "logout", type: "post"},
		{action: "sendMessage", api:false, url: "about/contact", type: "post"},
		{action: "register", api: false, url: "register", type: "post"},
		{action: "autologin", api: false, url: "login", type: "post"},
		{action: "updatePhoto", api: true, url: "events", type: "post"},
		{action: "getGeoIP", api: true, url: "geoip", type: "get"},
		{action: "languages", api: true, url: "languages", type: "get"},
		{action: "ageBrackets", api: true, url: "agebrackets", type: "get"},
		{action: "getEvents", api: true, url: "users", type:"get"},
		{action: "getContext", api: true, url: "context", type:"get"},
		{action: "getUserPhotos", api: true, url: "users", type:"get"},
		{action: "getUserComments", api: true, url: "users", type:"get"},
		{action: "getSimilar", api: true, url: "users", type: "get"},
		{action: "invite", api: true, url: "events", type:"post"},
		{action: "getOrganizations", api: true, url:"users", type:"get"},
		{action: "addCommunity", api: true, url: "users", type: "post"},
		{action: "deleteCommunity", api: true, url: "users", type: "post"}	
	];
	
	//Etat de l'utilisateur
	var logged_in = false;
	
	var user = {};
	
	//Token de l'application
	var app_token = "b9e503ae37983f7364e9743f915f2718363902cf";
	
	var lastAction = "";
	
	var geoloc = null;
	
	var showModal = true;
	
	var config = {
		eventsTemplate : "events-cards"	
	};
	
	var loadUser = function(access, update){
		
		var defer = $q.defer();
		if(angular.isUndefined(update)){
			console.log("loaduser 1")
			user = access.member;
			user.token = access.token;
			//Récupération du contexte
			getContext().then(function(data){
				user.context = data
			});
			
			//Demande geoloc Si page discover
			if($location.path() == "/"){	
				$injector.get("GeolocService").getGeoloc(true);
			}
			
			//MAJ langue utilisateur
			setLanguage().then(
				function(){
					//Si user non confirmé et page différente de confirm
			    	if(!user.confirmed && $location.path().split("/")[1] != "confirm"){
			    		var message = $filter('trad')('warning_member_unconfirmed');
			    		ErrorService.showAlert("confirmation", [{message: message}], 1, {show:true,title:$filter("trad")("label_send_confirmation_email")});
			    	}
					defer.resolve();
				}
			);	

			logged_in = true;
			
			//On le dit au service d'authentification
			authService.loginConfirmed();
		}
		else{
			var tempToken = user.token;
			var tempContext = user.context;
			user = access;
			user.token = tempToken;
		}		
		
		$rootScope.$broadcast("loadUser");
		
		return defer.promise;
	}
	
	var getContext = function(){
		var defered = $q.defer();
		
		TransportService.request(RouteService.route("getContext", routes)).then(
			function(data){
				defered.resolve(data.data);
			},
			function(){
				defered.reject();
			}
		)
		
		return defered.promise;
	}
	
	var setLanguage = function(){
		var defer = $q.defer();
		//Chargement de la langue
		if(angular.isDefined(user.i18n) && angular.isDefined(user.i18n.language) && angular.isDefined(user.i18n.language.code)){
			localizeService.setLanguage(user.i18n.language.code);			
		}
		else{
			localizeService.setLanguage();
		}
		
		localizeService.loadResource().then(function(){
			defer.resolve();
		},
		function(){
			defer.reject();
		});
		return defer.promise;
	}
	
	var cachedLanguages = [];
	var cachedAgeBrackets = [];
	
	return{
		addCommunity : function(community){
			var defer = $q.defer();
			TransportService.request(RouteService.route("addCommunity", routes, {"slashParams": [user.id,"communities",community.id]})).then(
				function(data){
					if(angular.isUndefined(user.communities)){
						user.communities = [community];
					}
					else{
						user.communities.push(community);
					}
					defer.resolve(data.data)
				},
				function(data){
					defer.reject(data.data);
				}
			)
			return defer.promise;
		},
		
		deleteCommunity : function(communityId){
			var defer = $q.defer();
			TransportService.request(RouteService.route("deleteCommunity", routes, {"slashParams": [user.id,"communities",communityId,"delete"]})).then(
				function(data){
					angular.forEach(user.communities, function(value, key){
						if(value.id == communityId){
							user.communities.splice(key,1);
						}
					})
					defer.resolve(data.data)
				},
				function(data){
					defer.reject(data.data);
				}
			)
			return defer.promise;
		},
		
		getOrganizations : function(){
			var defered = $q.defer();
			
			TransportService.request(RouteService.route("getOrganizations", routes, {"slashParams": [user.id, "organizations"]})).then(
				function(data){
					defered.resolve(data.data);
				},
				function(data){
					defered.resolve(data);
				}
			)
			
			return defered.promise;
		},
		
		setHobbies : function(hobbies){
			user.hobbies = hobbies;
		},
		
		setTalents: function(talents){
			user.talents = talents;
		},
		
		getSimilar : function(userId){
    		var defered = $q.defer();
			TransportService.request(RouteService.route("getSimilar", routes, {"slashParams": [userId, "similar"]})).then(
				function(data){
					defered.resolve(data.data)
				}
			)	
			return defered.promise;	
    	},
		
		setConfirmed: function(){
			user.confirmed = true;
		},
		getUserPhotos: function(){
			var defered = $q.defer();
			TransportService.request(RouteService.route("getUserPhotos", routes, {"slashParams": [user.id, "photos"]})).then(
				function(data){
					defered.resolve(data.data);
				}
			)
			return defered.promise;
		},

        sendMessage: function(data){
        	TransportService.request(RouteService.route("sendMessage", routes), data)
        },
		
		getUserComments: function(){
			var defered = $q.defer();
			TransportService.request(RouteService.route("getUserComments", routes, {"slashParams": [user.id, "comments"]})).then(
				function(data){
					defered.resolve(data.data)
				}
			)
			return defered.promise;
		},
		getConfig: function(){
			return config;
		},
		
		addConfig : function(key,value){
			config[key] = value;
		},
		
    	getContext : function(){
			return user.context;
    	},
    	
    	updateContext : function(context){
    		user.context = context;
    	},
    	
		setLanguage : function(){
			setLanguage();	
		},
		
		closedDiscoverModal : function(){
			showModal = false;
		},
		
		showModal : function(){
			if(logged_in){
				return false;
			}
			else{
				return showModal;
			}	
		},
		
		invite : function(evId,userId){
			var defered = $q.defer();
			TransportService.request(RouteService.route("invite", routes, {"slashParams": [evId, "invite"]}), {memberId:userId}).then(
				function(data){
					defered.resolve(data.data);
				},
				function(data){
					defered.reject(data);
				}
			)	
			return defered.promise;
		},

		getEvents : function(statusArray, userId){
			//Récupération des événéments d'un autre utilisateur
			if(angular.isDefined(userId)){
				console.log("Récupération des événéments d'un autre utilisateur")
				var id = userId;
			}
			//Récupération des événements de l'utilisateur connecté
			else{
				console.log("Récupération des événements de l'utilisateur connecté")
				var id = user.id
			}
			if(angular.isDefined(statusArray) && statusArray.length > 0){
				var status = "";
				angular.forEach(statusArray, function(value, key){
					status += "," + value;
				})
				//Suppression de la première virgule
				status = status.substring(1);
				var urlParams = [["status",status]];
			}
			else{
				var urlParams = [];
			}
			var defered = $q.defer();
			TransportService.request(RouteService.route("getEvents", routes, {"slashParams": [id, "events"], "urlParams":urlParams})).then(
				function(data){
					defered.resolve(data.data);
				},
				function(data){
					defered.reject(data);
				}
			)
			return defered.promise;
		},

	    languages : function(){
	    	var defered = $q.defer();
	    	if(cachedLanguages.length ==0){
	    		TransportService.request(RouteService.route("languages", routes)).then(
	    			function(data){
	    				cachedLanguages = data.data;
	    				defered.resolve(cachedLanguages);
	    			}
	    		)
	    	}
	    	else{
	    		defered.resolve(cachedLanguages);
	    	}	
	    	return defered.promise;
	    },
	    
	    ageBrackets : function(){
        	var defered = $q.defer();
        	if(cachedAgeBrackets.length == 0){
	        	TransportService.request(RouteService.route("ageBrackets", routes)).then(
	        		function(data){
	        			cachedAgeBrackets = data.data;
	        			defered.resolve(cachedAgeBrackets);
	        		}
	        	)
	        }
	        else{
	        	defered.resolve(cachedAgeBrackets);
	        }	
        	return defered.promise;
        },
		
		updatePhoto : function(data){
			TransportService.request(RouteService.route("updatePhoto", routes, {"slashParams": [user.id, "photo"]}),data )
		},
		
		//Charge un user à partir d'un accès
		loadUser : function(access, update){	
			loadUser(access, update);			
		},
		
		login : function(data){		
			var deferred = $q.defer();
			TransportService.request(RouteService.route("login", routes), data).then(function(response){

				//Si le login est un succès....
		    	if(angular.isUndefined(response.data.errors) && angular.isDefined(response.data) && angular.isDefined(response.data.id)){
		    		//Update user data	    	
					loadUser(response.data);
									
					deferred.resolve();			
		    	}
		    	//Erreur de connexion
		    	else{
		    		//Si le login est un échec....
		    		//Afficher les erreurs
		    		//ErrorService.showAlert("error", response.data.errors);
		    		deferred.reject();
		    	}
			}, function(error){
				ErrorService.showAlert("error", error);
				deferred.reject();
			});
			return deferred.promise
		},
		
		autologin : function(data){
			TransportService.request(RouteService.route("autologin", routes), data);
		},
		
		logout : function(){
			//Pour le moment pas de paramètres pour se déconnecter
			var data = {};
			user = {};
			logged_in = false;
			//Last action
			lastAction = "logout";
			showModal = false;
			TransportService.request(RouteService.route("logout", routes));		
			//Cacher les notifications
			ErrorService.hideAlert();		
		},
		
		updateParameter : function(data){
			var defered = $q.defer();
			TransportService.request(RouteService.route("updateParameter", routes, {"slashParams": [user.id]}),data).then(
				function(data){
					defered.resolve(data.data);
				},
				function(data){
					defered.reject(data);
				}
			)
			return defered.promise;
		},
		
		getParameter : function(){
			TransportService.request(RouteService.route("getParameter", routes, {"slashParams": [user.id]}));
		},
		
		getUserInfos : function(userId){
			var defered = $q.defer();
			TransportService.request(RouteService.route("getParameter", routes, {"slashParams": [userId]})).then(
				function(data){
					defered.resolve(data.data)
				},
				function(data){
					defered.reject(data)
				}
			);
			return defered.promise;
		},	
		
		//Met à jour beneficiaryId
		setBeneficiary : function(){
			//Valeur arbitraire !
			user.beneficiaryId = 999;
		},	
		
		register : function(data){
			TransportService.request(RouteService.route("register", routes), data);
		},
		
		//Tente d'autoconnecter l'utilisateur grâce au cookie email + password
		autoConnect : function(){
			console.log("autoconnect")
			var deferred = $q.defer();
			
			if(lastAction != "logout" && (angular.isDefined($cookies.e) && angular.isDefined($cookies.p))){
				$rootScope.previousPath = $location.path();
				TransportService.request(RouteService.route("autologin", routes)).then(function(response){
					if(angular.isUndefined(response.data.errors) && angular.isDefined(response.data) && angular.isDefined(response.data.id)){
			    		//Update user data	    	
						loadUser(response.data).then(function(){
							deferred.resolve(response)
						});							
		    		}
		    		else{
		    			deferred.resolve(response)
		    		}					
				})		
			}
			else{
				lastAction = "";
				
				setLanguage().then(function(){
					deferred.resolve();
				});
			}	
	
			return deferred.promise;			
		},
		
		getGeoIP : function(){
			var geoipDefered = $q.defer();

			TransportService.request(RouteService.route("getGeoIP", routes, {"urlParams": [["ip","83.206.127.155"]]})).then(
				function(data){
					geoipDefered.resolve(data.data)
				},
				function(error){
					geoipDefered.reject()
				}
			)

			return geoipDefered.promise;
		},
				
		isLoggedIn:function(){
			return logged_in;
		},
		
	    getUser: function () {	    	
	     	return logged_in ? user : null;
	    },
	    
	    token : function(){
	    	if(angular.isDefined(user) && angular.isDefined(user.token)){
	    		return user.token;
	    	}	
	    	else return app_token;
	    },
	    
	    id : function(){
	    	return user.id;
	    },
	    
	    lang : function(){
	    	if(angular.isDefined(user) && angular.isDefined(user.i18n) && user.i18n.language != null) return user.i18n.language.abbreviation;
	    	else return null;
	    },
	    
	    setGeoloc : function(newgeo){
	    	geoloc = {};
	    	geoloc.type = newgeo.type;
	    	geoloc.lat = newgeo.lat;
	    	geoloc.lng = newgeo.lng;
	    },
	    
	    getGeoloc : function(){
	    	return geoloc;
	    },
	    
	    setToken : function(token){
	    	user.token = token;
	    },

	    getTalents : function(){
	    	return user.talents;
	    },
	    
	    getHobbies : function(){
	    	return user.hobbies;
	    }	    
	}	
}]);

/**
 * PaymentService 
 */
var PaymentService = ottercampservices.factory('PaymentService', ['TransportService', 'RouteService', 'UserService', '$q',function(TransportService,RouteService, UserService,$q){
	
	var routes = [
		{action: "operations", api: true, url: "users", type: "get"},
		{action: "beneficiaries", api: true, url: "users", type: "get"},
		{action: "cards", api: true, url: "users", type: "get"}
	]	
	
	return {
		operations : function(){
			var defered = $q.defer();
			TransportService.request(RouteService.route("operations", routes, {"slashParams": [UserService.id(), 'operations']})).then(
				function(data){
					defered.resolve(data.data);
				}
			)
			return defered.promise;
		},
		
		beneficiaries : function(){
			var defered = $q.defer();
			TransportService.request(RouteService.route("beneficiaries", routes, {"slashParams": [UserService.id(), 'beneficiaries']})).then(
				function(data){
					defered.resolve(data.data);
				}
			)
			return defered.promise;
		},
		
		cards : function(){
			var defered = $q.defer();
			TransportService.request(RouteService.route("cards", routes, {"slashParams": [UserService.id(), 'cards']})).then(
				function(data){
					defered.resolve(data.data);
				}
			)
			return defered.promise;
		}
	}
}]);

/**
 * SearchService 
 */
var SearchService = ottercampservices.factory('SearchService', ["TransportService", "RouteService", "UserService", "$location", "$rootScope", function(TransportService,RouteService, UserService, $location,$rootScope){
	
	var routes = [
		{action: "searchEvents", api: true, url: "search", type: "get"},
		{action: "searchUsers", api: true, url: "search", type: "get"},
		{action: "searchPlaces", api: true, url: "search", type: "get"},
		{action: "searchOrganizations", api: true, url: "search", type: "get"},
		{action: "searchCommunities", api: true, url: "search", type: "get"}
	]
	
	var parameters = {};
	
	var lastParameters;
	
	var init = function(){
		tempUrlParameters = getUrlParameters();
	}

	var format = function(){

		var params = [];
	
        if (angular.isDefined(parameters.city)) {
            //console.log("there is a city");
            delete parameters.iploc;
            delete parameters.center;
            delete parameters.near;
            delete parameters.home;
        }
        else if(angular.isDefined(parameters.center)){
			//console.log("there is center");
			delete parameters.iploc;
            delete parameters.near;
            delete parameters.home;
		}
		else if (angular.isDefined(parameters.home)) {
            //console.log("there is home");
            delete parameters.iploc;
            delete parameters.near;
        }
        else if (angular.isDefined(parameters.near)) {
            //console.log("there is near");
            delete parameters.iploc;
        }
        else {
            //console.log("there is ....");
        }

		for (var key in parameters) {
			if(parameters.hasOwnProperty(key)){
				var itemValue = parameters[key];
				var itemKey = key;		

				switch (itemKey){					
					case "near":
					console.log("near,",UserService.getGeoloc());
						if(angular.isDefined(itemValue) && itemValue){
							params.push(["latitude", UserService.getGeoloc().lat]);
							params.push(["longitude", UserService.getGeoloc().lng]);
						}	
					break;
					
					case "home":
						if(angular.isDefined(itemValue) && itemValue){
							params.push(["latitude", UserService.getUser().address.location.lat]);
							params.push(["longitude", UserService.getUser().address.location.lng]);
						}
					break;
					
					case "iploc":
						if(angular.isDefined(itemValue) && itemValue){
							params.push(["latitude", UserService.getGeoloc().lat]);
							params.push(["longitude", UserService.getGeoloc().lng]);
						}
					break;
					
					case "city":
						if(angular.isDefined(itemValue)){
							params.push(["latitude", itemValue.latitude]);
							params.push(["longitude", itemValue.longitude]);
							//params.push(["city", itemValue]);
						}
					break;

					case "center":
						params.push(["latitude", itemValue.latitude]);
						params.push(["longitude", itemValue.longitude]);
					break;	
					
					case "person":
						if(angular.isDefined(itemValue.min)){
							params.push(["minParticipants", itemValue.min]);
						}
						if(angular.isDefined(itemValue.max)){
							params.push(["maxParticipants", itemValue.max]);
						}						
					break;
					
					case "price":				
						if(angular.isDefined(itemValue.min)){
							params.push(["minPrice", itemValue.min]);
						}
						if(angular.isDefined(itemValue.max)){
							params.push(["maxPrice", itemValue.max]);
						}
					break;
					/*
					case "after":
						if(angular.isDefined(itemValue)){
							params.push(["after", itemValue]);
						}
					break;
					*/
					case "after":
						if(angular.isDefined(itemValue)){
							params.push(["after", itemValue]);
						}
					/*
					case "categories":
						if(angular.isDefined(itemValue) && itemValue.length > 0){
							var res = "";
							angular.forEach(itemValue, function(value, key){
								res += value + ",";
							})
							//Suppression dernier caractere
							res = res.slice(0,res.length -1);
							params.push(["categories", res]);
						}
					break;
					*/
					case "ageBrackets":
						if(angular.isDefined(itemValue.min)){
							params.push(["minAge", itemValue.min]);
						}
						if(angular.isDefined(itemValue.max)){
							params.push(["maxAge", itemValue.max]);
						}	
					break;	
					
					case "q":
						params.push(["q", itemValue]);
					break;
				}
			}
		}		

		//Si aucun paramètres de location on ajoute soit iploc soit html5loc
		if(angular.isUndefined(parameters.center) && angular.isUndefined(parameters.home) && angular.isUndefined(parameters.near) && angular.isUndefined(parameters.city) && angular.isUndefined(parameters.iploc)){
			console.log("***NO GEOLOC***",UserService.getGeoloc())
			if(angular.isDefined(UserService.getGeoloc()) && UserService.getGeoloc()){
				if(UserService.getGeoloc().type == "HTML5loc"){
					parameters.near = true;
				}
				else if(UserService.getGeoloc().type == "IPloc"){
					parameters.iploc = true;
				}
				params.push(["latitude", UserService.getGeoloc().lat]);
				params.push(["longitude", UserService.getGeoloc().lng]);
			}
		}		
		
		//params = controlLatitudeLongitude(params);
		return params;
	}
	/*
	* Contrôle validité latitude longitude [-180;180]
	*/	 
	var controlLatitudeLongitude = function(p){
		if(angular.isDefined(p.latitude)){
			p.latitude = Number(p.latitude);
		}
		if(angular.isDefined(p.longitude)){
			p.longitude = Number(p.longitude);
		}
		if(!angular.isDefined(p.latitude) || isNaN(p.latitude) || !angular.isNumber(p.latitude) || p.latitude < -90 || p.latitude > 90){
			delete p.latitude;
			delete p.longitude;
		}
		else{
			//console.log("latitude valid",p.latitude);
		}
		if(!angular.isDefined(p.longitude) || isNaN(p.longitude) ||  !angular.isNumber(p.longitude) || p.longitude < -180 || p.longitude > 180){
			delete p.latitude;
			delete p.longitude;
		}
		else{
			//console.log("longitude valid",p.longitude);
		}

		return p;
	}

	var updateUrl = function(){		
		console.log("update url",parameters);
		var res = {};
		var params = format();	
		angular.forEach(params, function(value, key){
			res[value[0]] = value[1];		
		})

		//MAJ de l'url
		console.log("updateUrl",res)
		lastParameters = res;
		$location.search(res)
		
		$rootScope.ignoreRefresh = true;
	}
	
	var isEmpty = function(p){
		var firstProp;
		for(var key in p) {
		    if(p.hasOwnProperty(key)) {
		        firstProp = p[key];
		        break;
		    }
		}
		if(angular.isUndefined(firstProp)){
			return true;
		}
		else{
			return false;
		}
	}
	
	var tempUrlParameters;
	
	var getUrlParameters = function(){
		parameters = [];
		
		//Récupération des paramètres dans l'url
		var params = $location.search();
		console.log("getUrlParameters",params);

		if(!isEmpty(params)){
			//Valdiation de la latitude et de la longitude
			params = controlLatitudeLongitude(params);

			var urlParams = [];
			
			/* Cas latitude longitude rajouté à la main*/
			if(angular.isDefined(params['latitude']) && angular.isDefined(params['longitude'])){				
				parameters['center'] = {
					latitude : params['latitude'],
					longitude : params['longitude']
				}
				$rootScope.$broadcast("addCenter")
				console.log("ajout center",parameters);
			}
			
			angular.forEach(params, function(value, key){
					
				//urlParams.push([key,value]);
				
				//Ajout des paramètres provenant de l'url dans les paramètres du service
				switch(key){
					case "minParticipants":
						if(angular.isUndefined(parameters["person"])){
							parameters["person"] = {};
						}
						parameters["person"].min = value;
					break;
					case "maxParticipants":
						if(angular.isUndefined(parameters["person"])){
							parameters["person"] = {};
						}
						parameters["person"].max = value;
					break;
					case "minPrice":
						if(angular.isUndefined(parameters["price"])){
							parameters["price"] = {};
						}
						parameters["price"].min = value;
					break;
					case "maxPrice":
						if(angular.isUndefined(parameters["price"])){
							parameters["price"] = {};
						}
						parameters["price"].max = value;
					break;
					case "q":
						parameters["q"] = value;
					break;	
					case "minAge":
						if(angular.isUndefined(parameters["ageBrackets"])){
							parameters["ageBrackets"] = {};
						}
						parameters["ageBrackets"].min = value;
					break;	
					case "maxAge":
						if(angular.isUndefined(parameters["ageBrackets"])){
							parameters["ageBrackets"] = {};
						}
						parameters["ageBrackets"].max = value;
					break;	
					case "zipCode":
						parameters["zipCode"] = value;
					break;
					
					case "city":
						parameters["city"] = value;
					break;
					
					case "after":
						console.log("after",value)
						if(angular.isDefined(value)){
							console.log("ajout")
							parameters["after"] = Number(value);
						}
					break;	
				}				
			})

			params = {"urlParams": urlParams};
		}
		else{
			params = false;
		}
		console.log("parameters",parameters,"params",params)
		return params;
	}
	
	init();
	
	return{
		getUrlParameters : function(){
			return getUrlParameters();
		},
		
		resetUrl : function(){
			$location.search(null);
		},
		
		resetParameter: function(){
			parameters = {};
			$location.search(null)
		},

		removeParameter: function(key){
			delete parameters[key];
		},
		
		addParameter: function(key, value){
			parameters[key] = value;			
			$rootScope.$broadcast("newSearchParameters", parameters);
		},
		
		getParameters: function(){
			return parameters;
		},
		
		getLastParameters: function(){
			return lastParameters;
		},
		
		search: function(isUrl, kind){
			console.log("parameters",parameters,$location.search());
			var params;
			params = {"urlParams": format()};

			//Choix type requête
			var arequest;
			switch(kind){
				case "events":
					arequest = "searchEvents";
					params.slashParams = ["events"];
				break;
				
				case "users":
					arequest = "searchUsers";
					params.slashParams = ["users"];
				break;	
				
				case "communities":
					arequest = "searchCommunities";
					params.slashParams = ["organizations"];
					params.urlParams.push(["asCommunity",true]);
				break;
				case "organizations":
					arequest = "searchOrganizations";
					params.slashParams = ["organizations"];
				break;	
						
				default:
					arequest = "searchEvents";
					params.slashParams = ["events"];
				break;
			}
			console.log("kind",arequest)
			//Lancement de la requête
			TransportService.request(RouteService.route(arequest, routes, params)).then(
				function(data){
					//MAJ de l'url
					updateUrl();
				}
			);
		}
	}
}])	

/**
 *	BroadcastFactory 
 */
var BroadcastFactory = ottercampservices.factory('BroadcastFactory', ['$rootScope','$log', function($rootScope,$log) {
	
    var data = '';

    var action = '';

    var broadcastItem = function() {
    	//$log.warn("		Action:",action,"Data:", data)
        $rootScope.$broadcast(action,data);
    };

    return {
    	broadcast : function(paction, pdata) {
	        data = pdata;
	        action = paction;
	        broadcastItem();	
    	}
    }	
}])

/**
 * Geoloc 
 */
var geolocService = ottercampservices.factory('GeolocService', ["$q","UserService","$rootScope", function($q,UserService,$rootScope){
	
	var html5 = function(){
		var html5defered = $q.defer();

		navigator.geolocation.getCurrentPosition(
			function(location){
				$rootScope.$apply(function(){
					var lat = location.coords.latitude;
        			var lng = location.coords.longitude;
        			UserService.setGeoloc({type:"HTML5loc",lat: lat, lng: lng});
        			html5defered.resolve({type:"HTML5loc",lat: lat, lng: lng});
				})				
			},
			function(error){
				$rootScope.$apply(function(){
		    		iploc().then(
		    			function(data){
		    				html5defered.resolve(data);		    			
	    				},
	    				function(){
		    				html5defered.reject();
		    			}
		    		)	
				})					    		
			}		
		)
		return html5defered.promise;
	}
	
	var iploc = function(){
		var deferredGetGeoIP = 	$q.defer();
		UserService.getGeoIP().then(
			function(data){
				UserService.setGeoloc({type:"IPloc",lat: data.latitude, lng: data.longitude});
				deferredGetGeoIP.resolve({type:"IPloc",lat: data.latitude, lng: data.longitude});				    				
			},
			function(){
				deferredGetGeoIP.reject();
			}
		);
		return deferredGetGeoIP.promise;
	}
	
	return {

		getGeoloc : function(force){
			var deferedGetGeoloc = $q.defer();
			var currentGeoloc = UserService.getGeoloc();

			if(currentGeoloc == null || (angular.isDefined(force) && force)){
				//utilisateur connecté et pas encore de geoloc
				if(UserService.isLoggedIn() || (angular.isDefined(force) && force)){
					var test = $q.defer();					
					html5().then(function(data){
						deferedGetGeoloc.resolve(data);
					}, function(){
						deferedGetGeoloc.reject();
					})		
				}
				//Utilisateur non connecté
			    else{
		    		iploc().then(function(data){
		    			deferedGetGeoloc.resolve(data);	
		    			
		    		}, function(){
		    			deferedGetGeoloc.reject();
		    		})
		    	
			   	}
			} 
			else{
				if(UserService.isLoggedIn() && angular.isDefined(currentGeoloc.type) && currentGeoloc.type == "IPloc"){
					
				}
				deferedGetGeoloc.resolve(currentGeoloc);
			} 		
		   
			return deferedGetGeoloc.promise;	
		}
	}		    	
}]);

/**
 * Forecast 
 */	
ottercampservices.service('ForecastService', ['TransportService','RouteService','$q', function(TransportService,RouteService,$q){
	
	var basePath = "https://api.forecast.io/forecast/";
	
	var routes = [
		{action: "getWeather", api: false, url: "forecast/weather", type: "post"}
	];
	
	return {
		getWeather : function(lat,lng,time){
			var defered = $q.defer();
			TransportService.request(RouteService.route("getWeather", routes), {latitude:lat,longitude:lng,time:time}).then(
				function(data){
					defered.resolve(data.data);
				},
				function(data){
					defered.reject(data);
				}
			);
			return defered.promise;
		}
	}
	
}])

/**
 * GoogleMap 
 */
var googlemapService = ottercampservices.service('GooglemapService', ['TransportService', 'RouteService','$q', function(TransportService,RouteService,$q){
	
	//Paramètres
	var key = "AIzaSyArq4s9qvuTT5nkmh8FGvnlHnfoZoSC1WM";
	var sensor = false;
	var language = "fr";
	var types = "geocode";
	
	var routes = [
		{action: "getGeoloc", api: null, otherPath: "https://maps.googleapis.com/maps/api",url: "/geocode/json", type: "get"},
		{action: "getPlaces", api: null, otherPath: "https://maps.googleapis.com/maps/api", url: "/place/autocomplete/json", type: "get"},
		{action: "getCitiesByZipCode", api: true, url: "search/cities", type: "get"}
	];
	
	var cachedTags = [];
	
	return {
		getCitiesByZipCode : function(zipCode){
			var defered = $q.defer();
			TransportService.request(RouteService.route("getCities", routes, {"urlParams": [["zipCode", zipCode]]})).then(
				function(data){
					defered.resolve(data.data);
				},
				function(data){
					defered.reject(data);
				}
			);
			return defered.promise;
		},

		getGeoloc : function(address){
			TransportService.request(RouteService.route("getGeoloc", routes, {"urlParams": address}));
		},
		
		getPlaces : function(address){
			var deferedPlaces = $q.defer();
			var search = [
				["address",address],
				["sensor",sensor]
			];
			
			TransportService.request(RouteService.route("getGeoloc", routes, {"urlParams": search})).then(
				function(data){
					deferedPlaces.resolve(data.data)
				},
				function(error){
					deferedPlaces.reject()
				}
			);
			
			return deferedPlaces.promise;	
		},
		
		getPlacesOld : function(input){	
			var deferedPlaces = $q.defer();
			
			//Préparation paramètres
			var parameters = [
				["input", input], 
				["types", types],
				["language", language], 
				["sensor", sensor], 
				["key", key]
			];			
			
			TransportService.request(RouteService.route("getPlaces", routes, {"urlParams": parameters})).then(
				function(data){
					var places = [];
					
					angular.forEach(data.data.predictions, function(value, key){
						places.push(value.description);
					});
					deferedPlaces.resolve(places)
				},
				function(error){
					deferedPlaces.reject()
				}
			);
			
			return deferedPlaces.promise;	
		}
	}		
}]);	

/**
 *	RouteService 
 */
var routeService = ottercampservices.service('RouteService', ['$injector', function($injector){

	var rootPathAPI = Config.apiURL;

	var finalRoute;
	
	var finalUrl;
	
	var parameter;
	
	var UserService;
	
	//Avoid circular dependencies
	var initUserService = function(){
		UserService = $injector.get('UserService');
	}
	
	var searchRoute = function(action, routes){
		var searching = true;
		angular.forEach(routes, function(proute, key){
			if(searching && proute.action == action){
				searching = false;
				finalRoute = {action: proute.action, api: proute.api, url: proute.url, type: proute.type, otherPath: proute.otherPath};
				
			}
		});
		
		if(!searching)	return true;			
		else	return false;
	}
	
	var makeRoute = function(isLogin){
		
		//Ajout de slahParams dans l'url initial
		if(parameter && typeof(parameter.slashParams) != 'undefined'){
			angular.forEach(parameter.slashParams, function(par, key){
				if(finalRoute.url == "") finalRoute.url += par;
				else finalRoute.url += "/" + par;	
			});			
		}
		
		//Récupération du UserService
		//if(isLogin){
			//finalUrl = rootPathWS + finalRoute.url
		//}
		//else{
			initUserService();
			
			if(finalRoute.api != null){
				if(finalRoute.api){
					
					finalUrl = rootPathAPI + finalRoute.url + "?token=" + UserService.token();
					
					//Ajout de urlParams dans l'url
					if(parameter && typeof(parameter.urlParams) != 'undefined'){
						angular.forEach(parameter.urlParams, function(par, key){
							finalUrl += "&" + par[0] + "=" + par[1];	
						});	
					}			
				}
				//Attention pour le moment on ne peut pas envoyer de urlParams vers le WS (à implémenter!)
				else{
					var lang = UserService.lang();
					if(lang != null) finalUrl = finalRoute.url + "?lang=" + lang;
					else	finalUrl = finalRoute.url;
					
				}
			}
			//rootpath déja définit (cas googlemap)
			else{
				finalUrl = finalRoute.otherPath + finalRoute.url;

				//Ajout de urlParams dans l'url
				if(parameter && typeof(parameter.urlParams) != 'undefined'){
					angular.forEach(parameter.urlParams, function(par, key){

						if(key == 0){
							finalUrl += "?" + par[0] + "=" + par[1];
						}
						else{
							finalUrl += "&" + par[0] + "=" + par[1];
						}
							
					});	
				}
			}		
		//}

		return {"action" : finalRoute.action, "url" : finalUrl, "type" : finalRoute.type, "api" : finalRoute.api};	
	}
	
	var resetService = function(){
		finalRoute = {};
		finalUrl = null;
		parameter = null;
	}
	
	return {
		getRootPathAPI : function(){
			return rootPathAPI;
		},
		
		//Retourne "action" - "url" - "type"
		route : function(action, routes, params){
			//Paramètres
			parameter = params;
			
			//Route trouée
			if(searchRoute(action,routes)){
				//On vérifie s'il s'agit de l'aciton login pour ne pas initialiser Userservice
				if(action == "login")	var result = makeRoute(true);
				else 	result = makeRoute(false);
				resetService();
				return result;
			}
			//Route non trouvée
			else{
				resetService();
				return null;
			}
		}
	}
}])


/**
 *	TransportService 
 */
var transportService = ottercampservices.service('TransportService', ['$http','BroadcastFactory','$q', 'ErrorService',function($http,BroadcastFactory,$q,ErrorService){
	
		var successCallback = function(action, data){
			BroadcastFactory.broadcast(action, data);
		};
		
		var errorCallback = function(action, data,status){
			if(status=== 500){
		
			}
			else{
				BroadcastFactory.broadcast(action, data);
			}
		};
		
		var post = function(request, postParams){
			if(request.api){
				var customHeader = {headers:{"X-Requested-With": "", 'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}};
			}
			else{
				var customHeader = {headers:{"X-Requested-With": "XMLHttpRequest", 'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}}
			}
			if(typeof(postParams) != 'undefined'){
				var params = $.param(postParams);
			}
			else{
				var params = null;
			}
			return $http.post(request.url, params, customHeader).
				success(function(data, status, headers, config) {
					successCallback(request.action, data);
				}).
			    error(function(data, status, headers, config) {
			    	errorCallback(request.action, data,status);
			    });			
		};
		
		var postFile = function(request, postParams){
			var defered = $q.defer();

			$http({
	            method: 'POST',
	            url: request.url,
	            //IMPORTANT!!! You might think this should be set to 'multipart/form-data' 
	            // but this is not true because when we are sending up files the request 
	            // needs to include a 'boundary' parameter which identifies the boundary 
	            // name between parts in this multi-part request and setting the Content-type 
	            // manually will not set this boundary parameter. For whatever reason, 
	            // setting the Content-type to 'false' will force the request to automatically
	            // populate the headers properly including the boundary parameter.
	            headers: { 'Content-Type': false,"X-Requested-With": "" },
	            //This method will allow us to change how the data is sent up to the server
	            // for which we'll need to encapsulate the model data in 'FormData'
	           	
	            transformRequest: function (data) {
	            
	                var formData = new FormData();
	                //need to convert our json object to a string version of json otherwise
	                // the browser will do a 'toString()' on the object which will result 
	                // in the value '[Object object]' on the server.
	                //formData.append("model", angular.toJson(data.model));
	                angular.forEach(data.model, function(value,key){
	                	formData.append(key,value);
	                })
	                //now add all of the assigned files
	                /*
	                for (var i = 0; i < data.files; i++) {
	                    //add each file to the form data and iteratively name them
	                    formData.append("file" + i, data.files[i]);
	                }
	                */
	                formData.append("photo", data.files[0]);
	                return formData;
	            },
	            
	            //Create an object that contains the model and files which will be transformed
	            // in the above transformRequest method
	            data: { model: postParams.model, files: postParams.files }

	        }).
	        success(function (data, status, headers, config) {
	        	successCallback(request.action, data);    
	        	defered.resolve({data:data});
	        }).
	        error(function (data, status, headers, config) {
	       		errorCallback(request.action, data,status);
	       		defered.reject({data:data});
	        });
			return 	defered.promise;	
		};
		
		var get = function(request){				
			if(request.api || request.api == null){
				var customHeader = {headers:{"X-Requested-With": ""}};
			}
			else{
				var customHeader = {headers:{"X-Requested-With": "XMLHttpRequest"}}
			}

			return $http.get(request.url, customHeader).success(function(data, status, headers, config) {
			    	successCallback(request.action, data);
			    }).
			    error(function(data, status, headers, config) {
			    	errorCallback(request.action, data,status);
			    });
		}
		
		var jsonp = function(request){				
			request.url += "&callback=JSON_CALLBACK";
			return $http.get(request.url).success(function(data, status, headers, config) {
			    	successCallback(request.action, data);
			    }).
			    error(function(data, status, headers, config) {
			    	errorCallback(request.action, data,status);
			    });
		}
		
		var deleteRequest = function(request){
			if(request.api){
				var customHeader = {headers:{"X-Requested-With": "",'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}};
			}
			else{
				var customHeader = {headers:{"X-Requested-With": "XMLHttpRequest"}}
			}
			return $http.delete(request.url,customHeader).success(function(data, status, headers, config) {
			    	successCallback(request.action, data);
			    }).
			    error(function(data, status, headers, config) {
			    	errorCallback(request.action, data,status);
			    });
		}
		
		var putRequest = function(request, putParams){
			if(request.api){
				var customHeader = {headers:{"X-Requested-With": ""}};
			}
			else{
				var customHeader = {headers:{"X-Requested-With": "XMLHttpRequest", 'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}}
			}
			if(typeof(putParams) != 'undefined'){			
				var params = $.param(putParams);
			}
			else{
				var params = null;
			}
			return $http.put(request.url, params, customHeader).
			    success(function(data, status, headers, config) {
			    	successCallback(request.action, data);
			    }).
			    error(function(data, status, headers, config) {
			    	errorCallback(request.action, data,status);
			    });
		}
		
		var lastRequest;

    return{
		request : function(request, postParams){
			var deferred = $q.defer();
			
			var currentRequest = new Date().getTime();
			
			if(angular.isDefined(lastRequest) && (currentRequest - lastRequest < 600)){
				//console.log("!!!!!!!!!!LIMIT EXCEEDED!!!!!!!!!", (currentRequest - lastRequest))
			}
			
			lastRequest = currentRequest;

			if(request.type == "post"){				
				post(request, postParams).then(
					function(response){
						deferred.resolve(response)
					},
					function(response){
						deferred.reject(response)
					}
				);
			}
			else if(request.type == "postFile"){				
				postFile(request, postParams).then(
					function(response){
						deferred.resolve(response)
					},
					function(response){
						deferred.reject(response)
					}
				);
			}
			else if(request.type == "jsonp"){
				jsonp(request).then(
					function(response){
						deferred.resolve(response)
					},
					function(response){
						deferred.reject(response)
					}
				);
			}
			else if(request.type == "get"){
				get(request).then(
					function(response){
						deferred.resolve(response)
					},
					function(response){
						deferred.reject(response)
					}
				);
			}
			else if(request.type == "delete"){
				deleteRequest(request).then(
					function(response){
						deferred.resolve(response)
					},
					function(response){
						deferred.reject(response)
					}
				);
			}
			else if(request.type == "put"){
				putRequest(request, postParams).then(
					function(response){
						deferred.resolve(response)
					},
					function(response){
						deferred.reject(response)
					}
				);
			}
			else{					
				deferred.reject();
			}
			/*
			}
			else{
				console.log("errorcallback",request)
				ErrorService.showAlert("warning",[{message:"Vous envoyez des requêtes trop rapidement!"}])
				errorCallback(request.action,{});
				deferred.reject();
			}
			*/
			return deferred.promise;
		}
    }
}])

/**
 *	BrowserService 
 */
ottercampservices.service('BrowserService', ['ErrorService', function(ErrorService){
	var browser;
	var version;
	var OS;
	var BrowserDetect = {
		init: function () {
			browser = this.searchString(this.dataBrowser) || "An unknown browser";
			version = this.searchVersion(navigator.userAgent)
				|| this.searchVersion(navigator.appVersion)
				|| "an unknown version";
			OS = this.searchString(this.dataOS) || "an unknown OS";
		},
		searchString: function (data) {
			for (var i=0;i<data.length;i++)	{
				var dataString = data[i].string;
				var dataProp = data[i].prop;
				this.versionSearchString = data[i].versionSearch || data[i].identity;
				if (dataString) {
					if (dataString.indexOf(data[i].subString) != -1)
						return data[i].identity;
				}
				else if (dataProp)
					return data[i].identity;
			}
		},
		searchVersion: function (dataString) {
			var index = dataString.indexOf(this.versionSearchString);
			if (index == -1) return;
			return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
		},
		dataBrowser: [
			{
				string: navigator.userAgent,
				subString: "Chrome",
				identity: "Chrome"
			},
			{ 	string: navigator.userAgent,
				subString: "OmniWeb",
				versionSearch: "OmniWeb/",
				identity: "OmniWeb"
			},
			{
				string: navigator.vendor,
				subString: "Apple",
				identity: "Safari",
				versionSearch: "Version"
			},
			{
				prop: window.opera,
				identity: "Opera",
				versionSearch: "Version"
			},
			{
				string: navigator.vendor,
				subString: "iCab",
				identity: "iCab"
			},
			{
				string: navigator.vendor,
				subString: "KDE",
				identity: "Konqueror"
			},
			{
				string: navigator.userAgent,
				subString: "Firefox",
				identity: "Firefox"
			},
			{
				string: navigator.vendor,
				subString: "Camino",
				identity: "Camino"
			},
			{		// for newer Netscapes (6+)
				string: navigator.userAgent,
				subString: "Netscape",
				identity: "Netscape"
			},
			{
				string: navigator.userAgent,
				subString: "MSIE",
				identity: "Explorer",
				versionSearch: "MSIE"
			},
			{
				string: navigator.userAgent,
				subString: "Gecko",
				identity: "Mozilla",
				versionSearch: "rv"
			},
			{ 		// for older Netscapes (4-)
				string: navigator.userAgent,
				subString: "Mozilla",
				identity: "Netscape",
				versionSearch: "Mozilla"
			}
		],
		dataOS : [
			{
				string: navigator.platform,
				subString: "Win",
				identity: "Windows"
			},
			{
				string: navigator.platform,
				subString: "Mac",
				identity: "Mac"
			},
			{
				   string: navigator.userAgent,
				   subString: "iPhone",
				   identity: "iPhone/iPod"
		    },
			{
				string: navigator.platform,
				subString: "Linux",
				identity: "Linux"
			}
		]

	};
	BrowserDetect.init();
	console.log("version",version,'  OS:',OS, 'browser:',browser);
	//ErrorService.showAlert('warning', [{message: 'version:' + version +'  OS:' + OS + '  browser:' + browser}])
	return {

	}
}])

ottercampservices.service('FBUser', ['$log', '$rootScope', 'facebook', 'UserService','ErrorService','$filter',function ($log, $rootScope, facebook,UserService,ErrorService,$filter) {
	var that = this;

  	this.authorized = false;
  	
  	var permissions = 'email,read_friendlists,publish_actions,user_about_me';

	this.initFacebook = function(){
		facebook.FB.Event.subscribe('auth.authResponseChange', function (response) {
	    	$log.info("Event: auth.authResponseChange");
	    	if (response.authResponse) {
	      		if (response.status === 'connected') {
	        		// User logged in and authorized
	        		$log.info('User logged in and authorized');
			        $rootScope.$apply(function () {		        	
			          	that.authorized = true;
			        });
	        		// DO WORK
	        		//Connecter l'utilisateur autom.
			       
		     	}
		     	else if (response.status === 'not_authorized') {
			    	// User logged in but has not authorized app
			        $log.info('User logged in');
			        $rootScope.$apply(function () {
			        	that.authorized = false;
			        });
		      	}
		      	else {
			    	// User logged out
			        $log.info('User logged out');
			        $rootScope.$apply(function () {
			          that.authorized = false;
			        });
		      	}
			}
			else {
				$log.info('No valid authResponse found, user logged out');
		  		$rootScope.$apply(function () {
		   			that.authorized = false;
		  		});
		   	}
		});
	}

	this.register = function (success, fail) {
		console.log("register");
		//Début requêtes FB activer chargement du bouton
		$rootScope.$broadcast("FBloginning", false);
	    facebook.FB.login(function (response) {
			$rootScope.$apply(function () {
		        if (response.authResponse) {
		        	var facebookToken = response.authResponse.accessToken;
		        	var facebookId = response.authResponse.userID;
		        	FB.api('/me', function(response){
		        		response.facebookToken = facebookToken;
		        		response.facebookId = facebookId;

		        		//Stoper chargement du bouton
		        		$rootScope.$broadcast("FBloginning", response);
		        	});
		        } 
		        else {
		            console.log('Login unsuccessful');
		        }
	      	});
	    } ,{scope: permissions});
	};

	this.login = function (success, fail) {
		//Ajout du litenre FB de changement de statut
		this.initFacebook();
		
		console.log("login FB");
		//Début requêtes FB activer chargement du bouton
		$rootScope.$broadcast("FBloginning", false);
	    facebook.FB.login(function (response) {
			$rootScope.$apply(function () {
				console.log("ko");
		        if (response.authResponse) {
		        	//Stoper chargement du bouton + login
		        	$rootScope.$broadcast("FBloginning", response.authResponse.userID);		        	
		        } 
		        else {
		            console.log('Login unsuccessful');
		        }
	      	});
	    },{scope: permissions});
	};
	
	

  	this.logout = function () {
	    facebook.FB.logout(function () {
	      	$rootScope.$apply(function () {
	        	that.authorized = false;
	      	});
	    });
 	};
}]).service('facebook', ['$rootScope', '$window', function ($rootScope, $window) {
	this.askFacebookForAuthentication = function (fail, success) {
		console.log("askFacebookForAuthentication");
	    FB.login(function (response) {
			$rootScope.$apply(function () {
		        if (response.authResponse) {
		        	FB.api('/me', success);
		        } 
		        else {
		         	console.log('User cancelled login or did not fully authorize.');
		        }
	      	});
	    },{scope: permissions});
	};

  	this.getLoginStatus = function () {
  		console.log("getLoginStatus FB");
	    FB.getLoginStatus(function (response) {
	    	return response;
	    });
  	};

  	this.FB = $window.FB;

}])

.factory('MetaData', function(){
  var title = 'default Title';
  var description = 'default description';
  return {
    title: function() { return title; },
    description: function() { return description; },
    setTitle: function(newTitle) { title = newTitle; },
    setDescription: function(newDescription) { description = newDescription; }
  };
});