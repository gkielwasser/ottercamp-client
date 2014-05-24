'use strict'

var AdministrateOrganizationsMod =  angular.module('AdministrateOrganizationsMod',[]);
var AdministrateOrganizationsCtrl = AdministrateOrganizationsMod.controller('AdministrateOrganizationsCtrl', 
	[
	'$scope', 
	'ErrorService',
	'$filter',
	'OrganizationService',
	'UserService',
	'$location',
	function(
		$scope,
		ErrorService,
		$filter,
		OrganizationService,
		UserService,
		$location
	){
		$scope.initAddOrganization = function(){
			console.log("another",$scope.anotherUser)
			if(!$scope.anotherUser){
				$scope.formSent = false;
				$scope.photo = false;
				$scope.organizations = [];
				$scope.files = [];
				$scope.loading = true;
				UserService.getOrganizations().then(
					function(data){
						$scope.loading = false;
						$scope.organizations = data;
					}
				)
			}
			else{
				$location.path("/404").replace();
			}	
		}
		
		//listen for the file selected event
	    $scope.$on("fileSelected", function (event, args) {
	    	//Ne pas afficher la photo de la category sélectionnée
	    	$scope.photo = true;

	        $scope.$apply(function () {            
	            //add the file object to the scope's files collection
	            //$scope.files.push(args.file);
	            $scope.files[0] = args.file;
	        });
	    });
		
		$scope.submit = function(){
			$scope.formSent = true;
			if($scope.organizationForm.$valid){
				$scope.sending = true;
				
				if(angular.isDefined($scope.formatedAddress)){
					if(angular.isDefined($scope.formatedAddress)){
		        		angular.forEach($scope.formatedAddress, function(value,key){
		        			$scope.organization[key] = value;
		        		})
		        	}
		        }	

				if(angular.isDefined($scope.files) && $scope.files.length > 0){
					var parameters = {files:$scope.files, model:$scope.organization};
				}
				else{
					var parameters = $scope.organization;
				}
				OrganizationService.addOrganization(parameters).then(
					function(data){
						if(angular.isUndefined(data.errors)){
							ErrorService.showAlert("success", [data.success]);
							$scope.organizations.push(data.organization);
							$scope.create = false;
							delete $scope.organization;
						}
						else{
							ErrorService.showAlert("error", data.errors)
						}	
						$scope.sending = false;
					},
					function(data){
						ErrorService.showAlert("error", data.errors)
						$scope.sending = false;
					}
				)
			}
			else{
				ErrorService.showAlert("error",[{message: $filter('trad')('error_form')}])
			}
		}
}])

AdministrateOrganizationsCtrl.resolve = {
	confirm: function(UserService,$location,ErrorService,$filter,$q){
		console.log("testing........;")
		var defered = $q.defer();

		//Compte non confirmé
		if(UserService.getUser() && !UserService.getUser().confirmed){
			ErrorService.showAlert("warning",[{message: $filter('trad')('error_member_unconfirmed_add_organization')}]);
			$location.path('/').replace();
			defered.reject();
		}
		else{
			defered.resolve();
		}
		return defered.promise;
	}	
}