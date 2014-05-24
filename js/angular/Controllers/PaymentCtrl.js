'use strict'

angular.module('PaymentCtrl',[])

.controller('PaymentBeneficiariesCtrl',
	[
	'$scope',
	'PaymentService',
	function($scope,PaymentService){
		$scope.initBeneficiaries = function(){
			$scope.loading = true;	
			PaymentService.beneficiaries().then(
				function(data){
					$scope.beneficiaries = data;
					$scope.loading = false;					
				}
			);
    	}
    
}])
.controller('PaymentCardsCtrl',
	[
	'$scope',
	'PaymentService',
	function($scope,PaymentService){
		$scope.initCards = function(){
			$scope.loading = true;
			PaymentService.cards().then(
				function(data){
					$scope.cards = data;
					$scope.loading = false;					
				}
			);
    	}
}])
.controller('PaymentOperationsCtrl',
	[
	'$scope',
	'PaymentService',
	function($scope,PaymentService){
		$scope.initOperations = function(){
			$scope.loading = true;	
			PaymentService.operations().then(
				function(data){
					$scope.operations = data;
					$scope.loading = false;
				}
			);
			
    	}
}]);
