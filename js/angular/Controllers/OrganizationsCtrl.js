'use strict'

var OrganizationsModule = angular.module('OrganizationCtrl',[])
var OrganizationCtrl = OrganizationsModule.controller('OrganizationCtrl', 
	[
	'$scope', 
	'$stateParams', 
	'ErrorService',
	'OrganizationService',
	'Organization',
	'$state',
	'UserService',
	function(
		$scope,
		$stateParams,
		ErrorService,
		OrganizationService,
		Organization,
		$state,
		UserService
	){
		
		$scope.see = function(item){
			switch(item){
				case "organization.settings":
					return ($scope.role == "creator") ? true:false;	
				case "organization.administrators":
					return ($scope.role == "creator") ? true:false;				
			}
		}	
		
		$scope.setRole = function(){
			if(!UserService.isLoggedIn()){
				$scope.role = "guest";
			}
			else if($scope.organization.creator.id == $scope.user.id){
				$scope.role = "creator";
			}
			//else if(){ //Administrators}
			else{
				$scope.role = "member";
			}
			console.log("role",$scope.role)
		}

		$scope.initOrganization = function(){
			$scope.user = UserService.getUser();
			$scope.organization = Organization;
			$scope.setRole();		
		}

		$scope.isPageActive = function(page){
    		return (page == $state.current.name) ? 'active' : '';
    	}
}])

.controller('OrganizationGeneralCtrl', 
	[
	'$scope',
	function($scope){
		$scope.initGeneral = function(){
			
		}
}])

.controller('OrganizationAdministratorsCtrl', 
	[
	'$scope',
	'$location',
	'OrganizationService',
	'ErrorService',
	'$filter',
	function(
		$scope,
		$location,
		OrganizationService,
		ErrorService,
		$filter
	){
		$scope.initAdministrators = function(){
			if($scope.see('organization.administrators')){
				//Récupération des administrateurs
				if(angular.isDefined($scope.organization.administrators)){
					$scope.administrators = $scope.organization.administrators;
				}
				else{
					$scope.administrators = [];
				}				
			}
			else{
				$location.path('/404').replace();
			}
		}
		
		$scope.submit = function(){
			$scope.formSent = true;
		
			if($scope.administratorForm.$valid){
				$scope.sending = true;
				OrganizationService.addAdministrator($scope.organization.id,$scope.administrator).then(
					function(data){
						console.log("data admin",data)
						if(angular.isUndefined(data.errors)){
							$scope.administrators.push(data.administrator);
							ErrorService.showAlert("success", [data.success]);
							$scope.formSent = false;
							$scope.administrator = "";
							delete $scope.adminstratorForm;
							$('input.administrator').focus();
							$scope.administratorshow = true;
						}	
						else{
							ErrorService.showAlert("error", data.errors);
						}	
						$scope.sending = false;			
					},
					function(){
						$scope.sending = false;
					}
				)
			}
			else{
				ErrorService.showAlert("error",[{message: $filter('trad')('error_form')}])
			}	
		}
		
		$scope.deleteAdministrator = function(id){
			OrganizationService.deleteAdministrator($scope.organization.id,id).then(
				function(data){
					if(angular.isUndefined(data.errors)){
						ErrorService.showAlert("success", [data.success]);
						$scope.removeAdministrator(id);
					}
					else{
						ErrorService.showAlert("error", data.errors);
					}					
				}
			)
		}
		
		$scope.removeAdministrator = function(id){
			angular.forEach($scope.administrators, function(value, key){
				if(value.id == id){
					$scope.administrators.splice(key,1)
				}
			})
		}
}])

.controller('OrganizationSettingsCtrl', 
	[
	'$scope',
	'ErrorService',
	'OrganizationService',
	'$location',
	function($scope,ErrorService,OrganizationService,$location){
		$scope.initSettings = function(){
			console.log("currentrole",$scope.role)
			if($scope.see('organization.settings')){
				$scope.formSent = false;
				$scope.photo = false;
				$scope.files = [];
				$scope.organizationSettings = angular.copy($scope.organization);
				
				//Formattage de l'adresse
				if(angular.isDefined($scope.organizationSettings.address) && angular.isDefined($scope.organizationSettings.address.label)){
	    			$scope.formatedAddress = {}
	    			$scope.search = $scope.organizationSettings.address.label;
	    			  			
					var address = $scope.organizationSettings.address;
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
	    	else{
	    		$location.path("/404").replace();
	    	}	
		}
		
		$scope.submit = function(){
			$scope.formSent = true;
			if($scope.organizationSettingsForm.$valid){
				$scope.sending = true;

				var data = {
					url: $scope.organizationSettings.url,
					name: $scope.organizationSettings.name,
					description: $scope.organizationSettings.description,
					website: $scope.organizationSettings.website,
					asCommunity: $scope.organizationSettings.asCommunity
				}
				
				if(angular.isDefined($scope.formatedAddress)){
					if(angular.isDefined($scope.formatedAddress)){
		        		angular.forEach($scope.formatedAddress, function(value,key){
		        			data[key] = value;
		        		})
		        	}
		        }
				
				if(angular.isDefined($scope.files) && $scope.files.length > 0){
					var parameters = {files:$scope.files, model: data};
				}
				else{
					var parameters = data;
				}
				
				OrganizationService.updateOrganization(parameters,$scope.organizationSettings.id).then(
					function(data){
						if(angular.isUndefined(data.errors)){
							$scope.$parent.organization = angular.copy(data.organization);
							$scope.organizationSettings = angular.copy(data.organization);
							ErrorService.showAlert("success",[data.success]);
						}
						else{
							ErrorService.showAlert("error",data.errors);
						}	
						$scope.sending = false;
					},
					function(data){
						ErrorService.showAlert("error",data.errors);
						$scope.sending = false;
					}
				)
			}	
			else{
				ErrorService.showAlert("error",[{message: $filter('trad')('error_form')}])
			}	
		}
}]);

OrganizationCtrl.resolve = {
	Organization : function($q, OrganizationService, $stateParams){
		 var defered = $q.defer();
		 OrganizationService.getOrganization($stateParams.id).then(
			function(data){
				defered.resolve(data);
			},
			function(data){
				defered.reject(data);
			}
		 )
		 return defered.promise;
	}
}
