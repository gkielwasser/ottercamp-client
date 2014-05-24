'use strict'

var confirmModule = angular.module('ConfirmCtrl',[]);

var confirmCtrl = confirmModule.controller('ConfirmCtrl', 
	['$scope',
	'ConfirmService',
	'$stateParams',
	'ErrorService',
	'UserService', 
	function($scope, 
		ConfirmService, 
		$stateParams,
		ErrorService,
		UserService
	){
	
	$scope.initConfirm = function(){
		console.log("init confirmCtrl");
		
		$scope.loading = true;

		//Envoi de la confirmation
		$scope.confirm();
	}

	$scope.confirm = function(){
		var id = $stateParams.id;
		var code = $stateParams.code;
		var token = $stateParams.token;
		ConfirmService.confirm(id, token, {code:code});
	}
	
	$scope.$on("confirm", function(action, data){
		$scope.loading = false;
    	if(angular.isUndefined(data.errors)){  		
    			UserService.setConfirmed();
    			ErrorService.showAlert('success', [data.success])
    			$scope.confirmed = true;
    	}
    	else{  		
    		ErrorService.showAlert('error', data.errors)
    		$scope.confirmed = false;
    	}
	});
	
	$scope.initConfirm();
}])