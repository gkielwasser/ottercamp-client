'use strict';
//App loader
var rootPath = "";
var ottercamp = angular.module('ottercamp',
	['mEvent.directives',
	'BadgesCtrl',
	'MetaCtrl',
	'AboutCtrl',
	'LocalizeMod',
	'Search',
	'Hobbies',
	'Talents',
	'PaymentCtrl',
	'hovercards.directives',
	'notifications.directives',
	'ContactCtrl',
	'ConfirmCtrl',
	'geolocPicker.directives',
	'map.directives',
	'mAdministrate.directives',
	'$strap.directives',
	'ngCookies',
	'http-auth-interceptor',
	'ottercamp.services',
	'mainCtrl',
	'ParameterCtrl',
	'SearchCtrl',
	'LoginCtrl',
	'RegisterCtrl',
	'AddEvent', 
	'ShowEventCtrl',
	'DiscoverCtrl',
	'ProfileCtrl', 
	'userBox.directives',
	'MapCtrl',
	'jquery.directives',
	'PasswordCtrl',
	'Inbox',
	'ui.state',
	'richTextEditor',
	'filters',
	'OrganizationCtrl',
	'ui',
	'Communities',
	'AdministrateOrganizationsMod'
	]).
    config(['$routeProvider','$locationProvider', '$stateProvider', '$urlRouterProvider','$provide',function($routeProvider,$locationProvider,$stateProvider,$urlRouterProvider,$provide) {
       
       /* SEO
       $provide.decorator('$sniffer', function($delegate) {
		  $delegate.history = false;
		  return $delegate;
		});
       */ 
       
       
        
        //Map (index)
        
        $stateProvider.state('discover', {
	    	url: "",
            templateUrl: Config.templatesPublicURL + 'discover/discover.html',
            controller: "MapCtrl",
            resolve: mapCtrl.resolve,
            reloadOnSearch:false,
            auth: false 
        });
        
        $stateProvider.state('discover2', {
	    	url: "/",
            templateUrl: Config.templatesPublicURL + 'discover/discover.html',
            controller: "MapCtrl",
            resolve: mapCtrl.resolve,
            reloadOnSearch:false,
            auth: false 
        });
        
        //Badge
        $stateProvider.state('badges',{
	    url: '/badges/:badgeId',
            templateUrl: Config.templatesPublicURL + 'badges/badge.html',
            controller: "BadgesCtrl",
            resolve: BadgesCtrl.resolve,	
            auth: false
        })

        /**
         * Evenements 
         */
        $stateProvider.state('event', {
			url:'/events/{eventId}{title:(?:/[^/]+)?}', 
			           
			templateUrl: Config.templatesPublicURL + 'events/event.html',
			abstract: true,
            controller: "ShowEventCtrl",
            resolve: ShowEventCtrl.resolve,	
            auth: false  
        });
        
        $stateProvider.state('event.general', {
			url:'',            
			templateUrl: Config.templatesPublicURL + 'events/includes/general.html',
			controller: 'EventsGeneralCtrl',
            auth: false  
        });
        
        $stateProvider.state('event.settings', {
			url:'/settings',            
			templateUrl: Config.templatesPublicURL + 'events/includes/settings.html',
			controller: 'EventsSettingsCtrl',
            auth: false  
        });
        
		$stateProvider.state('event.participations', {
			url:'/participations',        
			templateUrl:Config.templatesPublicURL +'events/includes/participants.html',    	
			controller: 'EventsParticipationsCtrl',
            auth: true  
        });

		$stateProvider.state('event.photos', {
			url:'/photos',            
			templateUrl: Config.templatesPublicURL + 'events/includes/photos.html',
			controller: 'EventsPhotosCtrl',
            auth: false  
        });
        
		/**
		 * Profile 
		 */
		$stateProvider.state('profile', {
			url: '/users/:userId',
            templateUrl: Config.templatesPublicURL + 'users/user.html',
            controller: "ProfileCtrl",
            resolve: ProfileCtrl.resolve,
            abstract: true,	
            auth: false  
        });
        
        $stateProvider.state('profile.general', {
			url: '',
            templateUrl: Config.templatesPublicURL + 'users/includes/general.html',	
            auth: false  
        });
        
        $stateProvider.state('profile.communities', {
			url: '/communities',
            templateUrl: Config.templatesPublicURL + 'users/includes/communities.html',
            controller:'ProfileCommunitiesCtrl',
            auth: true  
        });
        
        $stateProvider.state('profile.comments', {
			url: '/comments',
            templateUrl: Config.templatesPublicURL + 'users/includes/comments.html',
            controller:'ProfileCommentsCtrl',
            auth: true  
        });
        
        $stateProvider.state('profile.events', {
			url: '/events',
            templateUrl: Config.templatesPublicURL + 'users/includes/events.html',
            controller: 'ProfileEventsCtrl',
            auth: true 
        });
        
        $stateProvider.state('profile.photos', {
			url: '/photos',
            templateUrl: Config.templatesPublicURL + 'users/includes/photos.html',
            controller: 'ProfilePhotosCtrl',
            auth: true  
        });
        
        $stateProvider.state('administrateOrganizations', {
			url: '/organizations',
            templateUrl: Config.templatesPublicURL + 'organizations/administrateOrganizations.html',
            controller: "AdministrateOrganizationsCtrl",
            resolve: AdministrateOrganizationsCtrl.resolve,
            auth: true  
        });

        $stateProvider.state('organization', {
			url: '/organizations/:id',
            templateUrl: Config.templatesPublicURL + 'organizations/organizations.html',
            controller: "OrganizationCtrl",
            resolve: OrganizationCtrl.resolve,
            abstract: true,	
            auth: true  
        });
        
        $stateProvider.state('organization.general', {
			url: '',
            templateUrl: Config.templatesPublicURL + 'organizations/includes/general.html',
            controller:'OrganizationGeneralCtrl',
            auth: false  
        });
        
        $stateProvider.state('organization.administrators', {
			url: '/administrators',
            templateUrl: Config.templatesPublicURL + 'organizations/includes/administrators.html',
            controller:'OrganizationAdministratorsCtrl',
            auth: true  
        });
        
        $stateProvider.state('organization.settings', {
			url: '/settings',
            templateUrl: Config.templatesPublicURL + 'organizations/includes/settings.html',
            controller:'OrganizationSettingsCtrl',
            auth: true  
        });
        
          
        //AddEvent
        $stateProvider.state('addEvent', {
            url: '/addEvent',
            templateUrl: Config.templatesPublicURL + 'events/add.html',
            controller: "AddEventCtrl",
            resolve: AddEventCtrl.resolve,
            auth: true  
        });
 	    
        //Notifications
        $stateProvider.state('notifications', {
            url : '/notifications',
	    	templateUrl: Config.templatesPublicURL + 'notifications/notifications.html',
            controller: "NotificationsCtrl",
            auth: true   
        });
        
        //Inbox
        $stateProvider.state('inbox', {
        	url: '/conversations',
            templateUrl: Config.templatesPublicURL + 'conversations/conversations.html',
            controller: "InboxCtrl",
            onEnter : function(){
            	console.log("enter in inbox")
            },
            resolve: {	
				Conversations: function(UserService,InboxService,$q,$rootScope,ErrorService){				
					$rootScope.loading = true;
					var defered = $q.defer();
					
					if(UserService.isLoggedIn()){
						InboxService.getConversations().then(
							function(data){
								if(angular.isUndefined(data.errors)){
									$rootScope.loading = false;
									defered.resolve(data);
								}
								else{
									ErrorService.showAlert("error",data.errors)
								}
							}
						)		
					}
					else{
						$rootScope.loading = false;
						$location.path("/login");
					}					
					return defered.promise;
				}
			},
            auth: true,
            abstract:true 
        });
        
        $stateProvider.state('inbox.loader', {
            auth: true ,
            url: '/',
            controller: 'InboxLoaderCtrl'
        });
       
        $stateProvider.state('inbox.detail', {
            auth: true ,
            url: '/:convId/messages',
            controller: 'InboxDetailCtrl',
        	templateUrl: Config.templatesPublicURL + 'conversations/includes/conversation.html'
        });   
   
        
        //Login
        $stateProvider.state('login', {
	    	url : '/login',            
            templateUrl: Config.templatesPublicURL + 'users/login.html',
            controller: "LoginCtrl",
            auth: false   
        });
        
        //Register
        $stateProvider.state('register', {
            url:'/register',
            templateUrl: Config.templatesPublicURL + 'users/register.html',
            controller: "RegisterCtrl",
            auth : false
        });
        
        //Search
        $stateProvider.state('search', {
	    	url: '/search/:kind/:keyword',
            templateUrl: Config.templatesPublicURL + 'search/search.html',
            controller: "SearchCtrl",
            reloadOnSearch:false,
            auth: false  
        });
        
        //Confirmation compte
        $stateProvider.state('confirmation', {
	    	url: '/confirm/:id/:code/:token',
            controller: "ConfirmCtrl",
            templateUrl: Config.templatesPublicURL + 'users/confirm.html',
            auth: false  
        });      
        
        //Oubli mot de passe
        $stateProvider.state('forgottenPassword', {
			url:'/forgottenPassword',
        	templateUrl: Config.templatesPublicURL + 'password/forgotten.html',
        	controller: "PasswordCtrl",
            auth: false  
        })
        
        //Changement mot de passe
        $stateProvider.state('changePasswordForgotten', {
            url: '/password/:id/:pwdToken',
        	templateUrl: Config.templatesPublicURL + 'password/forgottenChange.html',
        	controller: "PasswordCtrl",
            auth: false  
        })
        
        //Changement mot de passe
        $stateProvider.state('changePassword', {
            url:'/settings/password',
        	templateUrl: Config.templatesPublicURL + 'password/change.html',
        	controller: "PasswordCtrl",
        	auth: false  
        })

        $stateProvider.state('about', {
	    	url:'/about',
	    	templateUrl: Config.templatesPublicURL + 'about/about.html',
	    	abstract:true
        });
        
        //A Propos
        $stateProvider.state('about.about', {
	    	url:'',
            templateUrl: Config.templatesPublicURL + 'about/includes/ottercamp.html',
            controller:"AboutCtrl",
            auth: false  
        });
        
        //Team
        $stateProvider.state('about.press', {
	    	url:'/press',
            templateUrl: Config.templatesPublicURL + 'about/includes/press.html',
            auth: false  
        });
        
        //Team
        $stateProvider.state('about.team', {
	    	url:'/team',
            templateUrl: Config.templatesPublicURL + 'about/includes/team.html',
            auth: false  
        });
        
        //Contact
        $stateProvider.state('about.contact', {
            url:'/contact',
            templateUrl: Config.templatesPublicURL + 'about/includes/contact.html',
            controller: 'ContactCtrl',
            auth: false  
        });
        
        //policies
        $stateProvider.state('about.policies', {
            url: '/policies',
            templateUrl: Config.templatesPublicURL + 'about/includes/policies.html',
            auth: false  
        });
        
        //privacy
        $stateProvider.state('about.privacy', {
            url: '/privacy',
            templateUrl: Config.templatesPublicURL + 'about/includes/privacy.html',
            auth: false  
        });
        
        //faq
        $stateProvider.state('about.help', {
            url: '/help',
            templateUrl: Config.templatesPublicURL + 'about/includes/help.html',
            auth: false  
        });
        
        //credits
        $stateProvider.state('about.credits', {
            url: '/credits',
            templateUrl: Config.templatesPublicURL + 'about/includes/credits.html',
            auth: false  
        });

		$stateProvider.state('payment', {
            url: '/payments', 
            templateUrl: Config.templatesPublicURL +'payments/payment.html',
	    	abstract: true
        });
        
        //Cartes
        $stateProvider.state('payment.cards', {
  			url:'/cards',            
			templateUrl: Config.templatesPublicURL + 'payments/includes/cards.html',
            controller: 'PaymentCardsCtrl',
            auth: true  
        });
        
        //Comptes
        $stateProvider.state('payment.beneficiaries', {
			url:'/beneficiaries',	            
			templateUrl: Config.templatesPublicURL + 'payments/includes/beneficiaries.html',
            controller: 'PaymentBeneficiariesCtrl',
            auth: true  
        });
        
        //Transactions
        $stateProvider.state('payment.operations', {
			url:'/operations',            
			templateUrl: Config.templatesPublicURL + 'payments/includes/operations.html',
            controller: "PaymentOperationsCtrl",
            auth: true
        });

		$stateProvider.state('settings', {
	    	url:'/settings',
	    	templateUrl: Config.templatesPublicURL +'settings/settings.html',
            abstract:true  
        });
	
        //Parameter
        $stateProvider.state('settings.parameters', {
	    	url:'',
            templateUrl: Config.templatesPublicURL + 'settings/includes/settings.html',
            controller: "ParameterCtrl",
            auth: true  
        });
      
        //Hobbies
        $stateProvider.state('settings.hobbies', {
			url:'/hobbies',            
			templateUrl: Config.templatesPublicURL + 'settings/includes/hobbies.html',
            controller: "HobbiesCtrl",
            auth: true
        });
        
         //Talents
        $stateProvider.state('settings.talents', {
			url:'/talents',            
			templateUrl: Config.templatesPublicURL + 'settings/includes/talents.html',
            controller: "TalentsCtrl",
            auth: true
        });	
        
         //Communauté
        $stateProvider.state('settings.communities', {
			url:'/communities',            
			templateUrl: Config.templatesPublicURL + 'settings/includes/communities.html',
            controller: "CommunitiesCtrl",
            auth: true
        });	

        //Erreur interne
        $stateProvider.state('500', {
			url:'/500',            
			templateUrl: Config.templatesPublicURL + 'errors/500.html',
            auth: false
        });
        
        //Erreur page non trouvée
        $stateProvider.state('404', {
			url:'/404',            
			templateUrl: Config.templatesPublicURL + 'errors/404.html',
            auth: false
        });
        
        //Maintenance
        $stateProvider.state('maintenance', {
			url:'/maintenance',            
			templateUrl: Config.templatesPublicURL + 'errors/maintenance.html',
            auth: false
        });
        
		$stateProvider.state('otherwise', {
			url:'/404',            
			templateUrl: Config.templatesPublicURL + 'errors/404.html',
            auth: false
        });
        
        $urlRouterProvider.otherwise('/404');
        
       //SEO
       //$locationProvider.html5Mode(true).hashPrefix('!');
}])

