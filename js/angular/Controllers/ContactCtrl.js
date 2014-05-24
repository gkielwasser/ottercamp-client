'use strict'

angular.module('ContactCtrl',[]).controller('ContactCtrl',
	["$scope", 
	"ErrorService",
	"$filter",
	"UserService",
	"$location",
	function(
		$scope,
		ErrorService,
		$filter,
		UserService,
		$location
	){

    $scope.init = function(){
        console.log("init ContactCtrl");
        $scope.formSent = false;
        
        //récupération des données utilisateurs
        var user = UserService.getUser();
        if(angular.isDefined(user) && user){
        	$scope.myContactForm = {}
        	$scope.myContactForm.name = user.name;
        	$scope.myContactForm.lastName = user.lastName;
        	$scope.myContactForm.email = user.email;
        }
    }
    
    $scope.sendingMessage = function(val){
    	if(val){
    		angular.element(".sendingMessage").button('loading');
    	}
    	else{
    		angular.element(".sendingMessage").button("reset");
			angular.element(".sendingMessage").button("toggle");
			angular.element(".sendingMessage").removeClass("active");
    	}
    }
    
    $scope.submitMessage = function(){
    	$scope.formSent = true;
    	if($scope.contactForm.$valid){
    		$scope.sendingMessage(true);
    		UserService.sendMessage($scope.myContactForm);
    	}
    	else{
    		ErrorService.showAlert("error",[{message: $filter('trad')('error_form')}])
    	}
    }
    
    $scope.$on('sendMessage', function(action,data){
    	ErrorService.showAlert('success', [data.success]);
		if(angular.isUndefined(data.errors)){
			$location.path("/").replace();
			
		}
		else{
			ErrorService.showAlert('error', data.errors);
		}
		$scope.sendingMessage(false);
    })

    $scope.init();
}])