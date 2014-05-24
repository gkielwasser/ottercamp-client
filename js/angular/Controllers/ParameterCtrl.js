'use strict'

var parameterctrlmodule = angular.module('ParameterCtrl',[]);

var parameterctrl = parameterctrlmodule.controller('ParameterCtrl', ['$scope','UserService','RouteService','GooglemapService','ErrorService', '$filter','$anchorScroll','$location',function($scope,UserService,RouteService,GooglemapService,ErrorService,$filter,$anchorScroll,$location){
	$scope.loading = true;
	$scope.initSettings = function(){
		if(angular.isDefined(UserService.getUser())){
	        console.log("init ParameterCtrl");
	        
	        //Récérer les infos actuelles
	        UserService.getParameter();
	        
	        //Récupérer les langues disponibles
	        $scope.languageList = UserService.languages();
	        
	        //Récupérer les tranches d'âges
	        $scope.ageBracketList = UserService.ageBrackets();
	
	        $scope.editPassword = false;
	        
	        //Formulaire déja soumirs une fois
	        $scope.formSent = false;
	        
	        $scope.myAddress = true;
		}        
    }

    $scope.initSettings();
    
    $scope.submit = function(){
    	angular.forEach($scope.mySettingsForm, function(value,key){
    		if(value == ""){
    			console.log("value vide",value,key,$scope.mySettingsForm);
    			delete $scope.mySettingsForm.key;
    		}
    	})
    	console.log("final form",$scope.mySettingsForm);
    	$scope.formSent = true;
    	
    	//Suppression des talents
		if(angular.isDefined($scope.mySettingsForm.talents)){
			delete $scope.mySettingsForm.talents;
		}
    	
    	//Suppression du champs address
    	if(angular.isDefined($scope.mySettingsForm.address)){
    		delete $scope.mySettingsForm.address;
    	}
		
		//Suppression des hobbies
		if(angular.isDefined($scope.mySettingsForm.hobbies)){
			delete $scope.mySettingsForm.hobbies;
		}
		
		//Suppression des champs badges
		if(angular.isDefined($scope.mySettingsForm.badges)){
			delete $scope.mySettingsForm.badges;
		}
		console.log("missing fields",$scope.currentPlace,$scope)
    	if($scope.settingsForm.$valid && ($scope.search != "")){	
    		//Suppression des éventuelles notifications
			ErrorService.hideAlert();
    		
			//Si le mot de passe à été modifié
			if($scope.editPassword && $scope.password1 != "" && angular.isDefined($scope.password1)){
				//Sha1 su le passwd
				$scope.mySettingsForm.password = $.sha1($scope.password1);
			}
			
			//Si l'addresse à été renseignée
			if(angular.isDefined($scope.search) && $scope.search != ""){
				console.log("formatedaddress",$scope.formatedAddress,$scope.currentPlace)
				if(angular.isDefined($scope.formatedAddress)){
					$scope.setFormatedAddress($scope.mySettingsForm);
					$scope.sending = true;
					UserService.updateParameter($scope.mySettingsForm).then(
						function(data){
							$scope.onUpdateParameter(data);
						}
					)
				}
				else{
					$scope.addressErrors = true;
					delete $scope.formatedAddress;
    				$scope.initPicker();
				}
			}
			else{
				$scope.mySettingsForm.country = "";
				$scope.sending = true;
				UserService.updateParameter($scope.mySettingsForm).then(
					function(data){
						$scope.onUpdateParameter(data);
					}
				)
			}
		}	
		else{
	    	//Afficher un message de notification & remonter en haut de la page
    		ErrorService.showAlert("error",[{message: $filter('trad')('error_form')}])
  			$anchorScroll();
	    }
    } 
    
    $scope.onUpdateParameter = function(data){
    	if(angular.isUndefined(data.errors)){
    		//MAJ paramètre
    		UserService.loadUser(data.member, true);
    		
			$scope.updateForm(data.member);
			
			//Affichage message succès
    		ErrorService.showAlert('success', [data.success])	
    	}
    	else{  		
    		ErrorService.showAlert('error', data.errors)
    	}	
    	
    	$scope.sending = false;
    }
    
    $scope.setFormatedAddress = function(form){
    	if(angular.isDefined($scope.formatedAddress)){
    		angular.forEach($scope.formatedAddress, function(value,key){
    			
    			if(angular.isDefined(value) && value != "") form[key] = value;
    		})
    	}
    	console.log("form",form)
    }
    
    $scope.getParameter = function(){
    	UserService.getParameter();
    }
    
    $scope.isPasswordRequired = function(){
    	if($scope.editPassword && $scope.password1 != "" && angular.isDefined($scope.password1)){
    		return true;
    	}
    	else return false;
    }
    
    //Récupère latitude, longitude, address, ville, codepostal, pays
    $scope.getGeoloc = function(){
    	GooglemapService.getGeoloc([["address", $scope.search], ["sensor", false]]);
    }
    
    //Remplissage du formulaire
    $scope.updateForm = function(data){
    	//Récupération des champs nécessaires pour le formulaire
			$scope.mySettingsForm = {};
			$scope.mySettingsForm.id = data.id;
    		$scope.mySettingsForm.name = data.name;
    		$scope.mySettingsForm.lastName = data.lastName;  		
    		$scope.mySettingsForm.photo = data.photo;
    		$scope.mySettingsForm.email = data.email;
    		$scope.mySettingsForm.phone = data.phone;
    		$scope.mySettingsForm.smallPhoto = data.smallPhoto;
    		$scope.mySettingsForm.description = data.description;
    		  		
    		if(angular.isDefined(data.i18n) && angular.isDefined(data.i18n.language)){
    			$scope.mySettingsForm.language = data.i18n.language.code;
    		}  
    		
    		if(data.ageBracket != null){
    			$scope.mySettingsForm.ageBracket = data.ageBracket.abbreviation;	
    		} 	
    		
    		if(angular.isDefined(data.address) && angular.isDefined(data.address.label)){
    			$scope.formatedAddress = {}
    			$scope.search = data.address.label;
    			  			
				var address = data.address;
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
    }

    //Réception d'un user
    $scope.$on("getParameter", function(action, data){
    	if(angular.isUndefined(data.errors)){
    		$scope.loading = false;
        	//Formulaire déja soumirs une fois
        	$scope.formSent = false;
        	
        	//Maj formulaire
        	$scope.updateForm(data);
        }
    });
    
}])