.run(['$rootScope', '$location', 'UserService','$route', '$q','$window','config',function ($rootScope, $location, UserService,$route,$q,$window,config) {		

		$rootScope.Config = config;
		
		$rootScope.isLoggedIn = function(id){
			return (UserService.isLoggedIn())? true:false;
		}
		
		console.log("CONFIIIG",config)
		$rootScope.waiting = false;
		if(user){
			//Chargement de l'utilisateur dans le service
			UserService.loadUser($.parseJSON(user));
		}
		else{
			console.log("NO USER");
			UserService.setLanguage()
		}		
		
		//Ignorer le premier événement $routeChangeStart
		var ignoreFirst = false;
		
		//Dernière page non autorisée
		var previousPage;
		
		$rootScope.$on('event:auth-loginConfirmed',function(){
			$location.path(previousPage).replace();
		})

        $rootScope.appInitiated = true;
        $rootScope.showNav = true;
        
        //Modification de la balise title
        $rootScope.updateTitle = function(count, type){      
        	if(type == "notifications"){
        		$rootScope.countNotifications = count;
        	}	
        	else{
        		$rootScope.countMessages = count;
        	}
        	if(($rootScope.countNotifications + $rootScope.countMessages) > 0){
        		$rootScope.titleNotifications = '(' + ($rootScope.countNotifications + $rootScope.countMessages) +  ')';
        	}
        	else{
        		$rootScope.titleNotifications = "";
        	}       	
        }

        $rootScope.$on("$stateChangeStart", function (event, next, current) {
        	//$scope.cnext = next;
			//console.log(event,next,current)
            if(next.auth && !UserService.isLoggedIn()){
                //$location.path("/login").replace();
                previousPage = $location.path();
                $location.url("/login")
                event.preventDefault();
            }
        })
        
        //Validation formulaire
        $rootScope.csValidate = function(formSent,error,pristine,tot){     	
			return ((formSent && error) || error && !pristine) ? true:false;
		}
		
		//Validation mots de passes équivalents
		$rootScope.checkPasswords =  function(p1,p2){
			if(angular.isDefined(p1) && angular.isDefined(p2) && (p1!=p2)){
				$rootScope.matchingPasswords = false;
			}
			else{
				$rootScope.matchingPasswords = true;
			}
		}
		
		//GoogleAnalytics
		$rootScope.$on('$routeChangeSuccess', function(event) {
		    $window._gaq.push(['_trackPageview', $location.path()]);
		});
		
		//Url avec titre de l'événement
		$rootScope.cleanUrl = function(url){
			if(angular.isDefined(url))return url.toLowerCase().replace(/ /g,'-');
		}
		
		$rootScope.waiting = false;
}]);

