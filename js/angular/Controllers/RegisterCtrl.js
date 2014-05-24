'use strict'

var registerctrlmodule = angular.module('RegisterCtrl',[]);

var registerctrl = registerctrlmodule.controller('RegisterCtrl', ['$scope','UserService','authService','ErrorService','$filter', 'FBUser','$anchorScroll',function($scope,UserService,authService, ErrorService,$filter,FBUser,$anchorScroll){
	
    $scope.init = function(){
        console.log("init RegisterCtrl");  
        $scope.formSent = false;
        $scope.FBUser = FBUser;
    }
    
    $scope.submit = function(){
    	$scope.formSent = true;
    	if($scope.registerForm.$valid){
    		//Suppression des éventuelles notifications
			ErrorService.hideAlert();
				
	    	//Sha1 du passwd
	    	$scope.myRegisterForm.password = $.sha1($scope.password1);
	    	$scope.sending = true;
	    	UserService.register($scope.myRegisterForm);
	    }
	    else{
	    	//Afficher un message de notification & remonter en haut de la page
    		ErrorService.showAlert("error",[{message: $filter('trad')('error_form')}])
  			$anchorScroll();
	    }
    }
    
    $scope.FBlogining = function(val){
    	if(val){
    		angular.element(".FBlogining").button('loading');
    	}
    	else{
    		angular.element(".FBlogining").button("reset");
			angular.element(".FBlogining").button("toggle");
			angular.element(".FBlogining").removeClass("active");
    	}
    }
    
    $scope.$on("FBloginning", function(action,data){
    	if(data){
    		//Register
    		$scope.FBlogining(false);
    		//Préremplir les champs
	    	$scope.myRegisterForm = {};
	    	$scope.myRegisterForm.login = data.username;
	    	$scope.myRegisterForm.lastName = data.last_name;
	    	$scope.myRegisterForm.name = data.first_name;
	    	$scope.myRegisterForm.email = data.email;
	    	$scope.myRegisterForm.facebookToken = data.facebookToken;
	    	$scope.myRegisterForm.facebookId = data.facebookId;
	    	$scope.$apply()
    	}
    	else{
    		$scope.FBlogining(true);
    	}
    });

	//Réception de notifications
    $scope.$on("register", function(action,data){
    	if(angular.isUndefined(data.errors)){
    		//Update user data
	    	UserService.loadUser(data.access);
	    	
	    	//On le dit au service d'authentification
	    	authService.loginConfirmed();
	    	
	    	//ErrorService.showAlert("success",[data.success])
    	}
    	else{   		
    		//Afficher les erreurs
    		ErrorService.showAlert("error",data.errors);
    	}
    	$scope.sending = false;
    });
    
    $scope.init();

}]).
directive('sameAs', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function(viewValue) {
      	if (scope.registerForm.password2.$viewValue === scope.registerForm.password1.$viewValue) {      
          ctrl.$setValidity('sameAs', true);
          return viewValue;
        } else {
          ctrl.$setValidity('sameAs', false);
          return undefined;
        }
      });
    }
  };
}).directive('passwordValidator2', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attr, ctrl) {
      var pwdWidget = elm.inheritedData('$formController')[attr.passwordValidator2];

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
});