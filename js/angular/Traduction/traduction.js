angular.module('LocalizeMod', [])
.factory('localizeService', ['$http','$q','$log','$window','$locale', function($http, $q,$log,$window,$locale){
    var lastSearch;
    var self = {
    	//Langue par défaut
    	defaultLanguage : 'fr',
    	
    	languageType : 'default',
    	
    	//Paramètre la langue à utiliser
    	setLanguage: function(languageCode){
    		console.log("locale",$locale);
    		//Langue de l'utilisateur
    		if(angular.isDefined(languageCode) && languageCode){
    			self.languageType = "user";
                console.log("langue utilisateur",languageCode);
                self.getDictionnary(languageCode);
    		}
    		else{
    			//Langue navigateur
    			var browserLanguage = self.getBrowserLanguage();
    			//Si la langue a été récupérée et est supportée
    			if(angular.isDefined(browserLanguage) && angular.isDefined(self.languages[browserLanguage])){
    				self.languageType = "browser";
                    self.getDictionnary(browserLanguage);
    			}
    			//Prendre la langue par défaut
    			else{
                    self.getDictionnary(self.defaultLanguage);
    			}
    		}
    	},

        getDictionnary: function(language){
            switch(language){
                case "fr-fr":
                    self.language = "fr";
                    break;
                case "fr":
                    self.language = "fr";
                    break;
                case "en":
                    self.language = "en";
                    break;
                case "en-en":
                    self.language = "en";
                    break;
                default:
                    self.language = "fr";
                    break;
            }

        },
    	
    	//Récupérer la langue de l'utilisateur
    	getUserLanguage: function(){
    		var user = UserService.getUser();

    		if(angular.isDefined(user) && user != null && angular.isDefined(user.i18n) && angular.isDefined(user.i18n.language) && angular.isDefined(user.i18n.language.code)){
    			return user.i18n.language.code;
    		}
    		//Sinon récupérer la langue du navigateur
    		else{
    			return false;
    		}  		
    	},
    	//Récupérer la langue du navigateur
    	getBrowserLanguage: function(){
    		return $window.navigator.language;
    	},
        languages: {
            // http://en.wikipedia.org/wiki/ISO_3166-1
            "en": {iso: "en", separator: { decimal: ".", thousand: "," }, priceSuffix: ".-"},
            "fr": {iso: "fr", separator: { decimal: ".", thousand: "," }, priceSuffix: ".-"}
        },
        dictionary: {},
        isLoading: false,

        switchLanguage: function(language){
            self.language = language;
            self.loadResource();
        },

        getLanguage: function(){
            return self.language;
        },

        getLanguages: function(){
            return self.languages;
        },

        loadResource: function(){
            var deferred = $q.defer();

            if (!self.dictionary[self.language] && !self.isLoading ) {
          		if(lastSearch != self.language){
	                self.isLoading=true;
					lastSearch = self.language;
	                $http.get(Config.traductionURL  + self.language+".js").then(
	                    function(data) {                      
	                        self.dictionary[self.language] = data.data[self.language];                      
	                        self.isLoading=false;
	                        //deferred.resolve();
	                        console.log("traduction récupérées")
	                    },
	                    function(error) {
	                        self.dictionary = {};
	                        self.isLoading=false;
	                        self.switchLanguage("FR");
	                        deferred.resolve();
	                    }
	                );
	             }
	             else{
	             	$log.error("Traduciton: fichier langue corrompu!")
	             	deferred.reject();
	             }   
            }
            else {
            	console.log("case else")
                deferred.resolve();
            }

            return deferred.promise;
        },

        getTranslation: function(key){
			//Si un language est présent
			if(angular.isDefined(self.language)){
				var translation;
	            if (!self.dictionary[self.language]) {
					console.log("LOCALIZE NOT READY")
					//self.loadResource();
	            }
	            else {
	                translation = self.dictionary[self.language][key];
	                if (!translation){
	                    $log.error("Traduction introuvable", key)
	                    translation = key;
	                }
	            }
	            return translation;
	        }    
        }
    };   

    return self;
}])
.filter('trad', ['localizeService', function(Localize){
    return function(input){
        return Localize.getTranslation(input);
    };
}]);

