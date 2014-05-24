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
	'cards.directives',
	'notifications.directives',
	'ContactCtrl','ConfirmCtrl',
	'mParticipant.directives',
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
	'ui.state'
	]).
    config(['$routeProvider','$locationProvider', '$stateProvider', function($routeProvider,$locationProvider,$stateProvider) {
        //Map (index)
        $routeProvider.when('/', {
            templateUrl: Config.templatesPublicURL + 'discover/discover.html',
            controller: "MapCtrl",
            resolve: mapCtrl.resolve,
            reloadOnSearch:false,
            auth: false 
        });
        
        //Badge
        $routeProvider.when('/badges/:badgeId',{
        	templateUrl: Config.templatesPublicURL + 'badge.html',
            controller: "BadgesCtrl",
            resolve: BadgesCtrl.resolve,	
            auth: false
        })

        //Event
        $routeProvider.when('/events/:eventId', {
            templateUrl: Config.templatesPublicURL + 'events/event.html',
            controller: "ShowEventCtrl",
            resolve: ShowEventCtrl.resolve,	
            auth: false  
        });
        
        
        //Event
        $routeProvider.when('/events/:eventId/:page', {
            templateUrl: Config.templatesPublicURL + 'events/event.html',
            controller: "ShowEventCtrl",
            resolve: ShowEventCtrl.resolve,	
            auth: true  
        });
          
        //AddEvent
        $routeProvider.when('/addEvent', {
            templateUrl: Config.templatesPublicURL + 'events/add.html',
            controller: "AddEventCtrl",
            resolve: AddEventCtrl.resolve,
            auth: true  
        });
 	
        //Profile
        $routeProvider.when('/users/:userId', {
            templateUrl: Config.templatesPublicURL + 'profile/profile.html',
            controller: "ProfileCtrl",
            resolve: ProfileCtrl.resolve,	
            auth: false  
        });
        
        //Profile
        $routeProvider.when('/users/:userId/:page', {
            templateUrl: Config.templatesPublicURL + 'profile/profile.html',
            controller: "ProfileCtrl",
            resolve: ProfileCtrl.resolve,	           
            auth: true   
        });
        
        //Notifications
        $routeProvider.when('/notifications', {
            templateUrl: Config.templatesPublicURL + 'notifications/notifications.html',
            controller: "NotificationsCtrl",
            auth: true   
        });
        
        //Inbox
        $routeProvider.when('/inbox', {
            templateUrl: Config.templatesPublicURL + 'inbox/inbox.html',
            controller: "InboxCtrl",
            resolve: InboxCtrl.resolve,
            auth: true   
        });
        
        //Login
        $routeProvider.when('/login', {
            templateUrl: Config.templatesPublicURL + 'login.html',
            controller: "LoginCtrl",
            auth: false   
        });
        
        //Register
        $routeProvider.when('/register', {
            templateUrl: Config.templatesPublicURL + 'register.html',
            controller: "RegisterCtrl",
            auth : false
        });
        
        //Search
        $routeProvider.when('/search/:keyword', {
            templateUrl: Config.templatesPublicURL + 'search/search.html',
            controller: "SearchCtrl",
            reloadOnSearch:false,
            auth: false  
        });
        
        //Confirmation compte
        $routeProvider.when('/confirm/:id/:code/:token', {
            controller: "ConfirmCtrl",
            templateUrl: Config.templatesPublicURL + 'profile/confirm.html',
            auth: false  
        });
        
        //Parameter
        $routeProvider.when('/settings', {
            templateUrl: Config.templatesPublicURL + 'settings/settings.html',
            controller: "ParameterCtrl",
            auth: true  
        });
        
        //Oubli mot de passe
        $routeProvider.when('/forgottenPassword', {
        	templateUrl: Config.templatesPublicURL + 'password/forgotten.html',
        	controller: "PasswordCtrl",
            auth: false  
        })
        
        //Changement mot de passe
        $routeProvider.when('/settings/password/:id/:pwdToken/:token', {
        	templateUrl: Config.templatesPublicURL + 'password/change.html',
        	controller: "PasswordCtrl",
            auth: false  
        })
        
        //Changement mot de passe
        $routeProvider.when('/settings/password', {
        	templateUrl: Config.templatesPublicURL + 'password/change.html',
        	controller: "PasswordCtrl",
        	auth: false  
        })
        
        //A Propos
        $routeProvider.when('/about', {
            templateUrl: Config.templatesPublicURL + 'about/ottercamp.html',
            controller:"AboutCtrl",
            auth: false  
        });
        
        //Team
        $routeProvider.when('/about/team', {
            templateUrl: Config.templatesPublicURL + 'about/team.html',
            auth: false  
        });
        
        //Contact
        $routeProvider.when('/about/contact', {
            templateUrl: Config.templatesPublicURL + 'about/contact.html',
            controller: 'ContactCtrl',
            auth: false  
        });
        
        //policies
        $routeProvider.when('/about/policies', {
            templateUrl: Config.templatesPublicURL + 'about/policies.html',
            auth: false  
        });
        
        //privacy
        $routeProvider.when('/about/privacy', {
            templateUrl: Config.templatesPublicURL + 'about/privacy.html',
            auth: false  
        });
        
        //faq
        $routeProvider.when('/about/help', {
            templateUrl: Config.templatesPublicURL + 'about/help.html',
            auth: false  
        });
        
        //Cartes
        $routeProvider.when('/payments/cards', {
            templateUrl: Config.templatesPublicURL + 'payment/cards.html',
            controller: 'PaymentCtrl',
            auth: true  
        });
        
        //Comptes
        $routeProvider.when('/payments/beneficiaries', {
            templateUrl: Config.templatesPublicURL + 'payment/beneficiaries.html',
            controller: 'PaymentCtrl',
            auth: true  
        });
        
        //Transactions
        $routeProvider.when('/payments/operations', {
            templateUrl: Config.templatesPublicURL + 'payment/operations.html',
            controller: "PaymentCtrl",
            auth: true
        });
      
        //Hobbies
        $routeProvider.when('/settings/hobbies', {
            templateUrl: Config.templatesPublicURL + 'settings/hobbies.html',
            controller: "HobbiesCtrl",
            auth: true
        });
        
         //Talents
        $routeProvider.when('/settings/talents', {
            templateUrl: Config.templatesPublicURL + 'settings/talents.html',
            controller: "TalentsCtrl",
            auth: true
        });
        
        //Erreur interne
        $routeProvider.when('/500/', {
            templateUrl: Config.templatesPublicURL + 'errors/500.html',
            auth: false
        });
        
        //Erreur page non trouvée
        $routeProvider.when('/404', {
            templateUrl: Config.templatesPublicURL + 'errors/404.html',
            auth: false
        });
        
        //Maintenance
        $routeProvider.when('/maintenance', {
            templateUrl: Config.templatesPublicURL + 'errors/maintenance.html',
            auth: false
        });
        
        //Otherwise
        $routeProvider.otherwise( {
            templateUrl: Config.templatesPublicURL + 'errors/404.html',
            auth : false
        });
}])

.run(['$rootScope', '$location', 'UserService','$route', '$q','$window','config',function ($rootScope, $location, UserService,$route,$q,$window,config) {		
		$rootScope.Config = config;
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
        
        $rootScope.$on("$locationChangeStart", function(event,next,current){
        	
        	//console.log("LOCATIONCHANGE",event,next,$route,$route.routes);
        	//event.preventDefault();
        })
        
        $rootScope.$on("$routeChangeSuccess", function(event,next,current){
        	//console.log("routechangesucess*****************",event,next,current);
        })
        
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
        	//$scope.cnext = next;

            if(next.auth && !UserService.isLoggedIn() && next.pathParams.page != "photos"){
                //$location.path("/login").replace();
                previousPage = $location.path();
                $location.url("/login")
                event.preventDefault();
            }

        	/*
        	if($location.path().split("/")[1] == "events"){
        		console.log("page event",event)	;
        		$rootScope.meta = {
        			ap_id: "125408324323674",
        			type: "ottercamp:event",
        			url: "",
        			title: "événement",
        			image: "monimages.png"
        		}
        	}	
        	else{
        		$rootScope.meta = {}
        	}
        	*/
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
		
		$rootScope.waiting = false;
}]);

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
