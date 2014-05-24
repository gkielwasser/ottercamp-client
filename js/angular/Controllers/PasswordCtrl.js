'use strict'

var passwordModule = angular.module('PasswordCtrl',[]);

var passwordCtrl = passwordModule.controller('PasswordCtrl', ['$scope','PasswordService', 'ErrorService','$stateParams','$location','UserService', '$filter', function($scope,PasswordService,ErrorService, $stateParams,$location,UserService,$filter){
	$scope.init = function(){
		console.log("init PasswordCtrl");
		$scope.formSent = false;
		
		//Si utilisateur non connecté : doit avoir 3 paramètres
		if(!UserService.isLoggedIn() && (angular.isUndefined($stateParams.id) || angular.isUndefined($stateParams.pwdToken))){
			//Redirection page login
			$location.path("/login").replace();
		}
		//Raz password
		else if(angular.isDefined($stateParams.id) && angular.isDefined($stateParams.pwdToken)){
			$scope.raz = true;
		}
		//Changement mot de passe (connecté)
		else{
			$scope.raz = false;
		}
	}
	
	$scope.submitForgottenPassword = function(){
		$scope.forgottenPasswordSent = true;
		
		if($scope.passwordForm.$valid){
			//envoi email
			PasswordService.forgottenPassword({email:$scope.myForgottenForm.email});
			$scope.changing(true);
		}
		else{
			ErrorService.showAlert("error",[{message: $filter('trad')('error_form')}])
		}
	}
	
	$scope.submitChangePassword = function(){
		$scope.formSent = true;
		
		if($scope.passwordForm.$valid){
			if($scope.raz){
				var id = $stateParams.id;
				var pwdToken = $stateParams.pwdToken;
				var password = $.sha1($scope.password1);
				
				//Sha1 su le passwd & envoi
				PasswordService.changePassword(id, {confirmPassword:password, password:password, pwdToken: pwdToken});
				$scope.changing(true);
			}
			else{
				var old = $.sha1($scope.old);
				UserService.updateParameter({password: $.sha1($scope.password1), old:old});
				$scope.changing(true);
			}		
		}
		else{
			ErrorService.showAlert("error",[{message: $filter('trad')('error_form')}])
		}
	}
	
	$scope.changing = function(val){
    	if(val){
    		angular.element(".changing").button('loading');
    	}
    	else{
    		angular.element(".changing").button("reset");
			angular.element(".changing").button("toggle");
			angular.element(".changing").removeClass("active");
    	}
    }
	
	$scope.$on("updateParameter", function(action, data){
    	if(angular.isUndefined(data.errors)){
    		$location.path("/").replace();
	    	ErrorService.showAlert("success", [data.success]);   	
    	}
    	else{
			ErrorService.showAlert('error', data.errors)
    	}
    	$scope.changing(false);
    });
	
	$scope.$on("changePassword", function(action, data){
		console.log("result change password")
    	if(angular.isUndefined(data.errors)){
	    	//Redirection sur la page de login
	    	$location.path("/login").replace();
	    	ErrorService.showAlert("success", [data.success]); 
    	}
    	else{
			ErrorService.showAlert('error', data.errors)
    	}
    	$scope.changing(false);
    });
    
    $scope.$on("forgottenPassword", function(action, data){
    	if(angular.isUndefined(data.errors)){
    		//Message confirmation reset mot de passe
	    	ErrorService.showAlert("success", [data.success]);
	    	$location.path("/login").replace();
    	}
    	else{
			ErrorService.showAlert('error', data.errors)
    	}
    	$scope.changing(false);
    });
	
}]).directive('passwordValidator', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attr, ctrl) {
      var pwdWidget = elm.inheritedData('$formController')[attr.passwordValidator];
		
      ctrl.$parsers.push(function(value) {
        if (value === pwdWidget.$viewValue) {
          ctrl.$setValidity('MATCH', true);
          return value;
        }
        ctrl.$setValidity('MATCH', false);
      });

      pwdWidget.$parsers.push(function(value) {
      	ctrl.$setValidity('MATCH', value === ctrl.$viewValue);
        return value;
      });
    }
  };
})