/**
 * Messages 
 */
angular.module('ottercamp').value("refreshMessagesDelay", 60000); //Rafraichissement des messages delay

/**
 * Notifications
 */
angular.module('ottercamp').value("refreshNotificationDelay", 60000); //Rafraichissement des notifications delay


/**
 * Commentaires
 */
ottercamp.value("refreshCommentsDelay", 9000); //Rafraichissement des commentaires delay


/**
 * Recherche (directive)
 */
ottercamp.value("searchBetweenFrapsDelay", 800); //Temps entre les frappes de la recherches

ottercamp.value("searchTimeBeforeSearch", 400); //Temps au out du quel on effectue la recherche

ottercamp.value("searchMinLengthWord", 2); //Longueur min des mots de la recherche

/**
 * Map
 */
ottercamp.value("popoverTimeBeforeHide",100); //Temps que met le popover des événements de la carte à disparaitre

ottercamp.value("config",Config)

/*
 * Price
 */
ottercamp.value("eventPriceLimit", 2000); //Limite pour le prix d'un événement

/**
 * Tags 
 */
ottercamp.value("eventTagsLimit", 5); //Limite tag ajout événement

ottercamp.value("memberTagsLimit", 10); //Limite tag suivre tags

/**
 * Evenements 
 */
ottercamp.value("nearParticipation", 86400000);
